import mongoose from 'mongoose';
import projectModel from '../models/project.model.js';


export const createProject = async ({ name, userId }) => {
    if(!name){
        throw new Error('Name is required');
    }   

    if(!userId){
        throw new Error('User is required');
    }

    let project;

    try {
        project = await projectModel.create({ name, users: [userId] }); 

    } catch (error) {
        if(error.code === 11000){
            throw new Error('Project name must be unique');
        }
        throw error;
    }
    return project;
};

export const getAllProjectByUserId = async ({userId}) => {   
    if(!userId){
        throw new Error('User is required');
    }   

    const allUserProjects = await projectModel.find({ users: userId });

    return allUserProjects;
} 

export const addUserToProject = async ({ projectId, users, userId }) => {
    if(!projectId){
        throw new Error('Project ID is required');
    }

    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error("Invalid projectId");
    }

    if(!users || users.length === 0){
        throw new Error('Users must be an array of string');
    }

    if(!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId))){
        throw new Error("Invalid userId in users array");
    }

    if(!userId){
        throw new Error("Invalid userId");
    }

    const project = await projectModel.findOne({
        _id: projectId,
        users: userId
    });

    if(!project){
        throw new Error('Project not found');
    }

    const updateProject = await projectModel.findOneAndUpdate({
        _id: projectId
    }, {
        $addToSet: {
            users: {
                $each: users
            }
        }
    },{
        new: true
    })

    return updateProject;
}



export const getProjectById = async ({ projectId }) => {
    if(!projectId){
        throw new Error('Project ID is required');
    }

    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error("Invalid projectId");
    }

    const project = await projectModel.findOne({ _id: projectId }).populate('users');

    return project;
}