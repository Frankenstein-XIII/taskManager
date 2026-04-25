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

export const updateTask = async (req: Request, res: Response)=>{
    try{
        const {id} = req.params;
        const {title, description, isCompleted} = req.body;


        const updatedTask = await Task.findByIdAndUpdate(
            id, 
            {title, description, isCompleted},
            {returnDocument: 'after'}
        );
        if (!updatedTask){
            return res.status(400).json({message:"Task not found"});
        }
        res.status(200).json(updatedTask);
    }
    catch(error){
        res.status(500).json({message:"Error updating task", error});
    }
};

export const deleteTask = async(req: Request, res: Response) =>{
    try{
        const {id} = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask){
            return res.status(404).json({message: "Task not found"});
        }

        res.status(200).json({message:"Task deleted successfully"});
    }
    catch(err){
        res.status(500).json({message: "Error deleting task", err});
    }
};