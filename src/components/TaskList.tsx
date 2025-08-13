import React, { useState } from 'react';
import TaskItem from '../components/TaskItem';

interface Task {
    id: number;
    description: string;
    completed: boolean;
}

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>('');
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState<string>('');
    const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');

    const addTask = () => {
        if (!newTask.trim()) {
            alert("plz enter something");
            return;
        }
        const task: Task = {
            id: Date.now(),
            description: newTask,
            completed: false,
        };
        setTasks([...tasks, task]);
        setNewTask('');
    };

    const toggleComplete = (id: number) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id: number) => {
        let userConfirm = confirm("Are you sure to delete this task?");
        if (userConfirm) {
            setTasks(tasks.filter(task => task.id !== id));
        }
    };

    const startEditTask = (id: number, currentText: string) => {
        setEditingTaskId(id);
        setEditingText(currentText);
    };

    const saveEditTask = () => {
        if (!editingText.trim()) return;
        setTasks(tasks.map(task =>
            task.id === editingTaskId ? { ...task, description: editingText } : task
        ));
        alert("Task has been updated!");
        setEditingTaskId(null);
        setEditingText('');
    };

    const cancelEdit = () => {
        setEditingTaskId(null);
        setEditingText('');
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'incomplete') return !task.completed;
        return true;
    });

    return (
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mt-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center text-gray-800">Task List</h2>

            <div className="flex flex-col sm:flex-row mb-4 gap-2 sm:gap-0">
                <input
                    type="text"
                    value={newTask}
                    onChange={e => setNewTask(e.target.value)}
                    placeholder="Add new task"
                    className="flex-grow border border-gray-300 rounded sm:rounded-l px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={addTask}
                    className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded sm:rounded-r hover:bg-blue-700 transition"
                >
                    Add Task
                </button>
            </div>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                <button
                    className={`px-3 py-2 rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-500 transition`}
                    onClick={() => setFilter('all')}
                >
                    All
                </button>
                <button
                    className={`px-3 py-2 rounded ${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-500 transition`}
                    onClick={() => setFilter('completed')}
                >
                    Completed
                </button>
                <button
                    className={`px-3 py-2 rounded ${filter === 'incomplete' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-500 transition`}
                    onClick={() => setFilter('incomplete')}
                >
                    Incomplete
                </button>
            </div>

            <ul className="divide-y divide-gray-200">
                {filteredTasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        toggleComplete={toggleComplete}
                        deleteTask={deleteTask}
                        startEditTask={startEditTask}
                        editingTaskId={editingTaskId}
                        editingText={editingText}
                        setEditingText={setEditingText}
                        saveEditTask={saveEditTask}
                        cancelEdit={cancelEdit}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
