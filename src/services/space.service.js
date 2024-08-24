import spaceModel from "@/models/space.model";

const SpaceService = {
    get: async (params) => {
        const { error, data } = spaceModel.spaceGetSchema.validate(params);
    },
    getList: async (params) => {
        const { error, data } = spaceModel.spaceGetSchema.validate(params);
    },
    store: async (params) => {
        const { error, data } = spaceModel.spaceStoreSchema.validate(params);
    },
    update: async (params) => {
        const { error, data } = spaceModel.spaceUpdateSchema.validate(params);
    },
    destroy: async (params) => {
        const { error, data } = spaceModel.spaceDestroySchema.validate(params);
    }
}

export default SpaceService