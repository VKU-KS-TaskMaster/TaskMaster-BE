import { spaceDestroySchema, spaceGetSchema, spaceStoreSchema, spaceUpdateSchema } from "@/models/space.model";

const SpaceService = {
    get: async (params) => {
        const { error, data } = spaceGetSchema.validate(params);
    },
    getList: async (params) => {
        const { error, data } = spaceGetSchema.validate(params);
    },
    store: async (params) => {
        const { error, data } = spaceStoreSchema.validate(params);
    },
    update: async (params) => {
        const { error, data } = spaceUpdateSchema.validate(params);
    },
    destroy: async (params) => {
        const { error, data } = spaceDestroySchema.validate(params);
    }
}

export default SpaceService