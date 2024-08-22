import { addDoc, collection, doc, setDoc } from "firebase/firestore";

import { db } from "@/core/firebase.config";
import { projectStoreSchema } from "@/models/project.model";

const ProjectService = {
    store: async (data) => {
        const { error, value } = projectStoreSchema.validate(data);

        if (error) {
            throw new Error(`Validation error: ${error.details[0].message}`);
        }

        try {
            const docRef = await addDoc(collection(db, "project"), value);

            return docRef
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }, 
    update: async (data) => {
    }
}

export default ProjectService