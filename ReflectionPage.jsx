import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

// ReflectionPage component - allows users to reflect on their learning progress
const ReflectionPage = () => {
  const { user } = useContext(UserContext);
  const [reflectionData, setReflectionData] = useState({
    successes: '',
    challenges: '',
    nextSteps: ''
  });
  const [reflections, setReflections] = useState(() => {
    // Try to load reflections from localStorage
    const savedReflections = localStorage.getItem('reflections');
    return savedReflections ? JSON.parse(savedReflections) : [];
  });
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReflectionData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate AI feedback generation (would use OpenAI API in a real implementation)
    setTimeout(() => {
      // Generate mock AI feedback
      const mockFeedback = generateMockFeedback(reflectionData);
      setFeedback(mockFeedback);
      
      // Create new reflection entry
      const newReflection = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        ...reflectionData,
        aiFeedback: mockFeedback
      };
      
      // Add to reflections list
      const updatedReflections = [newReflection, ...reflections];
      setReflections(updatedReflections);
      
      // Save to localStorage
      localStorage.setItem('reflections', JSON.stringify(updatedReflections));
      
      // Reset form
      setReflectionData({
        successes: '',
        challenges: '',
        nextSteps: ''
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  // Mock function to generate AI feedback (would use OpenAI API in real implementation)
  const generateMockFeedback = (data) => {
    const successFeedback = data.successes.length > 0 
      ? "Großartig, dass du diese Erfolge erzielt hast! Besonders beeindruckend ist dein Fortschritt beim Verständnis der KI-Konzepte."
      : "Du hast keine Erfolge angegeben. Denke daran, auch kleine Fortschritte zu würdigen!";
    
    const challengeFeedback = data.challenges.length > 0
      ? "Bei den genannten Herausforderungen könnte es helfen, zusätzliche Ressourcen zu konsultieren oder in der Community nach Unterstützung zu fragen."
      : "Keine Herausforderungen zu haben ist ungewöhnlich. Reflektiere, ob du vielleicht einige übersehen hast.";
    
    const nextStepsFeedback = data.nextSteps.length > 0
      ? "Deine geplanten nächsten Schritte sind gut durchdacht. Achte darauf, sie in kleinere, machbare Aufgaben zu unterteilen."
      : "Überlege dir konkrete nächste Schritte, um deinen Lernfortschritt zu strukturieren.";
    
    return `${successFeedback}\n\n${challengeFeedback}\n\n${nextStepsFeedback}\n\nInsgesamt machst du gute Fortschritte auf deinem Weg zur "Super-KI". Bleib dran und setze dir weiterhin klare Ziele!`;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Wöchentliche Reflexion</h2>
      
      {/* Reflection form */}
      <div className="card">
        <h3 className="font-semibold text-lg mb-4">Neue Reflexion</h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="successes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Was lief diese Woche gut?
              </label>
              <textarea
                id="successes"
                name="successes"
                value={reflectionData.successes}
                onChange={handleInputChange}
                rows="3"
                className="input w-full"
                placeholder="Beschreibe deine Erfolge und Fortschritte..."
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="challenges" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Wo gab es Schwierigkeiten?
              </label>
              <textarea
                id="challenges"
                name="challenges"
                value={reflectionData.challenges}
                onChange={handleInputChange}
                rows="3"
                className="input w-full"
                placeholder="Beschreibe Herausforderungen und Hindernisse..."
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="nextSteps" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Geplante nächste Schritte
              </label>
              <textarea
                id="nextSteps"
                name="nextSteps"
                value={reflectionData.nextSteps}
                onChange={handleInputChange}
                rows="3"
                className="input w-full"
                placeholder="Was planst du für die kommende Woche?"
              ></textarea>
            </div>
            
            <div className="flex justify-end">
              <button 
                type="submit" 
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Wird verarbeitet...' : 'Reflexion einreichen'}
              </button>
            </div>
          </div>
        </form>
      </div>
      
      {/* AI Feedback */}
      {feedback && (
        <div className="card bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-primary-800 dark:text-primary-300">KI-Coach Feedback</h3>
              <div className="mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {feedback}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Previous reflections */}
      {reflections.length > 0 && (
        <div className="card">
          <h3 className="font-semibold text-lg mb-4">Frühere Reflexionen</h3>
          <div className="space-y-4">
            {reflections.map(reflection => (
              <div key={reflection.id} className="border-b border-gray-200 dark:border-dark-300 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Reflexion vom {new Date(reflection.date).toLocaleDateString('de-DE')}</h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(reflection.date).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                
                <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Erfolge</p>
                    <p className="text-sm mt-1">{reflection.successes}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Herausforderungen</p>
                    <p className="text-sm mt-1">{reflection.challenges}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Nächste Schritte</p>
                    <p className="text-sm mt-1">{reflection.nextSteps}</p>
                  </div>
                </div>
                
                <div className="mt-3 p-3 bg-gray-50 dark:bg-dark-300 rounded-md">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">KI-Coach Feedback</p>
                  <p className="text-sm mt-1 whitespace-pre-line">{reflection.aiFeedback}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReflectionPage;
