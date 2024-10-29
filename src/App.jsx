import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './pages';
import NewTaskForm from './pages/addTask';
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' exact  element={<Home/>}/>
        <Route path='/addTask' element={<NewTaskForm/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
