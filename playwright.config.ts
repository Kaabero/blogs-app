
import { defineConfig } from "@playwright/test"

import dotenv from "dotenv"

dotenv.config({ path: ".env.test" })

export default defineConfig({
  testDir: "./tests",

  use: {
    baseURL: "http://localhost:3000",
  },

  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
})
