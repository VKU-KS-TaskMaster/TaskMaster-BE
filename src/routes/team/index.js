import TeamController from '@/controllers/team.controller';
import validateRequest from '@/middlewares/validateRequest.middleware';
import { idTeamSchema, searchParamsSchema, teamSchema, teamUpdateSchema } from '@/models/team.model';
import express from 'express';
const router = express.Router();

router.post('/',validateRequest(teamSchema) ,TeamController.store);
router.get('/',validateRequest(searchParamsSchema), TeamController.getList);
router.get('/:code',validateRequest(idTeamSchema), TeamController.get);
router.put('/:code',validateRequest(teamUpdateSchema), TeamController.update);
router.delete('/:code',validateRequest(idTeamSchema), TeamController.destroy);

router.post('/add_members', TeamController.addMembers);

module.exports = router;