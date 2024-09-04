import { SPACE_STATUS_DELETED } from "@/enums/SpaceStatusEnum";
import { db } from "@/core/firebase.config";
import { generateCode } from "@/core/helper";
import redisClient from "@/core/redisCache.config";
import ResponseTrait from "@/core/responseTrait";
import { spaceCacheKey, spaceChangeStatusSchema, spaceDestroySchema, spaceGetListSchema, spaceGetSchema, spaceKey, spaceStoreSchema, spaceUpdateSchema } from "@/models/space.model";
import { collection, doc, query, where, getDocs, or, and, addDoc, getDoc, updateDoc } from "firebase/firestore";

const SpaceService = {
    get: async (params) => {
        const { error, value } = spaceGetSchema.validate(params);

        if (error) {
            return ResponseTrait.error(error)
        }

        const cacheKey = spaceCacheKey.replace(":code", value.key)
        const resData = redisClient.hGet(cacheKey)
        if (resData) return ResponseTrait.success(resData)

        const docRef = collection(db, "space");
        const docQuery = query(docRef, where("code", "==", value.key))
        const docSnap = await getDocs(docQuery);

        if (docSnap.empty) return ResponseTrait.error('No such Space!')

        resData = docSnap.docs[0].data();
        redisClient.hSet(spaceCacheKey.replace(":code", value.key), JSON.stringify(resData))

        return ResponseTrait.success(resData);
    },
    search: async (params) => {
        params.status = params.status?.split(',')

        const { error, value } = spaceGetListSchema.validate(params);
        const { q, status } = value

        if (error) {
            return ResponseTrait.error(error)
        }

        const docRef = collection(db, "space");
        let docQuery = query(docRef)

        if (q && q.trim().length > 0) {
            const attrs = ['code', 'name', 'description']

            docQuery = query(docQuery, or(...attrs.map(a => and(
                where(a, ">=", q),
                where(a, "<=", q + '\uf8ff')
            ))))
        }

        if (status && status.length > 0) {
            docQuery = query(docQuery, where('status', 'in', status))
        }

        const docSnap = await getDocs(docQuery);
        const resData = docSnap.docs.map(doc => doc.data())

        return ResponseTrait.success(resData);
    },
    store: async (params) => {
        const { error, value } = spaceStoreSchema.validate(params);
        if (error) {
            return ResponseTrait.error(error)
        }

        const dateNow = new Date()
        value.code = generateCode(spaceKey, dateNow, value.name)

        const spaceRef = collection(db, "space");

        const resData = await addDoc(doc(spaceRef), {
            ...value,
            // status: SPACE_STATUS_PENDING,
            created_at: dateNow
        });

        redisClient.hSet(spaceCacheKey.replace(":code", value.code), JSON.stringify(resData))

        return ResponseTrait.success(resData)
    },
    update: async (params, body) => {
        const { error, value } = spaceUpdateSchema.validate({ ...params, ...body });
        if (error) {
            return ResponseTrait.error(error)
        }

        const docRef = collection(db, "space");

        const docQuery = query(docRef, where("code", "==", value.key))

        const docSnap = await getDocs(docQuery);

        if (docSnap.empty) ResponseTrait.error('No such Space!')

        delete value.key
        await updateDoc(docSnap.docs[0].ref, {
            ...value,
            updated_at: new Date()
        })

        const resData = (await getDoc(docSnap.docs[0].ref)).data()

        redisClient.hSet(spaceCacheKey.replace(":code", value.key), JSON.stringify(resData))

        return ResponseTrait.success(resData)
    },
    destroy: async (params) => {
        const { error, value } = spaceDestroySchema.validate(params);
        if (error) {
            return ResponseTrait.error(error)
        }

        const docRef = collection(db, "space");

        const docQuery = query(docRef, where("code", "==", value.key))

        const docSnap = await getDocs(docQuery);

        if (docSnap.empty) ResponseTrait.error('No such Space!')

        delete value.key
        await updateDoc(docSnap.docs[0].ref, {
            status: SPACE_STATUS_DELETED,
            updated_at: new Date(),
            deleted_at: new Date()
        })
        const resData = (await getDoc(docSnap.docs[0].ref)).data()
        redisClient.hSet(spaceCacheKey.replace(":code", value.key), JSON.stringify(resData))

        return ResponseTrait.success(resData)
    },

    changeStatus: async (params, body) => {
        const { error, value } = spaceChangeStatusSchema.validate({ ...params, ...body });
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

        if (value.status === SPACE_STATUS_DELETED) dataUpdate.deleted_at = new Date()

        await updateDoc(docSnap.docs[0].ref, dataUpdate)
        
        const resData = (await getDoc(docSnap.docs[0].ref)).data()
        redisClient.hSet(spaceCacheKey.replace(":code", value.key), JSON.stringify(resData))

        return ResponseTrait.success(resData)
    },
}

export default SpaceService