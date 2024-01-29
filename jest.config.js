module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    "\\.md$": "jest-raw-loader"
  },
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
  },
}
