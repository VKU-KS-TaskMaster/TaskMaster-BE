import SpaceStatusEnumArr from "@/core/enums/SpaceStatusEnum"
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
    name: Joi.string().optional(),
    status: Joi.array().optional(),
    description: Joi.string().optional()
})

const spaceUpdateSchema = Joi.object({
    name: Joi.string().optional(),
    status: Joi.array().optional(),
    description: Joi.string().optional()
})

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