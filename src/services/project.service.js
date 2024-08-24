import { addDoc, collection, doc, setDoc } from "firebase/firestore";

import { db } from "@/core/firebase.config";
import projectModel from "@/models/project.model";

const ProjectService = {
    get: async (params) => {
        const { error, data } = projectModel.projectGetSchema.validate(params);
    },
    getList: async (params) => {
        const { error, data } = projectModel.projectGetSchema.validate(params);
    },
    store: async (params) => {
        const { error, data } = projectModel.projectStoreSchema.validate(params);
    },
    update: async (params) => {
        const { error, data } = projectModel.projectUpdateSchema.validate(params);
    },
    destroy: async (params) => {
        const { error, data } = projectModel.projectDestroySchema.validate(params);
    }
}

export default ProjectService