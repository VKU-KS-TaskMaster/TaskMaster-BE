import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "@/core/firebase.config";
import { userInfoGetSchema, userInfoStoreSchema, userInfoUpdateSchema } from "@/models/userInfo.model";

const UserInfoService = {
    store: async (params) => {
        try {
            // await setDoc(doc(db, "user_info"), {
            //     name: "Los Angeles",
            //     state: "CA",    
            //     country: "USA"
            // });
            const { error, value } = userInfoStoreSchema.validate(params);

            if (error) {
                throw new Error(`Validation error: ${error.details[0].message}`);
            }

            try {

            } catch (e) {
                console.error("Error adding document: ", e);
            }

            const docRef = await addDoc(collection(db, "user_info"), {
                first_name: user.email?.split('@')[0] || "",
                user_id: user.uid
            });
            console.log("Document written with ID: ", docRef.id);

            return docRef
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    },
    update: async (params) => {
        const { error, value } = userInfoUpdateSchema.validate(params);

        if (error) {
            throw new Error(`Validation error: ${error.details[0].message}`);
        }

        try {

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    },
    getList: async (params) => {
        const { error, value } = userInfoGetSchema.validate(params);

        if (error) {
            throw new Error(`Validation error: ${error.details[0].message}`);
        }

        try {
            const docRef = doc(db, "", "");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    },
    get: async (params) => {
        const { error, value } = userInfoGetSchema.validate(params);

        if (error) {
            throw new Error(`Validation error: ${error.details[0].message}`);
        }

        try {
            const docRef = doc(db, "", "");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    },
    updateStatus: async (params) => {

    },
    destroy: async (params) => {

    }
}

export default UserInfoService