import { defineConfig } from "vite";
import { dreamlandPlugin } from "vite-plugin-dreamland";
import { ChemicalVitePlugin } from "chemicaljs";

export default defineConfig({
    plugins: [
        ChemicalVitePlugin({
            scramjet: false,
            rammerhead: false,
        }),
        dreamlandPlugin(),
    ],
});
