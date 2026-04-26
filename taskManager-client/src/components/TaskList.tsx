import { ITask } from "../types/task";
import { TaskItem } from "./TaskItem";

interface TaskListProps{
    readonly tasks: ITask[];
    readonly onToggle: (id: string, isCompleted:boolean)=> void;
    readonly onDelete: (id: string) => void;
}

export function TaskList({tasks, onToggle, onDelete}: TaskListProps){
    if(tasks.length === 0){
        return <p>No tasks found. Create some above! 🚀</p>;
    }
    return(
        <ul style={{listStyle:'none', padding:0}}>
            {tasks.map((task)=>(
                <TaskItem key={task._id} task={task} onToggle={onToggle} onDelete={onDelete}/>
            ))}
        </ul>
    );
}