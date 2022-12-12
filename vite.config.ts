import {defineConfig} from "vite";
import {resolve} from "path";

export default defineConfig({
    build: {
        minify: "esbuild",
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "sigma-csv",
            fileName: (format) => `sigma-csv.${format}.js`,
            formats: ['es', 'cjs', 'iife', 'umd']
        },
        rollupOptions: {
            output: {
                extend: true,
                minifyInternalExports: true
            },
            external: (id: string) => {
                return id.includes("/test/");
            }
        },
    },
    esbuild: {
        sourcemap: true,
        minifyIdentifiers: true,
        minifySyntax: true,
        minifyWhitespace: true,
        target: "esnext"
    }
});