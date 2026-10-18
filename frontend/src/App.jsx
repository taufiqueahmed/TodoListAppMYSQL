import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'motion/react';


function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');


  // Use local backend URL for development
  const API_URL = import.meta.env.VITE_API_URL;




  useEffect(() => {
  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_URL);
      setTodos(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setTodos([]);
    }
  };

  fetchTodos();
}, [API_URL]);
  

  const addTodo = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    try {
      const res = await axios.post(API_URL, { task });
      setTodos([...todos, res.data]);
      setTask('');
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  


  const updateTodoStatus = async (id, currentCompleted, currentTask) => {
  try {
    await axios.put(`${API_URL}/${id}`, { task: currentTask, completed: !currentCompleted });
    setTodos(todos.map((t) =>
      t.id === id ? { ...t, completed: !currentCompleted } : t
    ));
  } catch (err) {
    console.error('Error updating todo:', err);
  }
};

  return (


    <>
   

  


    {/**Main Table */}

    <div className='min-h-screen bg-slate-100 flex items-center justify-center p-4'>   {/**Main Card Column based*/}

          <div className='bg-white p-6 rounded-xl shadow-xl/30 w-full max-w-md'> {/**Each elements of the card inside */}

            <h1 className='text-2xl font-bold text-slate-800 mb-4 text-center text-shadow-lg'>Todo List Table</h1> {/**Name of the Table */}

            <form onClick={addTodo} className='flex gap-2 mb-4'> {/**The form to submit new items */}
              <input
                type="text"
                value={task}
                onChange={(e) =>setTask(e.target.value)}
                placeholder="Add a new task..."
                className='flex-1 border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xl/30'
      
              />
             
              <motion.button
                  whileHover={{
                    scale: 1.15,
                    y: -4,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 10,
                  }}
                  className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-xl/30 text-shadow-lg'
                  type="submit"
                >Add
             </motion.button>

            </form>

            <ul className='space-y-2 '>{/**Print out all the items */}

              {
                todos.length === 0 ? (

                  <p className='text-center text-slate-400 py-4 shadow-xl/30'>No Tasks yet.Add one above!</p>

                ) : 
                (
                  todos.map(
                    (task) => (
                    <li key={task.id} className='flex justify-between items-center bg-slate-50 border border-slate-200 p-3 rounded-lg shadow-xl/30' >
                      <span className='text-slate-700 text-shadow-lg'> {task.task} </span>
                      <span className=' bg-mist-200 px-2 py-1 rounded-xl text-slate-700 text-shadow-lg shadow-xl/30'> {task.completed ?"Completed" :"Incomplete" } </span>
                      
                       <span className=' bg-mist-100 px-2 py-1 rounded-xl text-green-700 text-shadow-lg '>
                      
                       <motion.button
                          whileHover={{
                            scale: 1.15,
                            y: -4,
                          }}
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 10,
                          }}
                          onClick={()=> updateTodoStatus(task.id,task.completed,task.task) }
                          className='text-green-500 hover:text-green-700 font-semibold text-sm text-shadow-lg rounded '

                        >Update Status
                        </motion.button>
                       
                       
                       
                      </span>


                      <span className='text-slate-700'> 

                        
                        <motion.button
                          whileHover={{
                            scale: 1.15,
                            y: -4,
                          }}
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 10,
                          }}
                          onClick={ ()=> deleteTodo(task.id) }
                          className='text-red-500 hover:text-red-700 font-semibold text-sm text-shadow-lg rounded '
                        >Delete
                        </motion.button>

                      </span>
                   
                      
                    </li>)
                  )
                  
                )
              }

            </ul>

          </div>
          
    </div>

   
    </>


  );
}

export default App;