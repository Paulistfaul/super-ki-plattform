import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

// Import roadmap data
import roadmapData from '../data/roadmap.json';

const RoadmapPage = () => {
  const { user } = useContext(UserContext);
  const [activeModule, setActiveModule] = useState(null);
  
  // Calculate which modules should be unlocked based on user level
  const getModuleStatus = (moduleIndex) => {
    if (moduleIndex < user.level) {
      return 'completed';
    } else if (moduleIndex === user.level - 1) {
      return 'current';
    } else {
      return 'locked';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">KI-Roadmap</h2>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium">Phase 1:</span> 10-Wochen-Intensivphase
        </div>
      </div>
      
      {/* Roadmap timeline */}
      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-dark-300"></div>
        
        <div className="space-y-8">
          {roadmapData.modules.map((module, index) => (
            <div key={module.id} className="relative">
              {/* Timeline dot */}
              <div 
                className={`absolute left-5 w-10 h-10 rounded-full flex items-center justify-center -translate-x-1/2 z-10 ${
                  getModuleStatus(index) === 'completed' 
                    ? 'bg-accent-500 text-white' 
                    : getModuleStatus(index) === 'current'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 dark:bg-dark-300 text-gray-500 dark:text-gray-400'
                }`}
              >
                {getModuleStatus(index) === 'completed' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              
              {/* Module card */}
              <div 
                className={`ml-12 card cursor-pointer transition-all duration-200 ${
                  activeModule === index ? 'ring-2 ring-primary-500' : ''
                } ${
                  getModuleStatus(index) === 'locked' ? 'opacity-50' : ''
                }`}
                onClick={() => setActiveModule(activeModule === index ? null : index)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{module.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{module.description}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium">{module.duration}</span>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="text-xs">
                        <span className="text-blue-500">{module.theoryPercentage}% Theorie</span>
                        {' / '}
                        <span className="text-green-500">{module.practicePercentage}% Praxis</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Status badge */}
                <div className="mt-2">
                  {getModuleStatus(index) === 'completed' && (
                    <span className="badge badge-success">Abgeschlossen</span>
                  )}
                  {getModuleStatus(index) === 'current' && (
                    <span className="badge badge-primary">Aktuell</span>
                  )}
                  {getModuleStatus(index) === 'locked' && (
                    <span className="badge bg-gray-200 dark:bg-dark-300 text-gray-700 dark:text-gray-300">Gesperrt</span>
                  )}
                </div>
                
                {/* Expanded content */}
                {activeModule === index && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">Themen</h4>
                        <ul className="space-y-1">
                          {module.topics.map((topic, i) => (
                            <li key={i} className="flex items-center space-x-2">
                              <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">Tools</h4>
                        <ul className="space-y-1">
                          {module.tools.map((tool, i) => (
                            <li key={i} className="flex items-center space-x-2">
                              <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                              </svg>
                              <span>{tool}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">Aufgaben</h4>
                      <ul className="space-y-3">
                        {module.tasks.map((task) => (
                          <li key={task.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-dark-300 rounded-md">
                            <div className="mt-0.5">
                              <span className={`inline-block w-3 h-3 rounded-full ${
                                task.type === 'daily' ? 'bg-primary-500' : 'bg-accent-500'
                              }`}></span>
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h5 className="font-medium">{task.title}</h5>
                                <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                                  {task.xpReward} XP
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {task.description}
                              </p>
                              <div className="mt-2">
                                <span className={`badge ${task.type === 'daily' ? 'badge-primary' : 'badge-success'}`}>
                                  {task.type === 'daily' ? 'Täglich' : 'Wöchentlich'}
                                </span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Phase 2 preview */}
      <div className="card mt-8">
        <h3 className="font-semibold text-lg mb-2">Phase 2: Mastery-Phase (6-12 Monate)</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Nach Abschluss der Intensivphase folgt die flexible Mastery-Phase, in der du deine Kenntnisse vertiefst und in realen Projekten anwendest.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-3 bg-gray-50 dark:bg-dark-300 rounded-md">
            <h4 className="font-medium">Fortgeschrittene KI-Orchestrierung</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Komplexere Agenten-Architekturen und Multi-Agent-Systeme
            </p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-dark-300 rounded-md">
            <h4 className="font-medium">Spezialisierung Marketing</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Content-Strategie, SEO-Optimierung und Social Media Automatisierung
            </p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-dark-300 rounded-md">
            <h4 className="font-medium">Spezialisierung Kundenservice</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Fortgeschrittene Chatbots mit Persönlichkeit und CRM-Integration
            </p>
          </div>
        </div>
        <button className="btn-secondary w-full mt-4" disabled>
          Wird freigeschaltet nach Abschluss von Phase 1
        </button>
      </div>
    </div>
  );
};

export default RoadmapPage;
