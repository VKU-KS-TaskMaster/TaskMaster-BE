import { addDoc, collection, doc, setDoc } from "firebase/firestore";

import { db } from "@/core/firebase.config";
import milestoneModel from "@/models/milestone.model";

const MilestoneService = {
    get: async (params) => {
        const { error, data } = milestoneModel.milestoneGetSchema.validate(params);
    },
    getList: async (params) => {
        const { error, data } = milestoneModel.milestoneGetSchema.validate(params);
    },
    store: async (params) => {
        const { error, data } = milestoneModel.milestoneStoreSchema.validate(params);
    },
    update: async (params) => {
        const { error, data } = milestoneModel.milestoneUpdateSchema.validate(params);
    },
    destroy: async (params) => {
        const { error, data } = milestoneModel.milestoneDestroySchema.validate(params);
    }
}

export default MilestoneService