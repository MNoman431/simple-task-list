import React from 'react';

interface Task {
  id: number;
  description: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  toggleComplete: (id: number) => void;
  deleteTask: (id: number) => void;
  startEditTask: (id: number, currentText: string) => void;
  editingTaskId: number | null;
  editingText: string;
  setEditingText: React.Dispatch<React.SetStateAction<string>>;
  saveEditTask: () => void;
  cancelEdit: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  toggleComplete,
  deleteTask,
  startEditTask,
  editingTaskId,
  editingText,
  setEditingText,
  saveEditTask,
  cancelEdit,
}) => {
  const isEditing = editingTaskId === task.id;

  return (
    <li className="flex flex-col sm:flex-row justify-between items-center py-2 gap-2 sm:gap-4">
      {isEditing ? (
        <input
          type="text"
          value={editingText}
          onChange={e => setEditingText(e.target.value)}
          className="w-full sm:flex-grow border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      ) : (
        <span
          className={`w-full sm:flex-grow ${
            task.completed ? 'line-through text-gray-400' : 'text-gray-900'
          }`}
        >
          {task.description}
        </span>
      )}

      <div className="flex flex-wrap justify-center gap-2">
        {!isEditing && (
          <button
            onClick={() => toggleComplete(task.id)}
            className={`px-3 py-1 rounded transition ${
              task.completed
                ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
            title={task.completed ? 'Undo Complete' : 'Mark Complete'}
          >
            {task.completed ? 'Uncheck' : 'Check'}
          </button>
        )}

        {isEditing ? (
          <>
            <button
              onClick={saveEditTask}
              className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white transition"
              title="Save"
            >
              Save
            </button>
            <button
              onClick={cancelEdit}
              className="px-3 py-1 rounded bg-gray-400 hover:bg-gray-500 text-white transition"
              title="Cancel"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => startEditTask(task.id, task.description)}
            className="px-3 py-1 rounded bg-indigo-500 hover:bg-indigo-600 text-white transition"
            title="Edit"
          >
            Edit
          </button>
        )}

        {!isEditing && (
          <button
            onClick={() => deleteTask(task.id)}
            className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white transition"
            title="Delete"
          >
            Delete
          </button>
        )}
      </div>
    </li>
  );
};

export default TaskItem;
