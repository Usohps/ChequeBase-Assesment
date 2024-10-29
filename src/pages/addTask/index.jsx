import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../api/api";
import { useState } from "react";

const NewTaskForm = () => {
    const [title, setTitle] = useState("");
  const queryClient = useQueryClient()
    const createTaskMutation = useMutation({
        mutationFn: createTask,
        onSuccess: () => {
          queryClient.invalidateQueries(["tasks"]);
        },
      });
    
      const handleSubmit = (e) => {
        e.preventDefault();
        createTaskMutation.mutate({ title });
        setTitle("");
      };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-center gap-16 text-center  mb-6">
          <button  className="text-xl font-bold text-gray-600 mr-2"> <a href="/">←</a></button>
          <h2 className="text-xl font-bold text-gray-800">New Task</h2>
        </div>

        {/* Form  */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Task title</label>
            <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Task title"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Task description</label>
            <input
            required
              type="text"
              placeholder="Task description"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
              required
                type="text"
                placeholder="dd/mm/yyyy"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <input
              required
                type="text"
                placeholder="00:00"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
            required
              placeholder="Notes"
              rows="4"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
            >
              ✓
            </button>
          </div>
          {createTaskMutation.error && <p>Error: {createTaskMutation.error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default NewTaskForm;
