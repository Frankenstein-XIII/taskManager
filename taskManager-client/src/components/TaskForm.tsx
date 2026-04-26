import { useState } from "react";
import styles  from './TaskItem.module.css'


interface TaskFormPros{
    readonly onAdd: (title: string, description?:string) => Promise<void>;
}

export function TaskForm({onAdd}: TaskFormPros){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.SubmitEvent) =>{
        e.preventDefault();

        if(!title.trim()) return;

        await onAdd(title, description);

        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContanier}>
            <div className={styles.inputGroup}>
                <input type="text" placeholder="What needs to be done?" value={title} onChange={(e)=>setTitle(e.target.value)} className={styles.input} />
                <input type="text" placeholder="Description (optional)" value={description} onChange={(e)=>setDescription(e.target.value)} className={styles.input} />
            </div>
            <button type="submit" className={styles.submitBtn}>Add</button>
        </form>
    )
}