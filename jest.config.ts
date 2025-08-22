module.exports = {
    testEnvironment: "node",
    roots: ["<rootDir>/src", "<rootDir>/tests"],
    testMatch: ["**/*.spec.ts"],
    moduleFileExtensions: ["ts", "js", "json"],
    transform: {
        "^.+\\.(t|j)sx?$": ["@swc/jest"]
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "^@tests/(.*)$": "<rootDir>/tests/$1"
    },
    clearMocks: true
}
