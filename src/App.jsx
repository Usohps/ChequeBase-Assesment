import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import NewTaskForm from "./pages/addTask";
import EditTaskForm from "./pages/editTask";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/addTask" element={<NewTaskForm />}></Route>
        <Route path="/editTask" element={<EditTaskForm />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
