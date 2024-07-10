import { Todo } from '../models/todo.model.js';
import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import { User } from '../models/user.model.js';

const addnewTodo = asyncHandler(async(req,res)=>{
  const {title,description} = req.body
  const userId = req.user._id           //ye req.user auth middleware me hai
//   console.log(req.user);
  const idid= req.user
//   console.log(idid._id);
//   console.log(userId);

  if(! title){
    throw new ApiError(400,"a title is required")
  }

  const todo = await Todo.create({
    title,
    description,
    userId: userId,
  })

  const user =await User.findById(userId)
  if(!user){
    throw new ApiError(400,"user not found")
  }
  const savedtodo = await todo.save();
  user.todos.push(savedtodo)
  await user.save();

  return res
  .status(200)
  .json(new ApiResponse(200,savedtodo,"todo added successfully"))
})

const updateTodo = asyncHandler(async(req,res)=>{
    const  id  = req.params.id;  // _id: The unique identifier for the todo document in MongoDB.
    // id: The parameter extracted from the URL, representing the specific todo's ID to be updated.
    const { title, description } = req.body;
    const userId = req.user._id;

    const todo = await Todo.findOne(
        { _id: id, userId: userId }, //  This is the condition object. It specifies that the document to be updated must have an _id matching id and a userId field matching userId
    );

    if (!todo) {
        throw new ApiError(404, 'Todo not found');
    }

    if(title) todo.title = title
    if(description) todo.description = description

    await todo.save();

    return res.status(200).json(new ApiResponse(200, todo, 'Todo updated successfully'));
})

const deleteTodo = asyncHandler(async(req,res)=>{
    const id  = req.params.id;
    const userId = req.user._id;

    const todo = await Todo.findOne({ _id: id, userId: userId });
    
    if (!todo) {
        throw new ApiError(404, 'Todo not found');
    }

    // Remove the todo from the user's todos array
    // await User.findByIdAndUpdate(user._id, { $pull: { todos: id } });
    await Todo.deleteOne({ _id: id, userId: userId });

    return res.json("note deleted successfully")

})

const getallTodo = asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    const alltodos = await Todo.find({userId:userId})
    return res.status(200).json(
        new ApiResponse(200,alltodos,"all todos fetched")
    )
})

export {addnewTodo,updateTodo,deleteTodo,getallTodo}