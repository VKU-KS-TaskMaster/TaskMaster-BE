import { addDoc, and, collection, getDoc, getDocs, or, query, updateDoc, where } from "firebase/firestore";

import { projectDestroySchema, projectGetListSchema, projectGetSchema, projectCacheKey, projectStoreSchema, projectUpdateSchema, projectKey, projectSearchMembersSchema, projectUpdateMembersSchema } from "@/models/project.model";
import { PROJECT_STATUS_DELETED } from "@/enums/project/ProjectStatusEnum";
import { db } from "@/core/firebase.config";
import { generateCode } from "@/core/helper";
import RedisClient from "@/core/redisCache.config";
import ResponseTrait from "@/core/responseTrait";

const ProjectService = {
    get: async (params) => {
        const { error, value } = projectGetSchema.validate(params);

        if (error) {
            return ResponseTrait.error(error)
        }

        const cacheKey = projectCacheKey.replace(":code", value.key)
        let resData = await RedisClient.get(cacheKey)
        if (resData) return ResponseTrait.success(resData)

        const docRef = collection(db, "project");
        const docQuery = query(docRef, where("code", "==", value.key))
        const docSnap = await getDocs(docQuery);

        if (docSnap.empty) {
            return ResponseTrait.error()
        }

        resData = docSnap.docs[0].data()

        RedisClient.set(projectCacheKey.replace(":code", resData.code), resData)

        return ResponseTrait.success(resData);
    },
    search: async (params) => {
        params.status = params.status?.split(',')
        params.members = params.members?.split(',')
        params.teams = params.teams?.split(',')

        const { error, value } = projectGetListSchema.validate(params);
        const { q, user_code, space_code, status, members, teams, start_date, end_date } = value

        if (error) {
            return ResponseTrait.error(error)
        }

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
            docQuery = query(docQuery, where('memberCodes', 'array-contains-any', members))
        }

        if (teams && teams.length > 0) {
            docQuery = query(docQuery, where('teams', 'array-contains-any', teams))
        }

        const docSnap = await getDocs(docQuery);
        const docData = docSnap.docs.map(doc => doc.data())

        return ResponseTrait.success(docData);
    },
    store: async (params) => {
        const { error, value } = projectStoreSchema.validate(params);
        if (error) {
            return ResponseTrait.error(error)
        }

        const dateNow = new Date()
        value.code = generateCode(projectKey, dateNow, value.name)

        const docRef = collection(db, "project");
        const docSnap = await addDoc(docRef, {
            ...value,
            // status: PROJECT_STATUS_PENDING,
            created_at: dateNow
        });
        
        const docData = (await getDoc(docSnap)).data()
        
        if (!docData) return ResponseTrait.error("Error when store Project!")

        await ProjectMemberService.update({key: docData.code}, params)

        const resData = (await getDoc(docSnap)).data()

        await RedisClient.set(projectCacheKey.replace(":code", resData.code), resData)

        return ResponseTrait.success(resData)
    },
    update: async (params, body) => {
        const { error, value } = projectUpdateSchema.validate({ ...params, ...body });
        const { key } = value
        if (error) {
            return ResponseTrait.error(error)
        }

        const docRef = collection(db, "project");
        const docQuery = query(docRef, where("code", "==", key))
        const docSnap = await getDocs(docQuery);

        if (docSnap.empty) {
            return ResponseTrait.error("No such Project!")
        }

        await ProjectMemberService.update({key: value.key}, body)
        
        delete value.key
        await updateDoc(docSnap.docs[0].ref, {
            ...value,
            updated_at: new Date()
        })

        const resData = (await getDoc(docSnap.docs[0].ref)).data()

        RedisClient.set(projectCacheKey.replace(":code", resData.code), resData)

        return resData
    },
    destroy: async (params) => {
        const { error, value } = projectDestroySchema.validate(params);
        if (error) {
            return ResponseTrait.error(error)
        }

        const docRef = collection(db, "prọect");

        const docQuery = query(docRef, where("code", "==", value.key))

        const docSnap = await getDocs(docQuery);

        if (!docSnap.empty) ResponseTrait.error('No such Project!')

        delete value.key
        await updateDoc(docSnap.docs[0].ref, {
            status: PROJECT_STATUS_DELETED,
            updated_at: new Date(),
            deleted_at: new Date()
        })
        const resData = (await getDoc(docSnap.docs[0].ref)).data()

        RedisClient.set(projectCacheKey.replace(":code", resData.code), resData)

        return ResponseTrait.success(resData)
    }
}

const ProjectMemberService = {
    update: async (params, body) => {
        const { error, value } = projectUpdateMembersSchema.validate({ ...params, ...body });
        if (error) {
            return ResponseTrait.error(error)
        }

        const { key, members, teams } = value

        const docRef = collection(db, "project");
        const docQuery = query(docRef, where("code", "==", key))
        const docSnap = await getDocs(docQuery);

        if (docSnap.empty) {
            return ResponseTrait.error("No such Project!")
        }

        const memberCodes = members?.map(m => m.code)
        const teamCodes = teams?.map(m => m.code)

        const resData = await updateDoc(docSnap.docs[0].ref, {
            members: members || [],
            teams: teams || [],
            memberCodes: memberCodes || [],
            teamCodes: teamCodes || []
        })

        return ResponseTrait.success(resData)
    },
    search: async (params) => {
        const { error, value } = projectSearchMembersSchema.validate(params);
        if (error) {
            return ResponseTrait.error(error)
        }

        const cacheKey = projectCacheKey.replace(":code", value.key)
        const entData = RedisClient.set(cacheKey)

        if (!entData) {
            const docRef = collection(db, "project");
            const docQuery = query(docRef, where("code", "==", value.key))
            const docSnap = await getDocs(docQuery);

            if (docSnap.empty) {
                return ResponseTrait.error("No such Project")
            }

            entData = docSnap.docs[0].data()
        }

        const memberCodes = entData.memberCodes

        const memberRef = collection(db, "user");
        const memberQuery = query(memberRef, where("code", "in", memberCodes))
        const memberSnap = await getDocs(memberQuery);

        const resData = memberSnap.docs.map(doc => doc.data())

        return ResponseTrait.success(resData);
    }
}

export default ProjectService

export { ProjectMemberService }