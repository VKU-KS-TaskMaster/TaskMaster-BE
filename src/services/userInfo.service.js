import { addDoc, and, collection, deleteDoc, getDoc, getDocs, or, query, updateDoc } from "firebase/firestore";

import RedisClient from "@/core/redisCache.config";
import ResponseTrait from "@/core/responseTrait";
import { db } from "@/core/firebase.config";

const UserInfoService = {
    get: async (params) => {
        const { key } = params

        const docRef = collection(db, "user_info");
        const docQuery = query(docRef, where("user_code", "==", key))
        const docSnap = await getDocs(docQuery);

        if (docSnap.empty) return ResponseTrait.error('No such User Info!')

        resData = docSnap.docs[0].data();

        return ResponseTrait.success(resData);
    },
    search: async (params) => {
        const { q } = params

        const docRef = collection(db, "user_info");
        let docQuery = query(docRef)

        if (q && q.trim().length > 0) {
            const attrs = ['code', 'name', 'description']

            docQuery = query(docQuery, or(...attrs.map(a => and(
                where(a, ">=", q),
                where(a, "<=", q + '\uf8ff')
            ))))
        }

        const docSnap = await getDocs(docQuery);
        const resData = docSnap.docs.map(doc => doc.data())

        return ResponseTrait.success(resData);
    },
    store: async (params) => {
        const dateNow = new Date()

        const docRef = collection(db, "user_info");
        const docDoc = await addDoc(docRef, {
            ...params,
            created_at: dateNow
        });

        const resData = (await getDoc(docDoc)).data()

        return ResponseTrait.success(resData)
    },
    update: async (params) => {
        const { key } = params

        const docRef = collection(db, "space");
        const docQuery = query(docRef, where("user_code", "==", key))
        const docSnap = await getDocs(docQuery);

        if (docSnap.empty) return ResponseTrait.error('No such User Info!')

        delete params.key
        await updateDoc(docSnap.docs[0].ref, {
            ...params,
            updated_at: new Date()
        })

        const resData = (await getDoc(docSnap.docs[0].ref)).data()

        return ResponseTrait.success(resData)
    },
    destroy: async (params) => {
        const { key } = params

        const docRef = collection(db, "user_info");
        const docQuery = query(docRef, where("user_code", "==", key))
        const docSnap = await getDocs(docQuery);

        if (docSnap.empty) return ResponseTrait.error('No such User Info!')

        await deleteDoc(docSnap.docs[0].ref)

        return ResponseTrait.success()
    }
}

export default UserInfoService