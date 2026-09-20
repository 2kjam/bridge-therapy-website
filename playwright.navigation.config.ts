import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: ["navigation.spec.ts", "migration.spec.ts", "staff.spec.ts", "service-images.spec.ts", "resources-menu.spec.ts"],
  grep: /shared cleanup|navigation, keyboard|desktop hover|staff profile|service images|resources menu/,
  workers: 1,
  reporter: "list",
  outputDir: "test-results/navigation",
  use: {
    baseURL: "http://127.0.0.1:3019",
    channel: "msedge",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 1000 },
      },
    },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
  ],
  webServer: {
    command: "npm run start -- --hostname 127.0.0.1 --port 3019",
    url: "http://127.0.0.1:3019",
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
