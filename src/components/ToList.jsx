
import ToItems from './ToItems';
// Context 

import '../style/Todo/ToList.css'

const ToList = ({task, updateCompleted, deletTask}) => {
    return (
        <ul className='container-tolist'>
            {task.map(task => <ToItems key={task.id} id={task.id} task={task} updateCompleted={updateCompleted} deletTask={deletTask} />)}
        </ul>
    )
}
export default ToList