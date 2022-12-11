const express = require('express')
const userController = require('../controllers/userController')
const { body } = require('express-validator'); 
const router = new express.Router();

router.get('/user', userController.getUsers);
router.post('/user', 
            body('email').isEmail().normalizeEmail(),
            body('name').not().isEmpty().escape(),
            body('role').not().isEmpty().escape(),
            userController.addUser);
router.put('/user', 
            body('email').isEmail().normalizeEmail(),
            body('name').not().isEmpty().escape(),
            body('role').not().isEmpty().escape(),
            userController.updateUser);
router.delete('/user/:id',userController.deleteUser);
           
module.exports = router;