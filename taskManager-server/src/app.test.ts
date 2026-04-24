import request from 'supertest';
import mongoose from 'mongoose';
import express from 'express';
import taskRoutes from './routes/taskRoutes';

const app = express();
app.use(express.json());
app.use('/api/tasks', taskRoutes);

app.get('/api/health/', (req, res) => res.status(200).json({status:'ok'}));
describe("Database Connection", ()=>{
    beforeAll(async () =>{
        const url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/taskmanager';
        await mongoose.connect(url);
    });

    afterAll(async ()=>{
        await mongoose.connection.close();
    });

    it('should return 200 from the health check endpoint', async ()=>{
        const response = await request(app).get('/api/health');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('ok')
    });
});