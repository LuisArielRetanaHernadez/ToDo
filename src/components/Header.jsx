// estilso del componente Header
import '../style/Header.css'

const Header = ({filterByTasks}) => {

    return (
        <div className='container-header'>
            <nav className='nav-header'>
                <ul className='items-header'>
                    <div className='title-header'>
                        <h2>Hey, Hola</h2>
                    </div>
                    <li onClick={() => filterByTasks(true)}> completas <div className='line-hover'></div> </li>
                    <li onClick={() => filterByTasks(false)}> sin completar <div className='line-hover'></div> </li>
                    <li onClick={() => filterByTasks(null)}> Todo el listado <div className='line-hover'></div> </li>
                </ul>
            </nav>
        </div>
    )
}
export default Header