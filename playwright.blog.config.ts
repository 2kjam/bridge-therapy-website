import { defineConfig, devices } from "@playwright/test";

// Isolated production server: never reuse the user's development server on port 3000.
export default defineConfig({
  testDir: "./tests",
  testMatch: ["blog.spec.ts", "blog-collection.spec.ts", "blog-technical.spec.ts"],
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  outputDir: "test-results/blog",
  use: {
    baseURL: "http://127.0.0.1:3018",
    channel: process.env.PLAYWRIGHT_EXECUTABLE_PATH ? undefined : "msedge",
    launchOptions: { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH },
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
  ],
  webServer: {
    command: "npm run start -- --hostname 127.0.0.1 --port 3018",
    url: "http://127.0.0.1:3018",
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
