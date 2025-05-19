import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';

// SettingsPage component - allows users to configure app settings
const SettingsPage = () => {
  const { user, setUser } = useContext(UserContext);
  const [settings, setSettings] = useState({
    darkMode: user.settings?.darkMode ?? true,
    hoursPerWeek: user.settings?.hoursPerWeek ?? 15,
    focusArea: user.settings?.focusArea ?? 'both',
    notifications: user.settings?.notifications ?? true
  });
  const [saved, setSaved] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setSaved(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update user settings in context
    setUser(prev => ({
      ...prev,
      settings: settings
    }));
    
    // Show saved message
    setSaved(true);
    
    // Hide saved message after 3 seconds
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  // Handle data reset
  const handleReset = () => {
    if (window.confirm('Bist du sicher, dass du alle Daten zurücksetzen möchtest? Dies kann nicht rückgängig gemacht werden.')) {
      // Clear localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('tasks');
      localStorage.removeItem('reflections');
      
      // Reload page to reset app state
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Einstellungen</h2>
      
      {/* Settings form */}
      <div className="card">
        <h3 className="font-semibold text-lg mb-4">App-Einstellungen</h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="darkMode" className="font-medium">Dark Mode</label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Dunkles Farbschema für die App
                </p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  id="darkMode"
                  name="darkMode"
                  checked={settings.darkMode}
                  onChange={handleInputChange}
                  className="opacity-0 w-0 h-0"
                />
                <span 
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ${
                    settings.darkMode ? 'bg-primary-600' : 'bg-gray-300 dark:bg-dark-300'
                  }`}
                >
                  <span 
                    className={`absolute h-5 w-5 left-0.5 bottom-0.5 bg-white rounded-full transition-transform duration-200 ${
                      settings.darkMode ? 'transform translate-x-6' : ''
                    }`}
                  ></span>
                </span>
              </div>
            </div>
            
            <div>
              <label htmlFor="hoursPerWeek" className="block font-medium mb-1">
                Verfügbare Stunden pro Woche
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  id="hoursPerWeek"
                  name="hoursPerWeek"
                  min="5"
                  max="40"
                  step="5"
                  value={settings.hoursPerWeek}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-gray-200 dark:bg-dark-300 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-medium w-12 text-center">{settings.hoursPerWeek}h</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Passt die Menge der Aufgaben an deine verfügbare Zeit an
              </p>
            </div>
            
            <div>
              <label className="block font-medium mb-1">Fokusbereich</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="focusBoth"
                    name="focusArea"
                    value="both"
                    checked={settings.focusArea === 'both'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <label htmlFor="focusBoth" className="ml-2 text-sm">
                    Beides (Marketing & Kundenservice)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="focusMarketing"
                    name="focusArea"
                    value="marketing"
                    checked={settings.focusArea === 'marketing'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <label htmlFor="focusMarketing" className="ml-2 text-sm">
                    Marketing
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="focusCustomerService"
                    name="focusArea"
                    value="customerService"
                    checked={settings.focusArea === 'customerService'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <label htmlFor="focusCustomerService" className="ml-2 text-sm">
                    Kundenservice
                  </label>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Passt die Inhalte und Aufgaben an deinen gewünschten Fokusbereich an
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="notifications" className="font-medium">Benachrichtigungen</label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Erinnerungen für tägliche und wöchentliche Aufgaben
                </p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  id="notifications"
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleInputChange}
                  className="opacity-0 w-0 h-0"
                />
                <span 
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ${
                    settings.notifications ? 'bg-primary-600' : 'bg-gray-300 dark:bg-dark-300'
                  }`}
                >
                  <span 
                    className={`absolute h-5 w-5 left-0.5 bottom-0.5 bg-white rounded-full transition-transform duration-200 ${
                      settings.notifications ? 'transform translate-x-6' : ''
                    }`}
                  ></span>
                </span>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button type="submit" className="btn-primary">
                Einstellungen speichern
              </button>
            </div>
            
            {saved && (
              <div className="p-3 bg-accent-100 dark:bg-accent-900 text-accent-800 dark:text-accent-200 rounded-md text-center">
                Einstellungen erfolgreich gespeichert!
              </div>
            )}
          </div>
        </form>
      </div>
      
      {/* User profile */}
      <div className="card">
        <h3 className="font-semibold text-lg mb-4">Profil</h3>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center text-white text-2xl font-bold">
            P
          </div>
          <div>
            <h4 className="font-medium text-lg">Paul</h4>
            <p className="text-gray-600 dark:text-gray-400">Level {user.level} • {user.xp} XP</p>
          </div>
        </div>
      </div>
      
      {/* Data management */}
      <div className="card">
        <h3 className="font-semibold text-lg mb-4">Datenverwaltung</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Hier kannst du deine App-Daten verwalten. Sei vorsichtig beim Zurücksetzen, da dies alle deine Fortschritte löscht.
        </p>
        <div className="flex space-x-4">
          <button 
            className="btn-secondary"
            onClick={() => {
              const dataStr = JSON.stringify({
                user: user,
                tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
                reflections: JSON.parse(localStorage.getItem('reflections') || '[]')
              });
              const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
              
              const exportFileDefaultName = 'ki-roadmap-backup.json';
              
              const linkElement = document.createElement('a');
              linkElement.setAttribute('href', dataUri);
              linkElement.setAttribute('download', exportFileDefaultName);
              linkElement.click();
            }}
          >
            Daten exportieren
          </button>
          <button 
            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium"
            onClick={handleReset}
          >
            Alle Daten zurücksetzen
          </button>
        </div>
      </div>
      
      {/* About */}
      <div className="card">
        <h3 className="font-semibold text-lg mb-4">Über die App</h3>
        <p className="text-gray-600 dark:text-gray-400">
          KI-Roadmap App v0.1.0
        </p>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Eine gamifizierte Lernplattform für Pauls "Super-KI" Projekt. Entwickelt mit React und Tailwind CSS.
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
