
// hooks react js
import { useEffect, useState } from 'react';

// helper 
import { helpHttp } from '../helper/helpHttp';

// components
import ToList from '../components/ToList';
import Err from '../components/Err';
import Loader from '../components/Loader';
import ToForm from './../components/ToForm';

// estilso del componente Todo
import '../style/views/Todo.css'

const Todo = ({filterTask}) => {

    const [task, setTask] = useState([]); // guarda la lista de tarea para no perder ningun dato ()
    const [taskRende, setTaskRende] = useState(task) // aqui van estar la lista(las tareas) que se van a mostrar(rende)
    const [err, setErr] = useState(null); // aqui guarda si hay un error en las peticiones
    const [loading, setLoading] = useState(false) // hace loading hasta que la peticion acabe
    const [idTask, setIdTask] = useState(0) // aqui guarda el id mas alto para despues asignarselo a un nuevo task
    // const [currentPage, setCurrentPage] = useState(1); // sin uso por el momento
    const [postsPerPage] = useState(20); // la cantidad de cuantos task va tener una paginacion

    const url = 'https://jsonplaceholder.typicode.com/todos'

    // GET
    // obtenemos todos los task de la api
    useEffect(() => {
      
     const api = helpHttp()

     setLoading(true)
     api.get(url).then(response => {
       if(response.err){
         setTask([])
         setTaskRende([])
         setErr(response)
       }else{
         setTask(response)
         setTaskRende(response)
         setIdTask(response[response.length - 1].id)
         setErr(null)
       }
       setLoading(false)
     })
     
    },[url])

    // filtro de task
    useEffect(() => {

      if(filterTask != null) {
        const taskFilter = task.filter(task => task.completed === filterTask)
        setTaskRende(taskFilter)
      }else{
        setTaskRende(task)
      }

    },[filterTask,task])

    // POST
    // creacion de un nuevo task
    const createNewTask = (newTask) => {

      const api = helpHttp()

      newTask.id = idTask + 1
      newTask.userId = task[task.length - 1].userId + 1

      let options = {
        body: newTask,
        headers: {"content-type": "application/json"}
      }

      api.post(url,options).then(response => {
        if(response.err){
          setErr(response)
        }else{
          setTask([newTask, ...task])
          setIdTask(idTask + 1)
          setErr(null)
        }
      })

    }

    // PUT
    // actualizamos el estado del task
    const updateCompleted = (id, taskUpdate) => {
      taskUpdate.completed = !taskUpdate.completed
      console.log(taskUpdate)
      const api = helpHttp()
      const endpoint = `${url}/${id}`
      let options = {
          body: taskUpdate,
          headers: {"content-type": "application/json"}
      }
      api.put(endpoint,options).then(response => {
          if(response.err){
              setErr(response)
          }else{
            const updateData = task.map(task => task.id === id? taskUpdate: task)//remplaza los datos(actualiza) si el id exite en la bd
            setTask(updateData)
            setErr(null)
          }
      })
    }

    // DEL
    // Eliminamos un task
    const deletTask = idTask => {

      const api = helpHttp()
      const endpoint = `${url}/${idTask}`

      api.del(endpoint).then(response => {
        if(response.err){
          setErr(response)
        }else{
            const newTask = task.filter(task => task.id !== idTask) 
            setTask(newTask) 
        }
      })

    }

    // paginacion
    const indexOfLastPost = 1 * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentTask = taskRende.slice(indexOfFirstPost, indexOfLastPost);

    return (
      <div className='tw-box-border tw-w-9/12 tw-h-screen'>
      <ToForm createNewTask={createNewTask} />
       <div className='container-todo'>
          {loading && <Loader />}
          {task.length >= 0 && <ToList task={currentTask} updateCompleted={updateCompleted} deletTask={deletTask} />}
          {err && <Err messaga={err.messaga} code={err.err}/>}
       </div> 
      </div>
    )
}
export default Todo