import { addDoc, and, collection, doc, getDoc, getDocs, or, query, setDoc, updateDoc, where } from "firebase/firestore";

import { db } from "@/core/firebase.config";
import { projectDestroySchema, projectGetListSchema, projectGetSchema, projectCacheKey, projectStoreSchema, projectUpdateSchema, projectKey, projectSearchMembersSchema } from "@/models/project.model";
import ResponseTrait from "@/core/responseTrait";
import { PROJECT_STATUS_DELETED, PROJECT_STATUS_PENDING } from "@/core/enums/project/ProjectStatusEnum";
import redisClient from "@/core/redisCache.config";
import { generateCode, simpleHashStringToNumber } from "@/core/helper";

const ProjectService = {
    get: async (params) => {
        const { error, value } = projectGetSchema.validate(params);

        if (error) {
            return ResponseTrait.error(error)
        }

        const cacheKey = projectCacheKey.replace(":code", value.key)
        const resData = redisClient.hGet(cacheKey)
        if (resData) return ResponseTrait.success(resData)

        const docRef = collection(db, "project");
        const docQuery = query(docRef, where("code", "==", value.key))
        const docSnap = await getDocs(docQuery);

        if (docSnap.empty) {
            return ResponseTrait.error()
        }

        resData = docSnap.docs[0].data()

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
        // if(params.members) {
        //     params.members = JSON.parse(params.members)
        // }

        const { error, value } = projectStoreSchema.validate(params);
        const { name, members, teams } = value
        if (error) {
            return ResponseTrait.error(error)
        }

        const dateNow = new Date()
        value.code = generateCode(projectKey, dateNow, name)

        const docRef = collection(db, "project");
        const docSnap = await addDoc(docRef, {
            ...value,
            // status: PROJECT_STATUS_PENDING,
            created_at: dateNow
        });

        if (members && members.length > 0) {
            const memberCodes = members.map(m => m.code)
            await updateDoc(docSnap, {
                memberCodes: memberCodes
            })
        }

        if (teams && teams.length > 0) {
            const teamCodes = teams.map(m => m.code)
            await updateDoc(docSnap, {
                teamCodes: teamCodes
            })
        }

        if (!docSnap) return ResponseTrait.error("")

        const resData = (await getDoc(docSnap)).data()

        redisClient.hSet(projectCacheKey.replace(":code", value.code), JSON.stringify(resData))

        return ResponseTrait.success(resData)
    },
    update: async (params, body) => {
        const { error, value } = projectUpdateSchema.validate({ ...params, ...body });
        const { members, teams } = value
        if (error) {
            return ResponseTrait.error(error)
        }

        const docRef = collection(db, "project");

        const docQuery = query(docRef, where("code", "==", value.key))

        const docSnap = await getDocs(docQuery);

        if (docSnap.empty) {
            return ResponseTrait.error("No such Project!")
        }

        delete value.key
        value.memberCodes = members?.map(m => m.code)
        value.teamCodes = teams?.map(m => m.code)

        await updateDoc(docSnap.docs[0].ref, {
            ...value,
            updated_at: new Date()
        })

        const resData = (await getDoc(docSnap.docs[0].ref)).data()

        redisClient.hSet(projectCacheKey.replace(":code", value.key), JSON.stringify(resData))

        return resData
    },
    destroy: async (params) => {
        const { error, value } = projectDestroySchema.validate(params);
        if (error) {
            return ResponseTrait.error(error)
        }

        const docRef = collection(db, "space");

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

        redisClient.hSet(projectCacheKey.replace(":code", value.key), JSON.stringify(resData))

        return ResponseTrait.success(resData)
    },

    changeStatus: async (params, body) => {
        const { error, value } = projectDestroySchema.validate({ ...params, ...body });
        if (error) {
            return ResponseTrait.error(error)
        }

        const docRef = collection(db, "space");

        const docQuery = query(docRef, where("code", "==", value.key))

        const docSnap = await getDocs(docQuery);

        if (docSnap.empty) ResponseTrait.error('No such Space!')

        const dataUpdate = {
            status: value.status,
            updated_at: new Date()
        }

        if (value.status === PROJECT_STATUS_DELETED) dataUpdate.deleted_at = new Date()

        await updateDoc(docSnap.docs[0].ref, dataUpdate)
        const resData = (await getDoc(docSnap.docs[0].ref)).data()

        redisClient.hSet(projectCacheKey.replace(":code", value.key), JSON.stringify(resData))

        return ResponseTrait.success(resData)
    },
    searchMembers: async (params) => {
        const { error, value } = projectSearchMembersSchema.validate(params);
        if (error) {
            return ResponseTrait.error(error)
        }

        const cacheKey = projectCacheKey.replace(":code", value.key)
        const entData = redisClient.hGet(cacheKey)

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