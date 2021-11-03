
import '../style/Todo/ToItems.css'

const ToItems = ({task, id, updateCompleted, deletTask}) => {
     
    return (
        <div className={`container-toitems ${task.completed ? 'full' : 'unfilled' } `}>
            <li className='title-task' onClick={()=> updateCompleted(id, task)}>{task.title}</li>
            <li className='container-btn-delet-task'>
                <button className='btn-delet-task' onClick={() => deletTask(id)}>Eliminar</button>
            </li>
        </div>
    )
}
export default ToItems