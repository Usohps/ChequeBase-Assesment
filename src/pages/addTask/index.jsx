import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../api/api";
import { MdKeyboardBackspace } from "react-icons/md";
import { MdCheck } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux/reducers/todo.reducer";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const NewTaskForm = () => {
  const router = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { register, handleSubmit, getValues } = useForm();

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      const values = getValues();
      dispatch(addTodo({ ...data, ...values, completed: false, userId: 1 }));
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  const onSubmit = (data) => {
    createTaskMutation.mutate({
      title: data.title,
      body: data.description,
    });
    toast.success("Todo created successfully");
    router("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-md">
        <button className="text-xl font-bold text-gray-600 mr-2 shadow-sm border rounded-sm">
          {" "}
          <a href="/">
            <MdKeyboardBackspace />
          </a>
        </button>
        <div className="flex items-center justify-center gap-16 text-center  mb-6">
          <h2 className="text-xl font-bold text-gray-800">New Task</h2>
        </div>

        {/* Form  */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Task title
            </label>
            <input
              {...register("title", { required: true, maxLength: 80 })}
              type="text"
              placeholder="Task title"
              className="outline-none mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Task description
            </label>
            <input
              {...register("description", { required: true, maxLength: 80 })}
              type="text"
              placeholder="Task description"
              className="outline-none mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                {...register("date", { required: true })}
                type="date"
                placeholder="dd/mm/yyyy"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                {...register("time", { required: true })}
                type="time"
                placeholder="00:00"
                className="outline-none mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              {...register("notes", { required: true })}
              placeholder="Notes"
              rows="4"
              className="outline-none mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={createTaskMutation.isLoading}
              className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
            >
              {createTaskMutation.isLoading ? (
                <div className="loader"></div>
              ) : (
                <MdCheck size={24} />
              )}
            </button>
          </div>
          {/* {createTaskMutation.error && (
            <p>Error: {createTaskMutation.error.message}</p>
          )} */}
        </form>
      </div>
    </div>
  );
};

export default NewTaskForm;
