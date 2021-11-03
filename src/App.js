import './App.css';

// hooks react
import { useState } from 'react';

// views
import Todo from './views/Todo'

// router-dom
import { BrowserRouter, Switch, Route} from 'react-router-dom';

// components<
import Header from './components/Header';

function App() {

  const [filterTask, setFilterTask] = useState(null)

  const filterByTasks = (filter) => {
    setFilterTask(filter)
  }
  
  return (
    <div className="tw-w-full tw-h-full tw-flex">
      
      <BrowserRouter>
      <Header filterByTasks={filterByTasks} />
        <Switch>
          <Route exact path='/'>
            <Todo filterTask={filterTask} />
          </Route>
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
