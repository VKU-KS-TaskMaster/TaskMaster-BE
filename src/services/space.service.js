import { collection, query, where, getDocs, or, and, addDoc, getDoc, updateDoc } from "firebase/firestore";

import ResponseTrait from "@/core/responseTrait";
import RedisClient from "@/core/redisCache.config";
import { db } from "@/core/firebase.config";
import { generateCode } from "@/core/helper";
import { SPACE_STATUS_DELETED } from "@/enums/SpaceStatusEnum";
import { spaceCacheKey, spaceKey } from "@/models/space.model";

const SpaceService = {
    get: async (params) => {
        const { key } = params

        const cacheKey = spaceCacheKey.replace(":code", key)
        let resData = await RedisClient.get(cacheKey)
        if (resData) return ResponseTrait.success(resData)

        const docRef = collection(db, "space");
        const docQuery = query(docRef, where("code", "==", key))
        const docSnap = await getDocs(docQuery);

        if (docSnap.empty) return ResponseTrait.error('No such Space!')

        resData = docSnap.docs[0].data();
        await RedisClient.set(spaceCacheKey.replace(":code", resData.code), resData)

        return ResponseTrait.success(resData);
    },
    search: async (params) => {
        const { q, user_code, status } = params

        const docRef = collection(db, "space");
        let docQuery = query(docRef)

        if (q && q.trim().length > 0) {
            const attrs = ['code', 'name', 'description']

            docQuery = query(docQuery, or(...attrs.map(a => and(
                where(a, ">=", q),
                where(a, "<=", q + '\uf8ff')
            ))))
        }

        if (user_code) docQuery = query(docQuery, where('user_code', '==', user_code))

        if (status && status.length > 0) {
            docQuery = query(docQuery, where('status', 'in', status))
        }

        const docSnap = await getDocs(docQuery);
        const resData = docSnap.docs.map(doc => doc.data())

        return ResponseTrait.success(resData);
    },
    store: async (params) => {
        const { name } = params

        const dateNow = new Date()
        params.code = generateCode(spaceKey, dateNow, name)

        const spaceRef = collection(db, "space");
        const spaceDoc = await addDoc(spaceRef, {
            ...params,
            // status: SPACE_STATUS_PENDING,
            created_at: dateNow
        });

        const resData = (await getDoc(spaceDoc)).data()
        await RedisClient.set(spaceCacheKey.replace(":code", resData.code), resData)

        return ResponseTrait.success(resData)
    },
    update: async (params, body) => {
        const { key } = params

        const docRef = collection(db, "space");
        const docQuery = query(docRef, where("code", "==", value.key))
        const docSnap = await getDocs(docQuery);

        if (docSnap.empty) ResponseTrait.error('No such Space!')

        delete params.key
        await updateDoc(docSnap.docs[0].ref, {
            ...params,
            updated_at: new Date()
        })

        const resData = (await getDoc(docSnap.docs[0].ref)).data()
        await RedisClient.set(spaceCacheKey.replace(":code", resData.code), resData)

        return ResponseTrait.success(resData)
    },
    destroy: async (params) => {
        const { key } = params

        const docRef = collection(db, "space");
        const docQuery = query(docRef, where("code", "==", value.key))
        const docSnap = await getDocs(docQuery);

        if (docSnap.empty) ResponseTrait.error('No such Space!')

        await updateDoc(docSnap.docs[0].ref, {
            status: SPACE_STATUS_DELETED,
            updated_at: new Date(),
            deleted_at: new Date()
        })

        const resData = (await getDoc(docSnap.docs[0].ref)).data()
        await RedisClient.set(spaceCacheKey.replace(":code", resData.code), resData)

        return ResponseTrait.success(resData)
    }
}

export default SpaceService