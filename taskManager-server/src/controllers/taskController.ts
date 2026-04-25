import { Request, Response } from 'express';
import Task from '../models/Task';


export const createTask = async (req: Request, res: Response) =>{
    try{
        const {title, description} = req.body;

        const newTask = new Task({
            title, description,
        });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    }
    catch(error){
        res.status(500).json({message: "Error creating task!", error});
    }
};

export const getTask = async (req: Request, res:Response)=>{
    try{
        const tasks = await Task.find().sort({createdAt: -1});
        res.status(200).json(tasks);
    }catch(error){
        res.status(500).json({message: "Error fetching tasks", error});
    }
};