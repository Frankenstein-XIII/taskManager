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
    
# 🤖 Step 4: GitHub Actions (The Pipeline)
- inside root folder create `.github/workflows/ci.yml`
