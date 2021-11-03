
// estilos del componente ToForm
import '../style/Todo/ToForm.css'
import { useState } from 'react';

const formInitin = {
    userId: null,
    id: null,
    title: '',
    completed: false
}

const ToForm = ({createNewTask}) => {

    const [form, setForm] = useState(formInitin) //guardamos los datos del form

    const heandlChangue = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const heandlSubmit = e =>{
        e.preventDefault();

        createNewTask(form)
        setForm(formInitin)
    }

    return(
        <div className='container-toform tw-h-2/5'>
            <form onSubmit={heandlSubmit} className='form-toform'>
                <div className='component-of-toform'>
                    <input type='text' name='title' value={form.title} onChange={heandlChangue} placeholder='nueva tarea' />
                    <button type='submit' className='btn-toform'>agregar</button> 
                </div>
            </form>
        </div>
    )

}
export default ToForm