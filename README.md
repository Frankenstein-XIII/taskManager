# 📂 Step 1: Folder Structure & Initialization
- bash: 
    - `mkdir taskManager && cd taskManager`
    - `mkdir taskManager-client taskManager-server`
    - `npm init`

# ⚙️ Step 2: Server Setup (TypeScript & Jest)
- bash:
    - `cd taskManager-server`
    - `npm init -y `
    - `npm install express mongoose`
    - `npm install -D typescript ts-node @types/node @types/express jest ts-jest @types/jest`
    - `npx tsc --init`
    - jest config:
        - `module.exports = { preset 'ts-jest', testEnvironment: 'node', };`
    
# 🛠️ Step 3: Git Initialization
- cd taskManager-client 
    - `git init`
    - 
# 🤖 Step 4: GitHub Actions (The Pipeline)
- inside root folder create `.github/workflows/ci.yml`
name: CI Pipeline
on: [push, pull_request]

jobs:
  server-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install Server Deps
        run: cd server && npm install
      - name: Run Server Tests
        run: cd server && npm test


# 🎨 Step 5: React Client Setup (Vite + TS)
1. initialize vite 
    - `npm create vite@latest taskManager-client -- --template react-ts`
    - `cd taskManager-client`
    - `npm install`
    - `npm install -D jest ts-jest @types/jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom`

    - taskManager-client and create jest.client.cjs
    module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};

 - create taskManager-client/src/setupTests.ts 
  - `import @testing-library/jest-dom`