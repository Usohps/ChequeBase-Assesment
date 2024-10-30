import { deleteTask } from "../api/api";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, markAsCompleted } from "../redux/reducers/todo.reducer";
import { MdModeEdit } from "react-icons/md";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector(({ todos }) => todos);
  const [isChecked, setIsChecked] = useState(false);
  const queryClient = useQueryClient();

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["todo"]);
    },
  });

  const handleDelete = (taskId) => {
    deleteTaskMutation.mutate(taskId);
    dispatch(deleteTodo({ todoId: taskId }));
    toast.success("Todo deleted successfully");
  };

  return (
    <div className="bg-white min-h-screen  flex flex-col items-center">
      {/* Greeting Section */}
      <div className="bg-blue-500 text-white w-full md:rounded-none  rounded-b-xl p-4 shadow-lg">
        <h1 className="text-lg font-bold">
          Good Morning, Chequebase!
          <span role="img" aria-label="wave">
            👋
          </span>
        </h1>
        <p className="text-sm text-yellow-200 mt-2">
          You have 2 uncompleted tasks
        </p>
        <button className="mt-3 w-full md:max-w-[300px] bg-yellow-400 text-blue-900 font-semibold py-2 px-4 rounded-full shadow hover:bg-yellow-300">
          View calendar
        </button>
      </div>

      {/* Task List Section */}
      <div className="container md:max-w-xl">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="hidden"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
        </label>

        {todos <= 0 ? (
          <div className="min-h-[200px] text-lg md:text-xl text-center flex flex-col justify-center items-center">
            <p>
              Sorry there are no task at the moment, Please use the add button
              below to create a new task
            </p>
          </div>
        ) : (
          <>
            <h3 className="bg-blue-800 text-white m-2 md:m-0 p-2 rounded-md mb-2">
              Today 5th August
            </h3>
            <ul className="space-y-2">
              {todos?.map((todo) => (
                <li
                  key={todo.id}
                  className="flex justify-between items-center p-4 md:bg-gray-100 rounded-md md:shadow-sm"
                >
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() =>
                        dispatch(markAsCompleted({ todoId: todo.id }))
                      }
                      className=" text-blue-600"
                    />
                    <span>{todo.title}</span>
                  </label>
                  <div className="flex items-center gap-6 justify-center">
                    <a href={`/edit?id=${todo.id}`}>
                      <MdModeEdit size={24} />
                    </a>
                    <div className="flex flex-col items-center justify-center gap-3">
                      <button
                        onClick={() => handleDelete(todo.id)}
                        disabled={deleteTaskMutation.isLoading}
                      >
                        <AiTwotoneDelete size={24} className="text-red-600" />
                      </button>
                      <span className="text-sm text-gray-500">{todo.time}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="pb-16 p-2">
          <a href="/addTask">
            <button className="md:hidden flex  items-center justify-center gap-3 py-2  m-auto w-full border border-yellow-400 text-blue-900 font-semibold  my-4 rounded-full shadow-sm hover:bg-yellow-300">
              <IoMdAdd size={36} />
              Add Task
            </button>
          </a>
        </div>
      </div>

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
