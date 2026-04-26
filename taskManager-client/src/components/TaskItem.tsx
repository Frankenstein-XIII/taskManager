import { ITask } from "../types/task";
import styles from './TaskItem.module.css';

interface TaskItemProps{
    readonly task: ITask;
    readonly onToggle: (id:string, isCompleted:boolean) => void;
    readonly onDelete: (id: string) => void;
}

export function TaskItem({task, onToggle, onDelete}: TaskItemProps){
    return (
        <div className= {`${styles.taskCard} ${task.isCompleted ? styles.completedCard:''}`}>
            <div className={styles.leftSection}>
                <input type="checkbox"  checked={task.isCompleted} onChange={()=>onToggle(task._id, !task.isCompleted)} className={styles.checkbox}/>
                <div>
                    <h3 className={`${styles.taskTitle} ${task.isCompleted ?styles.completedTitle:''}`}>{task.title}</h3>
                    <h3>
                        {task.description && (
                            <p className={styles.description}> {task.description}</p>
                        )}
                    </h3>
                </div>
            </div>
            <button onClick={()=>onDelete(task._id)} className={styles.deleteBtn}>Delete</button>
        </div>    )
}