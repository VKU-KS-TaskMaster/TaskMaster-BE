import express from 'express';

import TeamController from '@/controllers/team.controller';
import validateRequest from '@/middlewares/validateRequest.middleware';
import { teamGetSchema, searchParamsSchema, teamSchema, teamUpdateSchema } from '@/models/team.model';

const router = express.Router();

router.get('/:key', validateRequest(teamGetSchema), TeamController.get);
router.get('/', validateRequest(searchParamsSchema), TeamController.search);
router.post('/', validateRequest(teamSchema) ,TeamController.store);
router.put('/:key', validateRequest(teamUpdateSchema), TeamController.update);
router.delete('/:key', validateRequest(teamGetSchema), TeamController.destroy);

router.post('/add_members', TeamController.addMembers);

module.exports = router;