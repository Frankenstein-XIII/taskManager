import mongoose, {Schema, Document} from "mongoose";

//1. define the interface for the document
export interface ITask extends Document{
    title: string;
    description?: string;
    isCompleted: boolean;
    createdAt: Date;
}

// 2. create the schema
const TaskSchema: Schema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    isCompleted: {type: Boolean, default: false},
    createAt: {type:Date, default: Date.now}
})

// export the model 
export default mongoose.model<ITask>('Task', TaskSchema);