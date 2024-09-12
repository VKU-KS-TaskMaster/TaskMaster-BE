import { addDoc, and, collection, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";

import { db } from "@/core/firebase.config";
import {
    taskGetSchema,
    taskGetListSchema,
    taskStoreSchema,
    taskUpdateSchema,
    taskDestroySchema,
    taskCacheKey,
    taskKey,
} from "@/models/task.model";
import ResponseTrait from "@/core/responseTrait";
import RedisClient from "@/core/redisCache.config";
import { generateCode } from "@/core/helper";
import { TASK_STATUS_DELETED } from "@/enums/task/TaskStatusEnum";

const TaskService = {
    get: async (params) => {
        const { error, value } = taskGetSchema.validate(params);

        if (error) {
            return ResponseTrait.error(error);
        }

        const cacheKey = taskCacheKey.replace(":code", value.key);
        let resData = await RedisClient.get(cacheKey);
        if (resData) return ResponseTrait.success(resData);

        const docRef = collection(db, "task");
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

        const { error, value } = taskGetListSchema.validate(params);
        const { q, user_code, project_code, status, members, teams, start_date, end_date } = value

        if (error) {
            return ResponseTrait.error(error)
        }

        const docRef = collection(db, "task");
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
        const { error, value } = taskStoreSchema.validate(params);
        const { name, members, teams } = value
        if (error) {
            return ResponseTrait.error(error)
        }

        const dateNow = new Date()
        value.code = generateCode(taskKey, dateNow, name)

        const docRef = collection(db, "task");
        const docSnap = await addDoc(docRef, {
            ...value,
            // status: TASK_STATUS_PENDING,
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

        RedisClient.set(taskCacheKey.replace(":code", value.code), resData)

        return ResponseTrait.success(resData)
    },
    update: async (params, body) => {
        const { error, value } = taskUpdateSchema.validate({ ...params, ...body });
        const { key, members, teams } = value
        if (error) {
            return ResponseTrait.error(error)
        }

        const docRef = collection(db, "task");

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

        RedisClient.set(taskCacheKey.replace(":code", key), resData)

        return resData
    },
    destroy: async (params) => {
        const { error, value } = taskDestroySchema.validate(params);
        if (error) {
            return ResponseTrait.error(error)
        }

        const docRef = collection(db, "task");

        const docQuery = query(docRef, where("code", "==", value.key))

        const docSnap = await getDocs(docQuery);

        if (!docSnap.empty) ResponseTrait.error('No such Milestone!')

        delete value.key
        await updateDoc(docSnap.docs[0].ref, {
            status: TASK_STATUS_DELETED,
            updated_at: new Date(),
            deleted_at: new Date()
        })
        const resData = (await getDoc(docSnap.docs[0].ref)).data()

        RedisClient.set(taskCacheKey.replace(":code", value.key), resData)

        return ResponseTrait.success(resData)
    },

    changeStatus: async (params, body) => {
        const { error, value } = projectDestroySchema.validate({ ...params, ...body });
        if (error) {
            return ResponseTrait.error(error)
        }

        const docRef = collection(db, "task");

        const docQuery = query(docRef, where("code", "==", value.key))

        const docSnap = await getDocs(docQuery);

        if (docSnap.empty) ResponseTrait.error('No such Space!')

        const dataUpdate = {
            status: value.status,
            updated_at: new Date()
        }

        if (value.status === TASK_STATUS_DELETED) dataUpdate.deleted_at = new Date()

        await updateDoc(docSnap.docs[0].ref, dataUpdate)
        const resData = (await getDoc(docSnap.docs[0].ref)).data()

        RedisClient.set(taskCacheKey.replace(":code", value.key), resData)

        return ResponseTrait.success(resData)
    },
    changeParent: async (params, body) => {
        const { error, value } = taskDestroySchema.validate({...params, ...body});
        if (error) {
            return ResponseTrait.error(error)
        }

        const docRef = collection(db, "task");

        const docQuery = query(docRef, where("code", "==", value.key))

        const docSnap = await getDocs(docQuery);

        if (docSnap.empty) ResponseTrait.error('No such Space!')

        const dataUpdate = {
            due_date: value.due_date,
            updated_at: new Date()
        }

        await updateDoc(docSnap.docs[0].ref, dataUpdate)
        const resData = (await getDoc(docSnap.docs[0].ref)).data()

        RedisClient.set(taskCacheKey.replace(":code", value.key), resData)

        return ResponseTrait.success(resData)
    },
    searchMembers: async (params) => {
        const { error, value } = taskSearchMembersSchema.validate(params);
        if (error) {
            return ResponseTrait.error(error)
        }

        const cacheKey = taskCacheKey.replace(":code", value.key)
        const entData = RedisClient.get(cacheKey)

        if (!entData) {
            const docRef = collection(db, "task");
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

const TaskMemberService = {
    update: async (params, body) => {
        const { error, value } = milestoneUpdateMembersSchema.validate({ ...params, ...body });
        if (error) {
            return ResponseTrait.error(error)
        }

        const { key, members, teams } = value

        const docRef = collection(db, "task");
        const docQuery = query(docRef, where("code", "==", key))
        const docSnap = await getDocs(docQuery);

        if (docSnap.empty) {
            return ResponseTrait.error("No such Task!")
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
        const { error, value } = milestoneSearchMembersSchema.validate(params);
        if (error) {
            return ResponseTrait.error(error)
        }

        const cacheKey = milestoneCacheKey.replace(":code", value.key)
        const entData = RedisClient.get(cacheKey)

        if (!entData) {
            const docRef = collection(db, "task");
            const docQuery = query(docRef, where("code", "==", value.key))
            const docSnap = await getDocs(docQuery);

            if (docSnap.empty) {
                return ResponseTrait.error("No such Task")
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

export default TaskService;

export { TaskMemberService }
