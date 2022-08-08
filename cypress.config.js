import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:5173',
    specPattern: 'tests/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: false,
  },
})
