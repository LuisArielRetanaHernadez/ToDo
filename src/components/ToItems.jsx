
import '../style/Todo/ToItems.css'

const ToItems = ({task, id, updateCompleted, deletTask}) => {
     
    return (
        <div className={`container-toitems ${!task.completed ? 'full' : 'unfilled' } `}>
            <li className='title-task' onClick={()=> updateCompleted(id, task)}>{task.title}</li>
            <li className='btn-completed'>
                <button onClick={() => deletTask(id)}>Eliminar</button>
            </li>
        </div>
    )
}
export default ToItems