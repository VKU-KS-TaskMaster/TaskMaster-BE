import { SPACE_STATUS_DELETED, SPACE_STATUS_PENDING } from "@/core/enums/SpaceStatusEnum";
import { db } from "@/core/firebase.config";
import { spaceChangeStatusSchema, spaceDestroySchema, spaceGetListSchema, spaceGetSchema, spaceStoreSchema, spaceUpdateSchema } from "@/models/space.model";
import { collection, doc, query, where, getDocs, or, and, addDoc, getDoc, updateDoc } from "firebase/firestore";

const SpaceService = {
    get: async (params) => {
        const { error, value } = spaceGetSchema.validate(params);

        const docRef = collection(db, "space");

        const docQuery = query(docRef, where("code", "==", value.key))

        const docSnap = await getDocs(docQuery);

        if (!docSnap.empty) {
            const spaceData = docSnap.docs[0].data();
            return spaceData;
        }
    },
    search: async (params) => {
        const userIdArr = params.user_id?.split(',')
        params.user_id = userIdArr
        const statusArr = params.status?.split(',')
        params.status = statusArr

        const { error, value } = spaceGetListSchema.validate(params);
        const { key } = value

        const docRef = collection(db, "space");
        let docQuery = query(docRef)

        if (key && key.trim().length > 0) {
            const attrs = ['code', 'name', 'description']

            docQuery = query(docQuery, or(...attrs.map(a => and(
                where(a, ">=", key),
                where(a, "<=", key + '\uf8ff')
            ))))
        }

        const paramArr = ['user_id', 'status']
        paramArr.map(p => {
            if(value[p] && value[p].length > 0) {
                docQuery = query(docQuery, where(p, 'in', value[p]))
            }
        })

        const docSnap = await getDocs(docQuery);

        return docSnap.docs.map(doc => doc.data());
    },
    store: async (params) => {
        const { error, value } = spaceStoreSchema.validate(params);

        const spaceRef = collection(db, "space");

        const spaceSnap = await addDoc(doc(spaceRef), {
            ...value,
            status: SPACE_STATUS_PENDING,
        });

        return spaceSnap
    },
    update: async (params, body) => {
        const { error, value } = spaceUpdateSchema.validate({...params, ...body});

        const docRef = collection(db, "space");

        const docQuery = query(docRef, where("code", "==", value.key))

        const docSnap = await getDocs(docQuery);

        if (!docSnap.empty) {
            delete value.key
            await updateDoc(docSnap.docs[0].ref, {
                ...value
            })

            return (await getDoc(docSnap.docs[0].ref)).data()
        }
    },
    destroy: async (params) => {
        const { error, value } = spaceDestroySchema.validate(params);

        const docRef = collection(db, "space");

        const docQuery = query(docRef, where("code", "==", value.key))

        const docSnap = await getDocs(docQuery);

        if (!docSnap.empty) {
            delete value.key
            await updateDoc(docSnap.docs[0].ref, {
                status: SPACE_STATUS_DELETED,
                deleted_at: new Date()
            })

            return (await getDoc(docSnap.docs[0].ref)).data()
        }
    },

    changeStatus: async (params, body) => {
        const { error, value } = spaceChangeStatusSchema.validate({...params, ...body});

        const docRef = collection(db, "space");

        const docQuery = query(docRef, where("code", "==", value.key))

        const docSnap = await getDocs(docQuery);

        if (!docSnap.empty) {
            await updateDoc(docSnap.docs[0].ref, {
                status: value.status
            })

            return (await getDoc(docSnap.docs[0].ref)).data()
        }
    },
}

export default SpaceService