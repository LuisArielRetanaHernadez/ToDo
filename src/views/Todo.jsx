
// hooks react js
import { useEffect, useState } from 'react';

// helper 
import { helpHttp } from '../helper/helpHttp';

// components
import ToList from '../components/ToList';
import Err from '../components/Err';
import Loader from '../components/Loader';

import '../style/views/Todo.css'
import ToForm from './../components/ToForm';

const Todo = ({filterTask}) => {

    const [task, setTask] = useState([]);
    const [taskRende, setTaskRende] = useState(task)
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false)
    const [idTask, setIdTask] = useState(0)
    const url = 'https://jsonplaceholder.typicode.com/todos'

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

    useEffect(() => {

      if(filterTask != null) {
        const taskFilter = task.filter(task => task.completed === filterTask)
        setTaskRende(taskFilter)
      }else{
        setTaskRende(task)
      }

    },[filterTask,task])

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

    return (
      <div className='tw-box-border tw-w-9/12 tw-h-screen'>
      <ToForm createNewTask={createNewTask} />
       <div className='container-todo'>
          {loading && <Loader />}
          {task.length >= 0 && <ToList task={taskRende} updateCompleted={updateCompleted} deletTask={deletTask} />}
          {err && <Err messaga={err.messaga} code={err.err}/>}
       </div> 
      </div>
    )
}
export default Todo