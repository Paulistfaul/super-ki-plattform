# Web-App Anforderungen und Spezifikation

## Übersicht
Die gamifizierte Lernplattform soll Paul dabei unterstützen, seinen Lernfortschritt bei der Entwicklung einer "Super-KI" zu verfolgen und zu motivieren. Die Anwendung wird mit React (Frontend) und Tailwind CSS für das Styling erstellt.

## Design-Vorgaben
- **UI-Stil:** Sauber, minimalistisch im Stil von Notion
- **Farbschema:** Dark Mode als Standard (helle Schrift auf dunklem Hintergrund)
- **Referenz:** Theme "Vanta" (dunkles Education-Platform-Template auf Tailwind)
- **Typographie:** Klare, gut lesbare Schriftarten
- **Layout:** Viel White/Dark-Space, aufgeräumte Struktur
- **Icons:** Konsistente Iconografie (z.B. HeroIcons)
- **Responsive Design:** Optimiert für Desktop und mobile Geräte

## Kernfunktionen

### 1. Dynamisches XP- und Level-System
- **Level-Struktur:** 6 Level (1 für Grundlagen bis 6 für Mastery)
- **XP-Vergabe:** Punkte für erledigte Aufgaben nach definiertem Punktemodell
- **Progression:** Festgelegte XP-Grenzen pro Level
- **Gamification:** Badges/Achievements für Meilensteine
- **Technische Umsetzung:**
  - XP-Stand in lokalem Speicher (Browser-Storage)
  - React-State für XP und Level
  - Fortschrittsanzeige mit Tailwind-Klassen

### 2. Automatisch generierte SMART-Aufgaben
- **Tägliche Challenges:** Kleine Aufgaben (~30 Min)
- **Wöchentliche Ziele:** Größere Projekte (2-3 Std)
- **Aufgabenstruktur:** Nach SMART-Prinzip (Specific, Measurable, Achievable, Relevant, Time-bound)
- **Generierungsmethode:** Regelbasiert oder KI-unterstützt
- **Technische Umsetzung:**
  - JSON/YAML-Struktur für vordefinierte Aufgaben
  - Optional: Integration mit OpenAI API für dynamische Aufgabengenerierung
  - Zu Beginn: Manuell kuratierte Aufgaben

### 3. Fortschrittsvisualisierung
- **Dashboard-Elemente:**
  - Gesamt-XP und aktuelles Level
  - Erledigte vs. offene Quests
  - Statistiken und "Streak" für regelmäßiges Lernen
- **Visualisierungskomponenten:**
  - Checklisten für tägliche To-dos
  - XP-Balken mit visueller Füllung
  - Kalender-Log für tägliche Aktivitäten
- **Technische Umsetzung:**
  - React-Komponenten für verschiedene Visualisierungen
  - Tailwind für responsive Layouts
  - Lokale Datenspeicherung für Fortschrittsverfolgung

### 4. Rückblick- und Feedback-System
- **Wöchentliche Reflexion:** Fragen zur Selbsteinschätzung
- **Lerntagebuch:** Notizen zu Erfolgen und Schwierigkeiten
- **KI-Coach:** Optional GPT-Integration für Feedback
- **Technische Umsetzung:**
  - Formular für Reflexionseingaben
  - Lokale Speicherung der Einträge
  - Optional: OpenAI API für Feedback-Generierung

### 5. Modular anpassbarer Lernplan
- **Flexibilität:** Anpassung bei Änderung von Fokus oder Zeitbudget
- **Modularität:** Lerninhalte in JSON/YAML oder Markdown
- **Konfigurierbarkeit:** Zeitplanung und Aufgabenmenge anpassbar
- **Technische Umsetzung:**
  - Externe Dateien für Lerninhalte
  - Admin-Bereich für Anpassungen
  - Konfigurierbares Task-Generation-System

## Technische Architektur

### Frontend
- **Framework:** React (Create React App oder Vite)
- **Styling:** Tailwind CSS
- **State Management:** React Context oder einfacher Zustandsspeicher
- **Routing:** React Router für Mehrseiten-Navigation
- **UI-Komponenten:** Tailwind-Komponenten (evtl. DaisyUI)
- **Icons:** HeroIcons oder ähnliche Icon-Bibliothek

### Datenspeicherung
- **Primär:** Lokaler Browser-Speicher (localStorage)
- **Optional:** Firebase oder ähnliches BaaS für persistente Daten
- **Datenstruktur:**
  - User-Profil (Level, XP, Streak)
  - Aufgaben (täglich, wöchentlich)
  - Lernfortschritt (erledigte Aufgaben)
  - Reflexionseinträge

### Optionale Backend-Integration
- **Authentifizierung:** Optional für Mehrbenutzer-Unterstützung
- **Datenbank:** Für persistente Speicherung über Geräte hinweg
- **API:** Für KI-Integration (Aufgabengenerierung, Feedback)

## Dateien und Komponenten

### Hauptkomponenten
- **Dashboard:** Übersicht mit XP, Level, Aufgaben
- **Aufgaben-Manager:** Anzeige und Verwaltung von Aufgaben
- **Lernpfad-Viewer:** Anzeige der Roadmap und Fortschritt
- **Reflexions-Tool:** Eingabe und Anzeige von Reflexionen
- **Einstellungen:** Konfiguration der App

### Datenmodelle
- **User:** XP, Level, Streak, Einstellungen
- **Task:** ID, Titel, Beschreibung, XP-Wert, Status, Deadline
- **Roadmap:** Wochen/Module, Lernziele, Ressourcen
- **Reflection:** Datum, Erfolge, Schwierigkeiten, Feedback

### Konfigurationsdateien
- **levels.js:** Definition der Level und XP-Grenzen
- **tasks.json:** Vordefinierte Aufgaben und Challenges
- **roadmap.json:** Struktur der Lernroadmap
- **tailwind.config.js:** Styling-Konfiguration inkl. Dark Mode

## Budgetbetrachtung
- **Kostenlose Tools:**
  - React, Tailwind CSS (Open Source)
  - GitHub Pages für Hosting
  - LocalStorage für Datenspeicherung
- **Optionale kostenpflichtige Dienste:**
  - OpenAI API (mit Free Tier)
  - Firebase (mit großzügigem Free Tier)
  - Vercel für Hosting (Free Tier verfügbar)

## Erweiterbarkeit
- **Neue Lernmodule:** Einfaches Hinzufügen durch JSON/Markdown-Dateien
- **Anpassung des Zeitplans:** Konfigurierbare Aufgabenmenge
- **Integration neuer KI-Agenten:** Modulare Struktur für API-Wechsel
- **Design/Theming:** Anpassbare Tailwind-Konfiguration
