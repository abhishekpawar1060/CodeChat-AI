import { Router } from 'express';
import { body } from 'express-validator';
import * as projectController from '../controllers/project.controller.js';  
import * as authMiddlerware from '../middleware/auth.middleware.js';    


const router = Router();

router.post('/create', 
    authMiddlerware.authUser,
    body('name').isString().withMessage('Name is required'),
    projectController.createProject
);

export default router;