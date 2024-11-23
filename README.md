

# Fitness Tracker Web Application

## Introduction

The **Fitness Tracker Web Application** is a React-based project designed to help users track their fitness activities and progress. The application supports setting goals, logging data, and visualizing fitness metrics like workouts, steps, calorie intake, and more. It features a fully responsive design, light/dark theme switching, and integrates modern tools like Vite and Tailwind CSS.

---

## Features

### User Goals
- Set daily goals for:
  - Workouts
  - Calories Intake/Burned
  - Water Intake
  - Steps
  - Sleep Duration
- Goals are fetched from the server and displayed in interactive forms with edit, update, or delete options.

### Progress Visualization
- View progress through:
  - Bar Charts
  - Line Charts
  - Progress Cards

### Responsive Design
- Optimized for all devices using Tailwind CSS.

### Theming
- Switch between light and dark themes with the built-in `ThemeSwitcher`.

---

## Project Structure

### Main Components
- **Goals Module:** Handles goal creation, editing, and display.
- **Home Module:** Displays user progress and goal overviews in tabs.
- **Logs Module:** Allows users to log fitness activities such as calories, water, sleep, and workouts.
- **Layout Components:** Provides a consistent structure and styling across the app.
- **Shared Library:** Includes reusable utilities and context management.

For more details on individual components and their purposes, refer to the detailed documentation.

---

## Installation

### Prerequisites
- Node.js (v16 or above)
- npm or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Depi-Graduation-Project/Project-FrontEnd.git
   cd Project-FrontEnd
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Access the app at [http://localhost:3000](http://localhost:3000).

---

## Repository URL
The frontend source code is hosted at: [https://github.com/Depi-Graduation-Project/Project-FrontEnd](https://github.com/Depi-Graduation-Project/Project-FrontEnd).

---

## Building for Production
To create an optimized production build, run:
```bash
npm run build
```
The build will be available in the `dist` folder.

---

## Testing the Application
The app includes mock data for testing:
- `fakeData.jsx`
- `fakeLoggedData.jsx`
- `fakeLoggedWorkouts.jsx`

Modify these files to simulate user activities for testing.

---

## Configuration Files
- `vite.config.js`: Configuration for Vite's build and development setup.
- `eslint.config.js`: Coding standards enforced via ESLint.
- `tailwind.config.js`: Custom Tailwind CSS setup.
- `.prettierrc`: Code formatting rules using Prettier.

  
