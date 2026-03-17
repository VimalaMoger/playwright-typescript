import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests/dataDriven/',
  timeout: 60000,
  expect: { timeout: 10000 },
  //grep:/@sanity/,
  //grep:/(?=./*@grouping)(?=.*@regression)/,
  //grepInvert:/@sanity/,
  fullyParallel: true,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  //retry locally
  //retries: 3,
  workers: 3,
  reporter: [
    ['allure-playwright', { outputFolder: 'allure-report' }],
    /*['html', { open: 'always', outputFolder: 'html-report' }],
    ["json", { outputFile: "test-results/report.json" }],
    ['list', { printSteps: true }],
    ['line'],
    ['dot'],
    ['junit', { outputFile: 'junit-results.xml' }],
    ['./my-custom-reporter.ts'],
    */
    ],
  use: {
    screenshot:'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on', // 'on-first-retry', retain-on-failure', // Options: 'off', 'on', 
  },

  /* Configure projects for Chrome browser */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      //fullyParallel: true,
    },
  ],
});
