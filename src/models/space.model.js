import SpaceStatusEnumArr from "@/enums/SpaceStatusEnum"
import Joi from "joi"

const spaceKey = "space"
const spaceCacheKey = "space_:code_"
const spaceSearchCacheKey = "space.search_:code_"

const spaceGetSchema = Joi.object({
    key: Joi.string().required()
})

const spaceGetListSchema = Joi.object({
    q: Joi.string().optional(),
    user_code: Joi.string().optional(),
    
    status: Joi.array().items(Joi.number().integer()).optional(),
})

const spaceStoreSchema = Joi.object({
    user_code: Joi.string().required(),
    name: Joi.string().required(),
    status: Joi.number().integer().valid(...SpaceStatusEnumArr).required(),
    description: Joi.string().optional()
}).unknown()

const spaceUpdateSchema = Joi.object({
    key: Joi.string().required(),

    name: Joi.string().optional(),
    status: Joi.number().integer().valid(...SpaceStatusEnumArr).optional(),
    description: Joi.string().optional()
}).unknown()

const spaceDestroySchema = Joi.object({
    key: Joi.string().required(),
})

const spaceChangeStatusSchema = Joi.object({
    key: Joi.string().required(),
    status: Joi.number().valid(...SpaceStatusEnumArr).required()
})

export {
    spaceKey,
    spaceCacheKey,
    spaceSearchCacheKey,

    spaceGetSchema,
    spaceGetListSchema,
    spaceStoreSchema,
    spaceUpdateSchema,
    spaceDestroySchema,

    spaceChangeStatusSchema
}