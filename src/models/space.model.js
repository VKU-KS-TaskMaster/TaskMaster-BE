import SpaceStatusEnumArr from "@/core/enums/SpaceStatusEnum"
import Joi from "joi"

const spaceGetSchema = Joi.object({
    key: Joi.string().required()
})

const spaceGetListSchema = Joi.object({
    key: Joi.string().optional(),
    
    user_id: Joi.array().items(Joi.number().integer()).optional(),
    status: Joi.array().items(Joi.number().integer()).optional(),
})

const spaceStoreSchema = Joi.object({
    user_id: Joi.number().integer().required(),
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
    spaceGetSchema,
    spaceGetListSchema,
    spaceStoreSchema,
    spaceUpdateSchema,
    spaceDestroySchema,

    spaceChangeStatusSchema
}