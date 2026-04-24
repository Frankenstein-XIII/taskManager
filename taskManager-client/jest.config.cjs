module.exports ={
    preset:'ts-jest',
    testEnvironment:'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.app.json'  // ← point to the real config
    }]},
    moduleNameMapper:{
        '\\.(css|less|scss|sass)$':'identity-obj-proxy',
    },
};