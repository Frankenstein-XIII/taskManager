import {useState, useEffect} from 'react';
import { ITask } from './types/task';
import { createTask, getTasks, updateTask, deleteTask} from './services/taskServices';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 2. featch data from backend on component load
  useEffect(() => {
    const fetchTasks = async () =>{
      try{
        const data = await getTasks();
        setTasks(data)
      }catch(error){
        console.error("failed to fetch", error);
      }finally{
        setLoading(false)
      }
    }
    fetchTasks();
  }, []);

  const handleToggle = async (id: string, isCompleted: boolean) => {
    try {
      await updateTask(id, isCompleted);
      setTasks(tasks.map((t) => (t._id === id ? { ...t, isCompleted } : t)));
    } catch (error) {
      console.error("Toggle failed", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));

    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleAddTask = async (title: string, description?: string) =>{
    try{
      const newTask = await createTask(title, description);
      setTasks((prevTasks) => [newTask, ...prevTasks]);
    }catch(error){
      console.error("failed to create task.", error);
    }
  };


  return (
    <div style={{ padding: "20px" }}>
      <header>
        <h1 style={{ fontSize: "28px", color: "#0f172a", marginBottom: "8px" }}>
          Task Manager 📝
        </h1>
      </header>

      <main
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
        }}
      >
        <TaskForm onAdd={handleAddTask} />
        {loading ? (
          <p>Loading your tasks ...</p>
        ) : (
          <TaskList
            tasks={tasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}

export default App;