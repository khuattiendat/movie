const express = require('express');
const ActorController = require('../Controllers/ActorController');
const router = express.Router();
router.post('/create', ActorController.createActor);
router.get('/get-one/:id', ActorController.getActorById);
router.get('/get-all', ActorController.getAllActors);
router.put('/update/:id', ActorController.updateActor);
router.delete('/delete/:id', ActorController.deleteActor);
module.exports = router;