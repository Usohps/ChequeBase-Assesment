import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask, getAllTasks } from "../api/api";
import { useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
const Home = () => {
    const [isChecked, setIsChecked] = useState(false);
    const queryClient = useQueryClient();
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getAllTasks,
  });
  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["todo"]); // Refetch tasks after deletion
    },
  });

  const handleDelete = (taskId) => {
    deleteTaskMutation.mutate(taskId);
  };
  const mockTimes = ["10:00am", "12:00pm", "03:00pm", "08:00pm"];
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // const tasks = [
  //   {
  //     id: 1,
  //     text: "Walk the dog",
  //     time: "10:00am",
  //     completed: false,
  //     date: "Today",
  //   },
  //   {
  //     id: 2,
  //     text: "Buy groceries",
  //     time: "12:00pm",
  //     completed: true,
  //     date: "Today",
  //   },
  //   {
  //     id: 3,
  //     text: "Submit health forms",
  //     time: "03:00pm",
  //     completed: false,
  //     date: "Today",
  //   },
  //   {
  //     id: 4,
  //     text: "Study for exams",
  //     time: "08:00pm",
  //     completed: false,
  //     date: "Today",
  //   },
  //   {
  //     id: 5,
  //     text: "Take dog to the vet",
  //     time: "08:00am",
  //     completed: false,
  //     date: "Tomorrow",
  //   },
  //   {
  //     id: 6,
  //     text: "Study for exams",
  //     time: "08:00pm",
  //     completed: false,
  //     date: "Tomorrow",
  //   },
  // ];
  
  return (
    <div className="bg-white min-h-screen p-4 flex flex-col items-center">
      {/* Greeting Section */}
      <div className="bg-blue-500 text-white w-full  rounded-lg p-4 shadow-lg">
        <h1 className="text-lg font-bold">
          Good Morning, Chequebase!
          <span role="img" aria-label="wave">
            👋
          </span>
        </h1>
        <p className="text-sm text-yellow-200 mt-2">
          You have 2 uncompleted tasks
        </p>
        <button className="mt-3 bg-yellow-400 text-blue-900 font-semibold py-2 px-4 rounded-full shadow hover:bg-yellow-300">
          View calendar
        </button>
      </div>

      {/* Task List Section */}
      <div className="container">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="hidden"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
        </label>
        <h3 className="bg-blue-800 text-white p-2 rounded-md mb-2">
          Today 5th August
        </h3>
        <ul className="space-y-2">
          {todos.slice(0, 4).map((todo, index) => (
            <li
              key={todo.id}
              className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-sm"
            >
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                  className=" text-blue-600"
                />
                <span>{todo.title}</span>
              </label>
              <div>
                <button onClick={() => handleDelete(todo.id)} disabled={deleteTaskMutation.isLoading}>
                  <AiTwotoneDelete size={24} />
                </button>
                <span className="text-sm text-gray-500">
                  {mockTimes[index % mockTimes.length]}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <button className="md:w-[350px] m-auto w-full bg-yellow-400 text-blue-900 font-semibold py-2 my-4 rounded-full shadow hover:bg-yellow-300">
          <a href="/addTask"> + Add Task</a>
        </button>
      </div>
      {/* <div className="bg-white w-full max-w-md rounded-lg mt-6 p-4 shadow-lg">
        {["Today", "Tomorrow"].map((day, index) => (
          <div key={index} className="mt-4">
            <div className="bg-blue-500 text-white px-3 py-1 rounded-t-md font-semibold">
              {day === "Today" ? "Today 5th August" : "Tomorrow 6th August"}
            </div>
            <table className="w-full mt-2 text-left">
              <thead>
                <tr>
                  <th className="text-sm font-medium text-gray-500">Task</th>
                  <th className="text-sm font-medium text-gray-500">Time</th>
                </tr>
              </thead>
              <tbody>
                {tasks
                  .filter((task) => task.date === day)
                  .map((task) => (
                    <tr key={task.id} className="border-b">
                      <td className="py-2 flex items-center">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          className="mr-2 rounded border-yellow-400 text-yellow-500 focus:ring-yellow-500"
                        />
                        <span
                          className={`${
                            task.completed ? "line-through text-gray-400" : ""
                          }`}
                        >
                          {task.text}
                        </span>
                      </td>
                      <td className="text-sm text-gray-500">{task.time}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
        <button className="w-full bg-yellow-400 text-blue-900 font-semibold py-2 mt-4 rounded-full shadow hover:bg-yellow-300">
          <a href="/addTask"> + Add Task</a>
        </button>
      </div> */}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 bg-yellow-400 w-full rounded-t-lg py-2 flex justify-around items-center text-blue-900 shadow-lg">
        <button>
          <a href="/" className="flex flex-col items-center">
            <span className="text-xl">🏠</span>
            <span className="text-xs font-semibold">Home</span>
          </a>
        </button>
        <button className="flex flex-col items-center">
          <span className="text-xl">📅</span>
          <span className="text-xs font-semibold">Calendar</span>
        </button>
        <button>
          <a href="/addTask" className="flex flex-col items-center">
            <span className="text-xl">➕</span>
            <span className="text-xs font-semibold">Add</span>
          </a>
        </button>
      </div>
    </div>
  );
};

export default Home;
