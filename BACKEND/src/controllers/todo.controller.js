import { Todo } from '../models/todo.model.js';
import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import { stringify } from 'flatted';  // Import flatted
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

export {addnewTodo}