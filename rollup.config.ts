import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import { swc, minify } from "rollup-plugin-swc3";

import { defineConfig } from 'rollup';

export default defineConfig({
    input: 'src/index.tsx',

    output: [
        {
            file: "dist/bundle.js",
            format: 'iife',
            inlineDynamicImports: true,
            strict: false
        }
    ],

    plugins: [
        nodeResolve(),
        json(),
        swc(),
		minify({ compress: false, mangle: false })
    ],

    onwarn(warning, warn) {
        if (warning.code === "MISSING_NAME_OPTION_FOR_IIFE_EXPORT") return;
        warn(warning);
    }
});