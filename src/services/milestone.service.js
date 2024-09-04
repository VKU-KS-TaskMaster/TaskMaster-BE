import { addDoc, and, collection, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";

import { db } from "@/core/firebase.config";
import {
    milestoneGetSchema,
    milestoneGetListSchema,
    milestoneStoreSchema,
    milestoneUpdateSchema,
    milestoneDestroySchema,
    milestoneCacheKey,
    milestoneKey,
} from "@/models/milestone.model";
import ResponseTrait from "@/core/responseTrait";
import redisClient from "@/core/redisCache.config";
import { generateCode } from "@/core/helper";

const MilestoneService = {
    get: async (params) => {
        const { error, value } = milestoneGetSchema.validate(params);

        if (error) {
            return ResponseTrait.error(error);
        }

        const cacheKey = milestoneCacheKey.replace(":code", value.key);
        const resData = redisClient.hGet(cacheKey);
        if (resData) return ResponseTrait.success(resData);

        const docRef = collection(db, "milestone");
        const docQuery = query(docRef, where("code", "==", value.key));
        const docSnap = await getDocs(docQuery);

        if (docSnap.empty) {
            return ResponseTrait.error();
        }

        resData = docSnap.docs[0].data();

        return ResponseTrait.success(resData);
    },
    search: async (params) => {
        params.status = params.status?.split(',')
        params.members = params.members?.split(',')
        params.teams = params.teams?.split(',')

        const { error, value } = milestoneGetListSchema.validate(params);
        const { q, user_code, project_code, status, members, teams, start_date, end_date } = value

        if (error) {
            return ResponseTrait.error(error)
        }

        const docRef = collection(db, "milestone");
        let docQuery = query(docRef, where("project_code", "==", project_code));

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
        const { error, value } = milestoneStoreSchema.validate(params);
        const { name, members, teams } = value
        if (error) {
            return ResponseTrait.error(error)
        }

        const dateNow = new Date()
        value.code = generateCode(milestoneKey, dateNow, name)

        const docRef = collection(db, "milestone");
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

        redisClient.hSet(milestoneCacheKey.replace(":code", value.code), JSON.stringify(resData))

        return ResponseTrait.success(resData)
    },
    update: async (params, body) => {
        const { error, value } = milestoneUpdateSchema.validate({ ...params, ...body });
        const { key, members, teams } = value
        if (error) {
            return ResponseTrait.error(error)
        }

        const docRef = collection(db, "milestone");

        const docQuery = query(docRef, where("code", "==", key))

        const docSnap = await getDocs(docQuery);

        if (docSnap.empty) {
            return ResponseTrait.error("No such Milestone!")
        }

        delete value.key
        value.memberCodes = members?.map(m => m.code)
        value.teamCodes = teams?.map(m => m.code)

        await updateDoc(docSnap.docs[0].ref, {
            ...value,
            updated_at: new Date()
        })

        const resData = (await getDoc(docSnap.docs[0].ref)).data()

        redisClient.hSet(milestoneCacheKey.replace(":code", key), JSON.stringify(resData))

        return resData
    },
    destroy: async (params) => {
        const { error, value } = milestoneDestroySchema.validate(params);
        if (error) {
            return ResponseTrait.error(error)
        }

        const docRef = collection(db, "milestone");

        const docQuery = query(docRef, where("code", "==", value.key))

        const docSnap = await getDocs(docQuery);

        if (!docSnap.empty) ResponseTrait.error('No such Milestone!')

        delete value.key
        await updateDoc(docSnap.docs[0].ref, {
            status: PROJECT_STATUS_DELETED,
            updated_at: new Date(),
            deleted_at: new Date()
        })
        const resData = (await getDoc(docSnap.docs[0].ref)).data()

        redisClient.hSet(milestoneCacheKey.replace(":code", value.key), JSON.stringify(resData))

        return ResponseTrait.success(resData)
    },

    changeStatus: async (params, body) => {
        const { error, value } = projectDestroySchema.validate({ ...params, ...body });
        if (error) {
            return ResponseTrait.error(error)
        }

        const docRef = collection(db, "milestone");

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

        redisClient.hSet(milestoneCacheKey.replace(":code", value.key), JSON.stringify(resData))

        return ResponseTrait.success(resData)
    },
    changeDueDate: async (params, body) => {
        const { error, value } = milestoneDestroySchema.validate({...params, ...body});
        if (error) {
            return ResponseTrait.error(error)
        }

        const docRef = collection(db, "milestone");

        const docQuery = query(docRef, where("code", "==", value.key))

        const docSnap = await getDocs(docQuery);

        if (docSnap.empty) ResponseTrait.error('No such Space!')

        const dataUpdate = {
            due_date: value.due_date,
            updated_at: new Date()
        }

        await updateDoc(docSnap.docs[0].ref, dataUpdate)
        const resData = (await getDoc(docSnap.docs[0].ref)).data()

        redisClient.hSet(milestoneCacheKey.replace(":code", value.key), JSON.stringify(resData))

        return ResponseTrait.success(resData)
    },
    searchMembers: async (params) => {
        const { error, value } = milestoneSearchMembersSchema.validate(params);
        if (error) {
            return ResponseTrait.error(error)
        }

        const cacheKey = milestoneCacheKey.replace(":code", value.key)
        const entData = redisClient.hGet(cacheKey)

        if (!entData) {
            const docRef = collection(db, "milestone");
            const docQuery = query(docRef, where("code", "==", value.key))
            const docSnap = await getDocs(docQuery);

            if (docSnap.empty) {
                return ResponseTrait.error("No such Milestone")
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
};

export default MilestoneService;
