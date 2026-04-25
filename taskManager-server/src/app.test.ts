import request from 'supertest';
import mongoose, { mongo } from 'mongoose';
import express from 'express';
import taskRoutes from './routes/taskRoutes';

const app = express();
app.use(express.json());
app.use('/api/tasks', taskRoutes);

describe("Task API Integration Tests", ()=>{
    beforeAll(async () =>{
        const url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/taskmanager';
        await mongoose.connect(url);
    });
    beforeEach( async ()=>{
        if(mongoose.connection.db){
            await mongoose.connection.db.collection('tasks').deleteMany({});
        }
    });

    afterAll(async ()=>{
        await mongoose.connection.close();
    });

    it('should return 200 from the health check endpoint', async ()=>{
        expect(mongoose.connection.readyState).toBe(1);

    });
    it("Should create a new task with valid data", async ()=>{
        const response = await request(app)
        .post('/api/tasks')
        .send({
            title: "Complete Phase 2",
            description: "Integration C logic"
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.title).toBe('Complete Phase 2')
    });

    it("should fail if title is missing", async ()=>{
        const response = await request(app)
        .post('/api/tasks')
        .send({description: 'no title here.'});

        expect(response.status).toBe(500);
    });
    it("Should fetch all tasks from the database", async () =>{
        await request(app)
        .post('/api/tasks')
        .send({title: "Tasks to be fetched"});

        const response = await request(app).get("/api/tasks");

        //assertions 
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].title).toBe("Tasks to be fetched")
    });

    it("should update a task", async () =>{
        const res = await request(app)
        .post('/api/tasks')
        .send({title:"Update task test"});
        const taskId = res.body._id;

        const response = await request(app)
          .put(`/api/tasks/${taskId}`)
          .send({isCompleted: true });
        console.log(response.body.isCompleted)
        expect(response.status).toBe(200);
        expect(response.body.isCompleted).toBe(true);
    });

    it("Should delete a task ", async () =>{
        const res = await request(app)
        .post('/api/tasks')
        .send({title:"Testing delete "});
        const taskId = res.body._id;

        const response = await request(app).delete(`/api/tasks/${taskId}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Task deleted successfully")

        const check = await request(app).get('/api/tasks')
        expect(check.body.length).toBe(0);

    });
});