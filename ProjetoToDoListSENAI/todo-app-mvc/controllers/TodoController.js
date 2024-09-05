import Todo from "@/models/Todo";
import connectMongo from "@/utils/dbConnect";

//criar crud
//Read
export const getTodos = async () => {
  await connectMongo;
  try {
    return await Todo.find();
  } catch (error) {
    console.error(error);
  }
};

//create
export const createTodo = async (data) => {
  connectMongo;
  try {
    return await Todo.create(data);
  } catch (error) {
    console.error(error);
  }
};

//update
export const updateTodo = async (id, data) => {
  await connectMongo();
  return await Todo.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};
//delete
export const deleteTodo = async (id) => {
  await connectMongo();
  return await Todo.deleteOne({ _id: id });
};
