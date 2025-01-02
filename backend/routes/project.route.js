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


router.get('/all',
    authMiddlerware.authUser,
    projectController.getAllProjects
);


router.put('/add-user',
    authMiddlerware.authUser,
    body('projectId').isString().withMessage('Project ID is required').bail(),
    body('users').isArray({ min: 1}).withMessage('Users must be an array of string').bail()
        .custom((users) => users.every(user => typeof user === 'string')).withMessage('Users must be an array of string'),
    projectController.addUserToProject
);


router.get('/get-project/:projectId',
    authMiddlerware.authUser,
    projectController.getProjectById
);


export default router;