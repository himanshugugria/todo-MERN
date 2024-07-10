import React, { useState ,useEffect} from 'react'
import axiosInstance from '../utils/AxioInstance';

function Dashboard() {

    const [error,setError] = useState(null);
    const [todos,setTodos] = useState([]);

    const fetchTodos = async () => {
        try {
          const token = localStorage.getItem("token");
          console.log("Token:", token);
            const response = await axiosInstance.get("/todos/getalltodo"); // Adjust endpoint as necessary
            console.log(response);

            if(response.data && response.data.data){
            setTodos(response.data.data);}

        } catch (error) {
            setError(error.response?.data?.message || "An error occurred while fetching notes");
        }
    };
    useEffect(() => {
      fetchTodos()
    }, []);


  return (
    <>

    <div class="relative w-full bg-white">
  <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
    <div class="inline-flex items-center space-x-2">
      <span>
        <svg
          width="30"
          height="30"
          viewBox="0 0 50 56"
          fill="none"
        >
        </svg>
      </span>
      <span class="font-bold text-blue-700">TODOS</span>
    </div>
    <div class="hidden lg:block">
      <ul class="inline-flex space-x-8">
        <li>
          <a
            href="#"
            class="text-sm font-semibold text-gray-800 hover:text-gray-900"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#"
            class="text-sm font-semibold text-gray-800 hover:text-gray-900"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#"
            class="text-sm font-semibold text-gray-800 hover:text-gray-900"
          >
            Contact
          </a>
        </li>
      </ul>
    </div>
    <div class="hidden lg:block">
      <button
        type="submit"
        class="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        logout
      </button>
    </div>
    <div class="lg:hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-6 w-6 cursor-pointer"
      >
        <line x1="4" y1="12" x2="20" y2="12"></line>
        <line x1="4" y1="6" x2="20" y2="6"></line>
        <line x1="4" y1="18" x2="20" y2="18"></line>
      </svg>
    </div>
  </div>
</div>

<div className="dashboard">
                <h1 className="text-2xl font-bold mb-4">Your todos</h1>
                {error && <p className="text-red-600 text-xs">{error}</p>}
                <div className="notes-list">
                    {todos.length > 0 ? (
                        todos.map((todo) => (
                            <div key={todo._id} className="note p-4 border mb-2 rounded">
                                <h2 className="font-bold">{todo.title}</h2>
                                <p>{todo.description}</p>
                            </div>
                        ))
                    ) : (
                        <p>No todos available.</p>
                    )}
                </div>
            </div>

    </>
  )
}

export default Dashboard