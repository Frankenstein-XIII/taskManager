import api from './api';

//1. fetch all tasks
export const getTasks = async () =>{
    const response = await api.get('/tasks');
    return response.data;
};

//2. create data 
export const createTask = async(title: string, description?:string) =>{
    const response = await api.post('/tasks', {title, description});
    return response.data
};

//3. toggle complete/ update task 
export const updateTask = async( id: string, isCompleted: boolean) =>{
    const response = await api.put(`/tasks/${id}`, {isCompleted});
    return response.data;
}

//4. delete task 
export const deleteTask = async(id: string) =>{
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
}