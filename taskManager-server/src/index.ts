import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import taskRoutes from '../src/routes/taskRoutes';
const app = express();
const PORT = 5001;

app.use(express.json());

app.use('/api/tasks', taskRoutes);

const MONGODB_URI = process.env.MONGODB_URI||'mongodb://127.0.0.1:27017/taskmanager';

mongoose.connect(MONGODB_URI)
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("MongoDB Connection Error", err));

app.get('/', (req: Request, res:Response) =>{
    res.send("Task Manager API is running...");
});

app.listen(PORT, () =>{
    console.log(`Server ready at http://localhost:${PORT}`)
})