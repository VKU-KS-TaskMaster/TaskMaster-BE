import express from 'express'

import {
    spaceDestroySchema,
    spaceGetSchema,
    spaceSearchMembersSchema,
    spaceSearchSchema,
    spaceStoreSchema,
    spaceUpdateMembersSchema,
    spaceUpdateSchema
} from '@/models/space.model'
import SpaceController from '@/controllers/space.controller'
import validateRequest from '@/middlewares/validateRequest.middleware'

const router = express.Router()

router.get('/:key', validateRequest(spaceGetSchema), SpaceController.get)
router.get('/', validateRequest(spaceSearchSchema), SpaceController.search)
router.post('/', validateRequest(spaceStoreSchema), SpaceController.store)
router.put('/:key', validateRequest(spaceUpdateSchema), SpaceController.update)
router.delete('/:key', validateRequest(spaceDestroySchema), SpaceController.destroy)

router.get('/:key/search_members', validateRequest(spaceSearchMembersSchema), SpaceController.searchMembers)
router.post('/:key/update_members', validateRequest(spaceUpdateMembersSchema), SpaceController.updateMembers)

module.exports = router
