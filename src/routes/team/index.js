import TeamController from '@/controllers/team.controller';
import express from 'express';
const router = express.Router();

router.post('/', TeamController.store);
router.get('/', TeamController.getList);
router.get('/:id', TeamController.get);
router.put('/:id', TeamController.update);
router.delete('/:id', TeamController.destroy);

module.exports = router;