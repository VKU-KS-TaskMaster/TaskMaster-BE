import SpaceStatusEnumArr from "@/enums/SpaceStatusEnum"
import JoiCustom from "@/core/joiCustom.config"

const spaceKey = "space"
const spaceCacheKey = "space_:code_"
const spaceSearchCacheKey = "space.search_:code_"

const spaceGetSchema = JoiCustom.object({
    key: JoiCustom.string().required()
})

const spaceSearchSchema = JoiCustom.object({
    q: JoiCustom.string().optional(),
    user_code: JoiCustom.string().optional(),
    
    status: JoiCustom.stringArray().items(JoiCustom.number().integer().valid(...SpaceStatusEnumArr)).optional(),
})

const spaceStoreSchema = JoiCustom.object({
    user_code: JoiCustom.string().required(),
    name: JoiCustom.string().required(),
    status: JoiCustom.number().integer().valid(...SpaceStatusEnumArr).required(),
    description: JoiCustom.string().optional()
}).unknown()

const spaceUpdateSchema = JoiCustom.object({
    key: JoiCustom.string().required(),

    name: JoiCustom.string().optional(),
    status: JoiCustom.number().integer().valid(...SpaceStatusEnumArr).optional(),
    description: JoiCustom.string().optional()
}).unknown()

const spaceDestroySchema = JoiCustom.object({
    key: JoiCustom.string().required(),
})

const spaceChangeStatusSchema = JoiCustom.object({
    key: JoiCustom.string().required(),
    status: JoiCustom.number().valid(...SpaceStatusEnumArr).required()
})

export {
    spaceKey,
    spaceCacheKey,
    spaceSearchCacheKey,

    spaceGetSchema,
    spaceSearchSchema,
    spaceStoreSchema,
    spaceUpdateSchema,
    spaceDestroySchema,

    spaceChangeStatusSchema
}