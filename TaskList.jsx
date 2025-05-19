import React, { useContext } from 'react';
import { TaskContext } from '../../contexts/TaskContext';

// TaskList component displays a list of tasks on the dashboard
const TaskList = () => {
  const { tasks, completeTask } = useContext(TaskContext);
  
  // Filter tasks to show only incomplete ones
  const incompleteTasks = tasks.filter(task => !task.completed);
  
  // Sort tasks by due date
  const sortedTasks = [...incompleteTasks].sort((a, b) => 
    new Date(a.dueDate) - new Date(b.dueDate)
  );
  
  // Take only the first 5 tasks to display
  const tasksToShow = sortedTasks.slice(0, 5);
  
  return (
    <div className="card">
      <h3 className="font-semibold text-lg mb-4">Anstehende Aufgaben</h3>
      
      {tasksToShow.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">Keine anstehenden Aufgaben.</p>
      ) : (
        <ul className="space-y-3">
          {tasksToShow.map(task => (
            <li key={task.id} className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => completeTask(task.id)}
                className="mt-1 h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
              />
              <div>
                <h4 className="font-medium">{task.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {task.description.length > 100 
                    ? task.description.substring(0, 100) + '...' 
                    : task.description}
                </p>
                <div className="flex items-center mt-1 space-x-2">
                  <span className={`badge ${task.type === 'daily' ? 'badge-primary' : 'badge-success'}`}>
                    {task.type === 'daily' ? 'Täglich' : 'Wöchentlich'}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(task.dueDate).toLocaleDateString('de-DE')}
                  </span>
                  <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                    {task.xpReward} XP
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      {incompleteTasks.length > 5 && (
        <div className="mt-4 text-center">
          <button 
            className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
            onClick={() => window.location.href = '/tasks'}
          >
            Alle {incompleteTasks.length} Aufgaben anzeigen
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
