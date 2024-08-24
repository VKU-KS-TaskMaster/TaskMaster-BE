import { addDoc, collection, doc, setDoc } from "firebase/firestore";

import { db } from "@/core/firebase.config";
import taskModel from "@/models/task.model";

const TaskService = {
    get: async (params) => {
        const { error, data } = taskModel.taskGetSchema.validate(params);
    },
    getList: async (params) => {
        const { error, data } = taskModel.taskGetSchema.validate(params);
    },
    store: async (params) => {
        const { error, data } = taskModel.taskStoreSchema.validate(params);
    },
    update: async (params) => {
        const { error, data } = taskModel.taskUpdateSchema.validate(params);
    },
    destroy: async (params) => {
        const { error, data } = taskModel.taskDestroySchema.validate(params);
    }
}

export default TaskService