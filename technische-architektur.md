# Technische Architektur der Web-App

## Projektstruktur

```
ki-roadmap-app/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── assets/
│       └── images/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Layout.jsx
│   │   ├── dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── XPProgress.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── StreakCalendar.jsx
│   │   ├── tasks/
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskManager.jsx
│   │   ├── roadmap/
│   │   │   ├── RoadmapViewer.jsx
│   │   │   └── ModuleCard.jsx
│   │   ├── reflection/
│   │   │   ├── ReflectionForm.jsx
│   │   │   └── ReflectionHistory.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       ├── Badge.jsx
│   │       └── ProgressBar.jsx
│   ├── contexts/
│   │   ├── UserContext.jsx
│   │   └── TaskContext.jsx
│   ├── data/
│   │   ├── levels.js
│   │   ├── tasks.json
│   │   └── roadmap.json
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   └── useXPCalculator.js
│   ├── utils/
│   │   ├── dateUtils.js
│   │   └── xpUtils.js
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── TasksPage.jsx
│   │   ├── RoadmapPage.jsx
│   │   ├── ReflectionPage.jsx
│   │   └── SettingsPage.jsx
│   ├── App.jsx
│   ├── index.jsx
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
└── README.md
```

## Technologie-Stack

- **Frontend Framework:** React (Create React App)
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Routing:** React Router
- **Datenspeicherung:** localStorage
- **Deployment:** GitHub Pages (kostenlos)
- **Icons:** HeroIcons (kostenlos)
- **UI-Komponenten:** Eigene Komponenten mit Tailwind

## Datenmodelle

### User
```javascript
{
  level: 1,
  xp: 0,
  streak: 0,
  badges: [],
  settings: {
    darkMode: true,
    hoursPerWeek: 15
  }
}
```

### Task
```javascript
{
  id: "unique-id",
  title: "Aufgabentitel",
  description: "Ausführliche Beschreibung",
  type: "daily" | "weekly",
  xpReward: 50,
  completed: false,
  dueDate: "2025-05-26T00:00:00Z",
  tags: ["api", "python"]
}
```

### Roadmap Module
```javascript
{
  id: "week-1",
  title: "Überblick & Grundlagen der KI-Orchestrierung",
  description: "Einführung in die Welt der KI-Tools",
  duration: "1 Woche",
  theoryPercentage: 65,
  practicePercentage: 35,
  topics: ["KI-Agenten", "LLMs", "API-Grundlagen"],
  tools: ["ChatGPT", "YouTube", "Manus AI"],
  tasks: ["task-id-1", "task-id-2"]
}
```

### Reflection
```javascript
{
  id: "reflection-2025-05-26",
  date: "2025-05-26T00:00:00Z",
  successes: "Text über Erfolge",
  challenges: "Text über Herausforderungen",
  nextSteps: "Geplante nächste Schritte",
  aiFeedback: "Feedback vom KI-Coach"
}
```

## Hauptfunktionen und ihre Implementierung

### XP- und Level-System
- Level-Definitionen in `levels.js`
- XP-Berechnung in `useXPCalculator.js`
- Fortschrittsanzeige mit Tailwind-Klassen in `XPProgress.jsx`
- Speicherung im localStorage über `useLocalStorage.js`

### Aufgaben-System
- Vordefinierte Aufgaben in `tasks.json`
- Aufgabenverwaltung in `TaskContext.jsx`
- Anzeige und Interaktion in `TaskManager.jsx` und `TaskCard.jsx`
- Abschluss-Tracking und XP-Vergabe über Context-Funktionen

### Fortschrittsvisualisierung
- Dashboard-Übersicht in `Dashboard.jsx`
- XP-Balken in `XPProgress.jsx`
- Streak-Kalender in `StreakCalendar.jsx`
- Statistiken basierend auf gespeicherten Daten

### Rückblick-System
- Wöchentliches Formular in `ReflectionForm.jsx`
- Historische Einträge in `ReflectionHistory.jsx`
- Speicherung im localStorage

### Modular anpassbarer Lernplan
- Roadmap-Struktur in `roadmap.json`
- Anzeige in `RoadmapViewer.jsx`
- Konfigurierbarkeit über Einstellungen

## Dark Mode Implementierung
- Tailwind-Konfiguration mit `darkMode: 'class'`
- Dark-Theme als Standard
- CSS-Klassen für dunkle und helle Varianten

## Responsive Design
- Tailwind-Breakpoints für verschiedene Bildschirmgrößen
- Mobile-first Ansatz
- Anpassbare Sidebar und Layout-Komponenten
