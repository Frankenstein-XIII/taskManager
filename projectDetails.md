🏗️ Phase 1: Infrastructure & Automation
1. What is it?
Setting up the dual-repo structure (Client/Server), configuring TypeScript, and establishing the "Rules of the Game" via Jest and GitHub Actions.
2. Why is it?
To ensure that from the very first function you write, you have a "safety net" (CI/CD) that automatically checks for bugs and type errors.
3. How to implement:
Monorepo-style setup: Create /client and /server folders.
Environment: Initialize npm, typescript, and jest in both.
CI Pipeline: Create a .github/workflows/ci.yml that runs npm install, tsc (build), and npm test on every push.
💾 Phase 2: The Core API & Persistence (Backend CRUD)
1. What is it?
Building the Node/Express server and connecting it to MongoDB to handle the raw data operations.
2. Why is it?
To create a stable "Source of Truth" for your tasks. You will learn how to handle asynchronous data flow.
3. How to implement:
Model: Define the Task schema in Mongoose.
Routes: Create the 5 core endpoints (Create, Read, Update, Delete, Toggle).
Unit Test: Use Jest to test that each endpoint returns the correct status codes and data.
Action: Push to GitHub; verify the CI runs your backend tests.
💻 Phase 3: The Interactive UI (Frontend CRUD)
1. What is it?
Developing the React application to consume the API you built in Phase 2.
2. Why is it?
To master state management. You’ll learn how to keep the "Local UI State" in sync with the "Database State."
3. How to implement:
Services: Create an API layer using axios to talk to your server.
Components: Build the TaskForm and TaskList.
Unit Test: Use React Testing Library to mock API calls and ensure components render correctly.
Action: Push to GitHub; verify CI runs both frontend and backend tests.
🔍 Phase 4: Logic Scaling (Filtering & UX)
1. What is it?
Adding the "Pending/Completed" filters and refining the user experience (loading states, error handling).
2. Why is it?
To practice "Derived State." Instead of making more API calls, you’ll learn to filter existing data in memory for better performance.
3. How to implement:
Filter Logic: Implement a filter state (All/Done/Todo) to toggle the view.
Refinement: Add "Empty States" (e.g., "No tasks found!").
Unit Test: Test the filtering function logic specifically with Jest.
Action: Final push; ensure the entire pipeline remains green.



# beakdown 
## Phase 1. 
📂 1. Workspace Architecture
You need a clean "Monorepo" style structure so the frontend and backend can live together but stay independent.
Root Folder: Contains .gitignore and your GitHub Action workflows.
/server: Node.js + Express + TypeScript + Jest.
/client: React + Vite + TypeScript + Jest.
🛡️ 2. TypeScript "Strict Mode" Setup
This is the most important step for Level 2 developers.
Initialize tsconfig.json in both folders.
Goal: Ensure the server and client share the same "Shape" of a Task (Interfaces). If you change a field name in the backend, the frontend should immediately show a red error.
🧪 3. The Testing Harness (Jest & Environment)
Setting up Jest for TypeScript (ts-jest) is notoriously tricky, so doing it now saves headaches later.
Install testing dependencies.
Write a "Sanity Test" (a simple 1 + 1 = 2 test) to prove the test runner works.
Configure the package.json scripts (e.g., "test": "jest").
🤖 4. The CI (Continuous Integration) Pipeline
This is your "Automated Gatekeeper" using GitHub Actions.
Create .github/workflows/ci.yml.
The Workflow:
Trigger on every push.
Spin up a virtual Linux machine.
Install dependencies.
Run Build: Catch syntax or type errors.
Run Tests: Catch logic errors.


## Phase 2