import TeamController from '@/controllers/team.controller';
import express from 'express';
const router = express.Router();

router.post('/', TeamController.store);
router.get('/', TeamController.getList);
router.get('/:code', TeamController.get);
router.put('/:code', TeamController.update);
router.delete('/:code', TeamController.destroy);

module.exports = router;