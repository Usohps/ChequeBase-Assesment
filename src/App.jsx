import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import NewTaskForm from "./pages/addTask";
import EditTaskForm from "./pages/edit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/addTask" element={<NewTaskForm />}></Route>
        <Route path="/edit" element={<EditTaskForm />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
