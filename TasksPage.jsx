import React, { useContext, useState } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import { v4 as uuidv4 } from 'uuid';

// TasksPage component - displays and manages all tasks
const TasksPage = () => {
  const { tasks, completeTask, addTask } = useContext(TaskContext);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    type: 'daily',
    xpReward: 50,
    dueDate: new Date().toISOString().split('T')[0]
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new task with unique ID
    const task = {
      ...newTask,
      id: uuidv4(),
      completed: false
    };
    
    // Add task to context
    addTask(task);
    
    // Reset form
    setNewTask({
      title: '',
      description: '',
      type: 'daily',
      xpReward: 50,
      dueDate: new Date().toISOString().split('T')[0]
    });
    
    // Hide form
    setShowForm(false);
  };

  // Filter tasks by completion status
  const completedTasks = tasks.filter(task => task.completed);
  const incompleteTasks = tasks.filter(task => !task.completed);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Aufgaben</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Abbrechen' : 'Neue Aufgabe'}
        </button>
      </div>
      
      {/* New Task Form */}
      {showForm && (
        <div className="card">
          <h3 className="font-semibold text-lg mb-4">Neue Aufgabe erstellen</h3>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Titel
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newTask.title}
                  onChange={handleInputChange}
                  required
                  className="input w-full"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Beschreibung
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newTask.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="input w-full"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Typ
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={newTask.type}
                    onChange={handleInputChange}
                    className="input w-full"
                  >
                    <option value="daily">Täglich</option>
                    <option value="weekly">Wöchentlich</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="xpReward" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    XP Belohnung
                  </label>
                  <input
                    type="number"
                    id="xpReward"
                    name="xpReward"
                    value={newTask.xpReward}
                    onChange={handleInputChange}
                    min="10"
                    max="500"
                    className="input w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Fälligkeitsdatum
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={newTask.dueDate}
                    onChange={handleInputChange}
                    className="input w-full"
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <button type="submit" className="btn-primary">
                  Aufgabe erstellen
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      
      {/* Incomplete Tasks */}
      <div className="card">
        <h3 className="font-semibold text-lg mb-4">Offene Aufgaben</h3>
        
        {incompleteTasks.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">Keine offenen Aufgaben.</p>
        ) : (
          <ul className="space-y-4">
            {incompleteTasks.map(task => (
              <li key={task.id} className="border-b border-gray-200 dark:border-dark-300 pb-4 last:border-0 last:pb-0">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => completeTask(task.id)}
                    className="mt-1 h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{task.title}</h4>
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {task.xpReward} XP
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {task.description}
                    </p>
                    <div className="flex items-center mt-2 space-x-2">
                      <span className={`badge ${task.type === 'daily' ? 'badge-primary' : 'badge-success'}`}>
                        {task.type === 'daily' ? 'Täglich' : 'Wöchentlich'}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Fällig am: {new Date(task.dueDate).toLocaleDateString('de-DE')}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="card">
          <h3 className="font-semibold text-lg mb-4">Erledigte Aufgaben</h3>
          <ul className="space-y-4">
            {completedTasks.map(task => (
              <li key={task.id} className="border-b border-gray-200 dark:border-dark-300 pb-4 last:border-0 last:pb-0 opacity-70">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    readOnly
                    className="mt-1 h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium line-through">{task.title}</h4>
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {task.xpReward} XP
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-through">
                      {task.description}
                    </p>
                    <div className="flex items-center mt-2 space-x-2">
                      <span className="badge badge-primary opacity-50">
                        {task.type === 'daily' ? 'Täglich' : 'Wöchentlich'}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Erledigt
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
