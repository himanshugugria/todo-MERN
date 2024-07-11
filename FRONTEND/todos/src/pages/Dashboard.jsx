import React, { useState ,useEffect} from 'react'
import axiosInstance from '../utils/AxioInstance';
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom';

function Dashboard() {

    const [error,setError] = useState(null);
    const [todos,setTodos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const navigate = useNavigate();

    const fetchTodos = async () => {
        try {
          // const token = localStorage.getItem("token");
          // console.log("Token:", token);
            const response = await axiosInstance.get("/todos/getalltodo"); // Adjust endpoint as necessary
            console.log(response);

            if(response.data && response.data.data){
            setTodos(response.data.data);}

        } catch (error) {
            setError(error.response?.data?.message || "An error occurred while fetching notes");
        }
    };

    const openEditModal = (todo)=>{           // edit button click hone pe modal call ho jayega
      setModalContent({ title: todo.title, description: todo.description, id: todo._id });
      setIsModalOpen(true);
    }
    const openAddModal = ()=>{              
      setModalContent({ title: '', description: '', id: null });
      setIsModalOpen(true);
    }

    // handleSaveTodo  addTodo ya EditTodo ko call karega depending on the situation
    const handleAddTodo = async() => {
      const response= await axiosInstance.post("/todos/addtodo",
      {title:modalContent.title,
      description:modalContent.description,}
      )
      if(response.data && response.data.data){
        setTodos(response.data.data)
      }
      fetchTodos();
      setIsModalOpen(false);
    };
    const handleEditTodo = async(id) => {
      const response= await axiosInstance.put(`/todos/updatetodo/${id}`,
      {title:modalContent.title,
      description:modalContent.description,}
      )
      if(response.data && response.data.data){
        setTodos(response.data.data)
      }
      fetchTodos();
      setIsModalOpen(false);
    };
  
    const handleDeleteTodo = async (id) => {        // delete button se ye call hoga
      // Implement delete todo logic here
      // For example, use axiosInstance.delete
      await axiosInstance.delete(`/todos/deletetodo/${id}`);
      fetchTodos();
    };

    const handleSaveTodo = ()=>{    // save pe click hone pe ye call hoga
      if(modalContent.id){
        handleEditTodo(modalContent.id);
      }
      else{
        handleAddTodo();
      }
    }

    const logoutButton =async()=>{
      await axiosInstance.post("/users/logout")
      navigate("/login")
    }
    useEffect(() => {    // taaki page baar baar refresh na karna pade fetchtodo jab bhi call ho tab
      fetchTodos()
    }, []);



  return (
    <>

<div class="relative w-full bg-white">
  <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
    <div class="inline-flex items-center space-x-2">
      <span>
        <svg width="30" height="30" viewBox="0 0 50 56" fill="none"></svg>
      </span>
      <span class="font-bold text-blue-700">TODOS</span>
    </div>
    <div class="hidden lg:block">
      <ul class="inline-flex space-x-8">
      </ul>
    </div>
    <div class="hidden lg:block">
      <button
        onClick={logoutButton}
        class="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        Logout
      </button>
    </div>
  </div>
  <div class="lg:hidden px-4 pb-2 sm:px-6 lg:px-8">
    <button
      onClick={logoutButton}
      class="w-full mt-2 rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
    >
      Logout
    </button>
  </div>
</div>


<div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Your Todos</h1>
          <button 
            onClick={()=>{openAddModal()}}
            // onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Todo
          </button>
        </div>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <div className="space-y-4">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <div key={todo._id} className="p-4 bg-white border rounded-lg shadow-sm flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{todo.title}</h2>
                  <p className="text-gray-700">{todo.description}</p>
                </div>
                <div className='flex space-x-3'>
                <button 
                  onClick={() => openEditModal(todo)}
                  className="px-3 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteTodo(todo._id)}
                  className="px-3 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 focus:outline-none "
                >
                  Delete
                </button>
              </div>
              </div>
                
              
            ))
          ) : (
            <p className="text-gray-700">No todos available.</p>
          )}
        </div>
      </div>
    </div>


    <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4">{modalContent.id ? 'Edit Todo' : 'Add Todo'}</h2>
          <input
            type="text"
            value={modalContent.title}
            onChange={(e) => setModalContent({ ...modalContent, title: e.target.value })}
            placeholder="Title"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={modalContent.description}
            onChange={(e) => setModalContent({ ...modalContent, description: e.target.value })}
            placeholder="Description"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-md shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              // onClick={handleSaveTodo}
              onClick={() => handleSaveTodo()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

    </>
  )
}

export default Dashboard