import {defineConfig} from "vite";
import {resolve} from "path";
import dtsPlugin from "vite-plugin-dts";

export default defineConfig({
    build: {
        minify: "esbuild",
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "index",
            fileName: "sigma-csv"
        },
        rollupOptions: {
            output: {
                extend: true,
                minifyInternalExports: true
            },
            external: (id: string) => {
                return id.includes("/test/");
            }
        }
    },
    esbuild: {
        sourcemap: true,
        minifyIdentifiers: true,
        minifySyntax: true,
        minifyWhitespace: true,
        target: "esnext"
    },
    plugins: [
        dtsPlugin()
    ]
});