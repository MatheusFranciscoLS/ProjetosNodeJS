import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    completed:{
        type:Enum('A Fazer','Fazendo','Concluido'),
        default:'A Fazer'
    }
});

const Todo = mongoose.models.Todo || mongoose.model('Todo',TodoSchema);

export default Todo;