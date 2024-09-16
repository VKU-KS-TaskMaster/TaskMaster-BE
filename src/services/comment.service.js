import { addDoc, and, collection, deleteDoc, doc, getDoc, getDocs, or, query, updateDoc, where } from "firebase/firestore";

import RedisClient from "@/core/redisCache.config";
import ResponseTrait from "@/core/responseTrait";
import { db } from "@/core/firebase.config";
import { deleteKeysFromObject, generateCode, getTableCacheKey, getTableName } from "@/core/helper";
import { PROJECT_STATUS_DELETED } from "@/enums/project/ProjectStatusEnum";
import { commentKey } from "@/models/comment.model";

const CommentService = {
    search: async (params) => {
        const { entity_code, parent_code } = params

        const tableName = getTableName(entity_code)
        const tableCacheKey = getTableCacheKey(entity_code)

        const cacheKey = tableCacheKey.replace(":code", entity_code)
        const entityData = await RedisClient.get(cacheKey)
        let resData = entityData && entityData[commentKey] ? entityData[commentKey] : null

        if (resData) return ResponseTrait.success(resData)

        const entityRef = collection(db, "comment", tableName, entity_code);
        const docQuery = query(entityRef, where("parent_code", "==", parent_code ? parent_code : null))
        const docSnap = await getDocs(docQuery);

        if (docSnap.empty) {
            return ResponseTrait.success([])
        }

        resData = docSnap.docs.map(doc => doc.data())

        return ResponseTrait.success(resData);
    },
    store: async (params) => {
        const { entity_code, parent_code } = params

        const tableName = getTableName(entity_code)
        const tableCacheKey = getTableCacheKey(entity_code)

        const entityRef = collection(db, "comment", tableName, entity_code);

        const parentQuery = query(entityRef, where("code", "==", parent_code))
        const parentSnap = await getDocs(parentQuery)

        if(parentSnap.empty) return ResponseTrait.error("Error when store Comment!")

        const dateNow = new Date()
        params.code = generateCode(commentKey, dateNow, entity_code)

        deleteKeysFromObject(params, ['entity_code'])
        const docSnap = await addDoc(entityRef, {
            ...params,
            // status: PROJECT_STATUS_PENDING,
            created_at: dateNow
        });

        if (!docSnap) return ResponseTrait.error("Error when store Comment!")

        const resData = (await getDoc(docSnap)).data()

        return ResponseTrait.success(resData)
    },
    update: async (params) => {
        const { entity_code, key } = params

        const tableName = getTableName(entity_code)
        const tableCacheKey = getTableCacheKey(entity_code)

        const entityRef = collection(db, "comment", tableName, entity_code);
        const docQuery = query(entityRef, where("code", "==", key))
        const docSnap = await getDocs(docQuery)

        if (docSnap.empty) {
            return ResponseTrait.error("No such Comment!")
        }

        deleteKeysFromObject(params, ['entity_code', 'key'])
        await updateDoc(docSnap.docs[0].ref, {
            ...params,
            updated_at: new Date()
        })

        const resData = (await getDoc(docSnap.docs[0].ref)).data()

        return ResponseTrait.success(resData)
    },
    destroy: async (params) => {
        const { entity_code, key } = params

        const tableName = getTableName(entity_code)
        const tableCacheKey = getTableCacheKey(entity_code)

        const entityRef = collection(db, "comment", tableName, entity_code);
        const docQuery = query(entityRef, where("code", "==", key))
        const docSnap = await getDocs(docQuery)

        if (docSnap.empty) return ResponseTrait.error('No such Comment!')

        await deleteDoc(docSnap.docs[0].ref)

        return ResponseTrait.success()
    }
}

export default CommentService