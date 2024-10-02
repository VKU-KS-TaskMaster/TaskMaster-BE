import SpaceStatusEnumArr from '@/enums/SpaceStatusEnum'
import JoiCustom from '@/core/joiCustom.config'

const spaceKey = 'space'
const spaceCacheKey = 'space_:code_'
const spaceSearchCacheKey = 'space.search_:code_'

const spaceGetSchema = JoiCustom.object({
    key: JoiCustom.string().required()
})

const spaceSearchSchema = JoiCustom.object({
    q: JoiCustom.string().optional(),
    user_code: JoiCustom.string().optional(),

    status: JoiCustom.stringArray()
        .items(
            JoiCustom.number()
                .integer()
                .valid(...SpaceStatusEnumArr)
        )
        .optional()
})

const spaceStoreSchema = JoiCustom.object({
    user_code: JoiCustom.string().required(),
    name: JoiCustom.string().required(),
    status: JoiCustom.number()
        .integer()
        .valid(...SpaceStatusEnumArr)
        .required(),
    description: JoiCustom.string().optional()
})

const spaceUpdateSchema = JoiCustom.object({
    key: JoiCustom.string().required(),

    name: JoiCustom.string().optional(),
    status: JoiCustom.number()
        .integer()
        .valid(...SpaceStatusEnumArr)
        .optional(),
    description: JoiCustom.string().optional()
})

const spaceDestroySchema = JoiCustom.object({
    key: JoiCustom.string().required()
})

const spaceChangeStatusSchema = JoiCustom.object({
    key: JoiCustom.string().required(),
    status: JoiCustom.number()
        .valid(...SpaceStatusEnumArr)
        .required()
})

//-------------------------------------------------
const spaceSearchMembersSchema = JoiCustom.object({
    key: JoiCustom.string().required(), //SpaceCode

    q: JoiCustom.string().allow('').default('').required()
})

const spaceUpdateMembersSchema = JoiCustom.object({
    key: JoiCustom.string().required(), //SpaceCode

    members: JoiCustom.array().items(JoiCustom.object()).optional().default([]),
    teams: JoiCustom.array().items(JoiCustom.object()).optional().default([])
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
    spaceChangeStatusSchema,
    spaceSearchMembersSchema,
    spaceUpdateMembersSchema
}
