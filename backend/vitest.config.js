import { defineConfig } from "vitest/config"

export default defineConfig({
    test:{
        globals: true,
        environment: "node" ,
        setupFiles: [
            "./tests/setup/Setup.js",
            "./tests/setup/testTransaction.js"
            //"./tests/setup/integrationSetup.js",
            //"./tests/dbCleanup.js"
        ],
        sequence:{
            concurrent:false
        }
    }
})