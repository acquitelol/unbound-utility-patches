import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import esbuild from 'rollup-plugin-esbuild';
import commonjs from 'rollup-plugin-commonjs';
import { extname } from 'path';
import { defineConfig } from 'rollup';
import swc from '@swc/core';

const extensions = ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.cts', '.mts'];

export default defineConfig({
    input: 'src/index.tsx',

    output: [
        {
            file: 'dist/bundle.js',
            format: 'iife',
            inlineDynamicImports: true,
            strict: false,
        }
    ],

    plugins: [
        nodeResolve(),
        commonjs(),
        json(),
        {
            name: 'swc',
            async transform(code, id) {
                const ext = extname(id);
                if (!extensions.includes(ext)) return null;

                const ts = ext.includes('ts');
                const tsx = ts ? ext.endsWith('x') : undefined;
                const jsx = !ts ? ext.endsWith('x') : undefined;

                const result = await swc.transform(code, {
                    filename: id,
                    jsc: {
                        externalHelpers: true,
                        parser: {
                            syntax: ts ? 'typescript' : 'ecmascript',
                            tsx,
                            jsx,
                        },
                    },
                    env: {
                        targets: 'defaults',
                        include: [
                            'transform-classes',
                            'transform-arrow-functions',
                        ],
                    },
                });
                return result.code;
            },
        },
        esbuild({ minify: true })
    ],

    onwarn(warning, warn) {
        if (warning.code === 'MISSING_NAME_OPTION_FOR_IIFE_EXPORT') return;
        warn(warning);
    }
});