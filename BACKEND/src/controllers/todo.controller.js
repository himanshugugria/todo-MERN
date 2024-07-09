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
    user: userId,
  })

  const user =await User.findById(userId)
  if(!user){
    throw new ApiError(400,"user not found")
  }
  const savedtodo = await todo.save();
  user.todos.push(savedtodo._id)
  await user.save();

  res
  .status(200)
  .json(new ApiResponse(200,"todo added successfully"))
})

const updateTodo = asyncHandler(async(req,res)=>{
    const  id  = req.params.id;  // _id: The unique identifier for the todo document in MongoDB.
    // id: The parameter extracted from the URL, representing the specific todo's ID to be updated.
    const { title, description } = req.body;
    const userId = req.user._id;

    const todo = await Todo.findOneAndUpdate(
        { _id: id, user: userId }, //  This is the condition object. It specifies that the document to be updated must have an _id matching id and a user field matching userId
        { title, description },
        { new: true, runValidators: true }  // new: true: Ensures that the method returns the updated document, not the original one.
        // runValidators: true: Ensures that the update operation runs the validation rules defined in the Mongoose schema.
    );

    if (!todo) {
        throw new ApiError(404, 'Todo not found');
    }

    res.status(200).json(new ApiResponse(200, todo, 'Todo updated successfully'));
})

const deleteTodo = asyncHandler(async(req,res)=>{
    const id  = req.params.id;
    const user = req.user;

    const todo = await Todo.findOne({ _id: id, user: user._id });
    
    if (!todo) {
        throw new ApiError(404, 'Todo not found');
    }

    // Remove the todo from the user's todos array
    // await User.findByIdAndUpdate(user._id, { $pull: { todos: id } });
    await Todo.deleteOne({ _id: id, userId: user._id });
})

const getallTodo = asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    const alltodos = await Todo.find({user:userId})
    res.status(200).json(
        new ApiResponse(200,alltodos,"all todos fetched")
    )
})

export {addnewTodo,updateTodo,deleteTodo,getallTodo}