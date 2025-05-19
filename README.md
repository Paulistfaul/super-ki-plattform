# KI-Roadmap App

Eine gamifizierte Lernplattform für Pauls "Super-KI" Projekt, die seinen Fortschritt bei der Entwicklung eines automatisierten Systems aus spezialisierten KI-Tools spielerisch unterstützt.

![KI-Roadmap App Screenshot](public/assets/images/app-screenshot.png)

## Projektübersicht

Die KI-Roadmap App ist eine React-basierte Webanwendung, die Paul dabei unterstützt, systematisch von den Grundlagen bis zur professionellen Umsetzung mit KI-Agenten zu gelangen. Die App bietet:

- **Gamifiziertes Lernsystem** mit XP, Leveln und Badges
- **Strukturierte Lern-Roadmap** mit 10-Wochen-Intensivphase und Mastery-Phase
- **Aufgabenmanagement** für tägliche und wöchentliche Herausforderungen
- **Fortschrittsvisualisierung** mit Dashboard und Streak-Kalender
- **Reflexions-Tool** für wöchentliche Selbstreflexion mit KI-Feedback
- **Anpassbare Einstellungen** für Fokusbereich und Zeitbudget

Die App ist im Notion-ähnlichen Design mit Dark Mode gestaltet und nutzt lokale Speicherung für alle Daten.

## Technologie-Stack

- **Frontend:** React (Create React App)
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Routing:** React Router
- **Datenspeicherung:** localStorage
- **Icons:** HeroIcons

## Installation und Einrichtung

### Voraussetzungen

- Node.js (v14 oder höher)
- npm (v6 oder höher)

### Lokale Installation

1. Klone das Repository:
   ```bash
   git clone https://github.com/dein-username/ki-roadmap-app.git
   cd ki-roadmap-app
   ```

2. Installiere die Abhängigkeiten:
   ```bash
   npm install
   ```

3. Starte die Entwicklungsumgebung:
   ```bash
   npm start
   ```

4. Öffne [http://localhost:3000](http://localhost:3000) in deinem Browser.

### Build für Produktion

Um eine optimierte Version für die Produktion zu erstellen:

```bash
npm run build
```

Die Build-Dateien werden im `build/`-Ordner erstellt und können auf jedem statischen Webserver gehostet werden.

## GitHub-Upload Anleitung

### Erstmalige Einrichtung

1. **GitHub-Konto erstellen** (falls noch nicht vorhanden):
   - Gehe zu [GitHub](https://github.com/) und registriere dich
   - Bestätige deine E-Mail-Adresse

2. **Repository erstellen**:
   - Klicke auf das "+" Symbol in der oberen rechten Ecke und wähle "New repository"
   - Gib einen Namen ein (z.B. "ki-roadmap-app")
   - Wähle "Public" oder "Private" je nach Präferenz
   - Klicke auf "Create repository"

3. **Git lokal einrichten** (falls noch nicht geschehen):
   - Lade [Git](https://git-scm.com/downloads) herunter und installiere es
   - Öffne die Kommandozeile und konfiguriere Git:
     ```bash
     git config --global user.name "Dein Name"
     git config --global user.email "deine-email@beispiel.com"
     ```

### Projekt hochladen

1. **Initialisiere Git im Projektordner**:
   ```bash
   cd /pfad/zu/ki-roadmap-app
   git init
   ```

2. **Füge alle Dateien hinzu**:
   ```bash
   git add .
   ```

3. **Erstelle einen ersten Commit**:
   ```bash
   git commit -m "Erster Commit: KI-Roadmap App"
   ```

4. **Verbinde mit dem GitHub-Repository**:
   ```bash
   git remote add origin https://github.com/dein-username/ki-roadmap-app.git
   ```

5. **Lade den Code hoch**:
   ```bash
   git push -u origin master
   ```
   (oder `git push -u origin main` je nach Standard-Branch-Namen)

### Änderungen hochladen

Wenn du später Änderungen vornimmst:

1. **Änderungen hinzufügen**:
   ```bash
   git add .
   ```

2. **Commit erstellen**:
   ```bash
   git commit -m "Beschreibung der Änderungen"
   ```

3. **Änderungen hochladen**:
   ```bash
   git push
   ```

### GitHub Pages Deployment

Um die App kostenlos über GitHub Pages zu hosten:

1. **gh-pages Paket installieren**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **package.json anpassen**:
   - Füge folgende Zeile am Anfang hinzu:
     ```json
     "homepage": "https://dein-username.github.io/ki-roadmap-app",
     ```
   - Stelle sicher, dass die "scripts" diese Einträge enthalten:
     ```json
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
     ```

3. **Deployment ausführen**:
   ```bash
   npm run deploy
   ```

4. **GitHub Pages aktivieren**:
   - Gehe zu den Repository-Einstellungen auf GitHub
   - Scrolle zu "GitHub Pages"
   - Wähle als Source "gh-pages branch"
   - Speichere die Einstellungen

Nach einigen Minuten wird deine App unter `https://dein-username.github.io/ki-roadmap-app` verfügbar sein.

## Anpassung und Erweiterung

### Lernplan anpassen

Die Roadmap-Inhalte sind in der Datei `src/data/roadmap.json` definiert. Du kannst:

- **Module hinzufügen oder ändern**: Füge neue Wochen/Module hinzu oder ändere bestehende
- **Aufgaben anpassen**: Bearbeite die Tasks innerhalb jedes Moduls
- **Fokus ändern**: Passe die Inhalte an, wenn du von Kundenservice auf Marketing umstellen möchtest

Beispiel für ein Modul:
```json
{
  "id": "week-1",
  "title": "Überblick & Grundlagen der KI-Orchestrierung",
  "description": "Einführung in die Welt der KI-Tools",
  "duration": "1 Woche",
  "theoryPercentage": 65,
  "practicePercentage": 35,
  "topics": ["KI-Agenten", "LLMs", "API-Grundlagen"],
  "tools": ["ChatGPT", "YouTube", "Manus AI"],
  "tasks": [...]
}
```

### Zeitplan ändern

Wenn sich dein verfügbares Zeitbudget ändert:

1. Passe die Einstellung "Verfügbare Stunden pro Woche" in der App an
2. Reduziere oder erhöhe die Anzahl der Aufgaben in `roadmap.json`
3. Passe die XP-Werte an, um die Balance zu halten

### Neue KI-Agenten integrieren

Wenn neue KI-Tools oder Agenten erscheinen:

1. Füge sie als neue Tools in den entsprechenden Modulen in `roadmap.json` hinzu
2. Erstelle neue Aufgaben, die diese Tools nutzen
3. Aktualisiere die Beschreibungen und Lernziele

### Design anpassen

Das Design kann über Tailwind CSS angepasst werden:

- **Farbschema**: Ändere die Farben in `tailwind.config.js`
- **Dark/Light Mode**: Passe die Einstellungen in den Komponenten an
- **Layout**: Modifiziere die Komponenten in `src/components/layout/`

## Projektstruktur

```
ki-roadmap-app/
├── public/                  # Statische Dateien
├── src/
│   ├── components/          # React-Komponenten
│   │   ├── dashboard/       # Dashboard-Komponenten
│   │   ├── layout/          # Layout-Komponenten
│   │   ├── reflection/      # Reflexions-Komponenten
│   │   ├── roadmap/         # Roadmap-Komponenten
│   │   ├── tasks/           # Aufgaben-Komponenten
│   │   └── ui/              # UI-Komponenten
│   ├── contexts/            # React Context Provider
│   ├── data/                # Statische Daten (JSON)
│   ├── hooks/               # Custom React Hooks
│   ├── pages/               # Hauptseiten
│   └── utils/               # Hilfsfunktionen
├── package.json             # Projekt-Konfiguration
├── tailwind.config.js       # Tailwind CSS Konfiguration
└── README.md                # Projektdokumentation
```

## Kostenübersicht

Die App nutzt ausschließlich kostenlose Technologien und Dienste:

- **React & Tailwind**: Open Source, kostenlos
- **GitHub**: Kostenlose Repositories und GitHub Pages
- **Lokale Speicherung**: Keine Datenbankkosten

Optionale Erweiterungen (nicht implementiert):
- **OpenAI API**: Für KI-Feedback (Free Tier verfügbar, dann kostenpflichtig)
- **Firebase**: Für Benutzerverwaltung und Cloud-Speicherung (großzügiger Free Tier)

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz veröffentlicht. Siehe [LICENSE](LICENSE) für Details.

---

Erstellt für Paul's "Super-KI" Projekt. Viel Erfolg auf deiner Lernreise! 🚀
