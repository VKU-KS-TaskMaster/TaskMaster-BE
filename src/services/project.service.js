import { addDoc, and, collection, getDoc, getDocs, or, query, updateDoc, where } from "firebase/firestore";

import RedisClient from "@/core/redisCache.config";
import ResponseTrait from "@/core/responseTrait";
import { db } from "@/core/firebase.config";
import { generateCode } from "@/core/helper";
import { PROJECT_STATUS_DELETED } from "@/enums/project/ProjectStatusEnum";
import { projectCacheKey, projectKey } from "@/models/project.model";

const ProjectService = {
    get: async (params) => {
        const { key } = params

        const cacheKey = projectCacheKey.replace(":code", key)
        let resData = await RedisClient.get(cacheKey)
        if (resData) return ResponseTrait.success(resData)

        const docRef = collection(db, "project");
        const docQuery = query(docRef, where("code", "==", key))
        const docSnap = await getDocs(docQuery);

        if (docSnap.empty) {
            return ResponseTrait.error("No such Project")
        }

        resData = docSnap.docs[0].data()
        await RedisClient.set(projectCacheKey.replace(":code", resData.code), resData)

        return ResponseTrait.success(resData);
    },
    search: async (params) => {
        const { q, user_code, space_code, status, members, teams, start_date, end_date } = params

        const docRef = collection(db, "project");
        let docQuery = query(docRef, where('space_code', '==', space_code))

        if (q && q.trim().length > 0) {
            const attrs = ['code', 'name', 'description']

            docQuery = query(docQuery, or(...attrs.map(a => and(
                where(a, ">=", q),
                where(a, "<=", q + '\uf8ff')
            ))))
        }

        if (user_code) docQuery = query(docQuery, where('user_code', '==', user_code))

        if (status && status.length > 0) docQuery = query(docQuery, where('status', 'in', status))

        if (members && members.length > 0) {
            docQuery = query(docQuery, where('member_codes', 'array-contains-any', members))
        }

        if (teams && teams.length > 0) {
            docQuery = query(docQuery, where('team_codes', 'array-contains-any', teams))
        }

        const docSnap = await getDocs(docQuery);
        const docData = docSnap.docs.map(doc => doc.data())

        return ResponseTrait.success(docData);
    },
    store: async (params) => {
        const { name, members, teams } = params

        const dateNow = new Date()
        params.code = generateCode(projectKey, dateNow, name)

        const docRef = collection(db, "project");
        const docSnap = await addDoc(docRef, {
            ...params,
            // status: PROJECT_STATUS_PENDING,
            created_at: dateNow
        });
        
        const docData = (await getDoc(docSnap)).data()
        
        if (!docData) return ResponseTrait.error("Error when store Project!")

        await ProjectMemberService.update({
            key: docData.code,
            members: members,
            teams: teams
        })

        const resData = (await getDoc(docSnap)).data()
        await RedisClient.set(projectCacheKey.replace(":code", resData.code), resData)

        return ResponseTrait.success(resData)
    },
    update: async (params) => {
        const { key } = params

        const docRef = collection(db, "project");
        const docQuery = query(docRef, where("code", "==", key))
        const docSnap = await getDocs(docQuery);

        if (docSnap.empty) {
            return ResponseTrait.error("No such Project!")
        }
        
        delete params.key
        await updateDoc(docSnap.docs[0].ref, {
            ...params,
            updated_at: new Date()
        })

        const resData = (await getDoc(docSnap.docs[0].ref)).data()
        await RedisClient.set(projectCacheKey.replace(":code", resData.code), resData)

        return resData
    },
    destroy: async (params) => {
        const { key } = params

        const docRef = collection(db, "project");

        const docQuery = query(docRef, where("code", "==", key))

        const docSnap = await getDocs(docQuery);

        if (docSnap.empty) return ResponseTrait.error('No such Project!')

        delete params.key
        await updateDoc(docSnap.docs[0].ref, {
            status: PROJECT_STATUS_DELETED,
            updated_at: new Date(),
            deleted_at: new Date()
        })

        const resData = (await getDoc(docSnap.docs[0].ref)).data()
        await RedisClient.set(projectCacheKey.replace(":code", resData.code), resData)

        return ResponseTrait.success(resData)
    }
}

const ProjectMemberService = {
    search: async (params) => {
        const { key, q } = params

        const cacheKey = projectCacheKey.replace(":code", key)
        let entData = RedisClient.get(cacheKey)

        if (!entData) {
            const docRef = collection(db, "project");
            const docQuery = query(docRef, where("code", "==", key))
            const docSnap = await getDocs(docQuery);

            if (docSnap.empty) {
                return ResponseTrait.error("No such Project")
            }

            entData = docSnap.docs[0].data()
        }

        const memberCodes = entData.member_codes

        const docRef = collection(db, "user");
        let docQuery = query(docRef, where("code", "in", memberCodes));

        if (q && q.trim().length > 0) {
            const attrs = ['code', 'name', 'description']

            docQuery = query(docQuery, or(...attrs.map(a => and(
                where(a, ">=", q),
                where(a, "<=", q + '\uf8ff')
            ))))
        }

        const memberSnap = await getDocs(docQuery);

        const resData = memberSnap.docs.map(doc => doc.data())

        return ResponseTrait.success(resData);
    },
    update: async (params) => {
        const { key, members, teams } = params

        const docRef = collection(db, "project");
        const docQuery = query(docRef, where("code", "==", key))
        const docSnap = await getDocs(docQuery);
        
        if (docSnap.empty) {
            return ResponseTrait.error("No such Project!")
        }

        const memberCodes = members?.map(m => m.code)
        const teamCodes = teams?.map(m => m.code)

        const resData = await updateDoc(docSnap.docs[0].ref, {
            members: members,
            teams: teams,
            member_codes: memberCodes,
            team_codes: teamCodes
        })

        return ResponseTrait.success(resData)
    }
}

export default ProjectService

export { ProjectMemberService }