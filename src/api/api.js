//GET all Task 
export const getAllTasks = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return response.json();
  };
  
  export const fetchTask = async (taskId) => {
    const response = await fetch(`/api/tasks/${taskId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch task");
    }
    return response.json();
  };
  //Create new task below
  export const createTask = async (newTask) => {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    if (!response.ok) {
      throw new Error("Failed to create task");
    }
    return response.json();
  };
  //Edit task below
  export const updateTask = async (taskId, updatedTask) => {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    if (!response.ok) {
      throw new Error("Failed to update task");
    }
    return response.json();
  };
  //Delete Task below
  export const deleteTask = async (taskId) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${taskId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
    return response.json();
  };
  