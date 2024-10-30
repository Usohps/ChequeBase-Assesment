import axios from "axios";
const baseURL = "https://jsonplaceholder.typicode.com/todos";

const instance = axios.create({ baseURL });

//GET all Task
export const getAllTasks = async () => {
  try {
    const { data } = await instance({ method: "get" });
    return data;
  } catch (error) {
    throw new Error(`Error getting Todos  ${error}`);
  }
};

export const fetchTask = async (todoId) => {
  try {
    const { data } = await instance({ method: "get", url: `/${todoId}` });
    const slicedData = data.slice(0, 10);
    return slicedData;
  } catch (error) {
    throw new Error(`Error getting Todo ${todoId}: ${error}`);
  }
};

//Create new task below
export const createTask = async (newTask) => {
  try {
    const { data } = await instance({ method: "post", data: newTask });
    return data;
  } catch (error) {
    throw new Error(`Error creating Todo: ${error}`);
  }
};

//Edit task below
export const updateTask = async (todoId, updatedTask) => {
  try {
    const { data } = await instance({
      method: "patch",
      url: `/${todoId}`,
      data: updatedTask,
    });
    return data;
  } catch (error) {
    throw new Error(`Error updating Todo ${todoId}: ${error}`);
  }
};

//Delete Task below
export const deleteTask = async (todoId) => {
  try {
    const { data } = await instance({
      method: "DELETE",
      url: `/${todoId}`,
    });

    return data;
  } catch (error) {
    throw new Error(`Error deleting Todo ${todoId}: ${error}`);
  }
};
