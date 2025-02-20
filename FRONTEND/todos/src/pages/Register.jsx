import React, { useState } from 'react'
import { Link,NavLink, useNavigate} from 'react-router-dom'
import axiosInstance from '../utils/AxioInstance'

function Register() {

    const [name,setName]= useState("")
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const [username,setUsername]= useState("")
    const [error,setError] = useState(null);    // initial value of error to be null
    const navigate = useNavigate();


    const handlesignup = async(e)=>{
        e.preventDefault();
        if(!name){
            setError("please enter your name")
            return;
        }
        if(!username){
            setError("please enter your username")
            return;
        }
        if(!password){
            setError("please enter your password")
            return;
        }
        if(!email){
            setError("please enter your email")
            return;
        }
        setError("")

        // API call
        try {
            const response =await axiosInstance.post("/users/register",{
                email:email,
                password: password,
                username: username,
                fullName: name,
            })

            // console.log(response);

            if(response.data && response.data.data && response.data.data.accessToken){
                localStorage.setItem("token",response.data.data.accessToken)
                console.log(response.data.data.accessToken);
                navigate("/dashboard")
            }
            else{
                console.log("no access token in response")
            }
            
        } catch (error) {
            setError(error.response?.data?.message || "error occured")
        }
        
    }

  return (
    <>
    <section>
  <div class="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
    <div class="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
      <div class="mb-2 flex justify-center">
        
      </div>
      <h2 class="text-center text-2xl font-bold leading-tight text-black">
        Sign up to create account
      </h2>
      <p class="mt-2 text-center text-base text-gray-600">
        Already have an account?{" "}
        <NavLink
          to="/login"
          class="font-medium text-black transition-all duration-200 hover:underline"
        >
          login to your account
        </NavLink>
      </p>
      <form onSubmit={handlesignup} class="mt-8">
        <div class="space-y-5">
          <div>
            <label htmlFor="name" class="text-base font-medium text-gray-900">
              Full Name
            </label>
            <div class="mt-2">
              <input
                class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label for="name" class="text-base font-medium text-gray-900">
              {" "}
              username{" "}
            </label>
            <div class="mt-2">
              <input
                class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label for="email" class="text-base font-medium text-gray-900">
              {" "}
              Email address{" "}
            </label>
            <div class="mt-2">
              <input
                class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="text-base font-medium text-gray-900">
                {" "}
                Password{" "}
              </label>
            </div>
            <div class="mt-2">
              <input
                class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
          </div>
          {error && <p className='text-red-600 text-xs'>{error}</p>}
          <div>
            <button
              type="submit"
              class="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
            >
              Create Account{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="ml-2"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</section>

    </>
  )
}

export default Register