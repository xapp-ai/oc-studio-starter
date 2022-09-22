/* eslint-disable @typescript-eslint/explicit-function-return-type */
/*! Copyright (c) 2022, Independence Blue Cross */
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
// import scss from "rollup-plugin-scss";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
// import sass from "sass";

const buildScss = () =>
  postcss({
    extract: false,
    modules: true,
    use: ["sass"],
  });

const plugins = () => [
  buildScss(),
  commonjs(),
  nodeResolve({ preferBuiltins: true, mainFields: ["browser"] }),
  typescript(),
  external(),
  terser(),
];

function iife(fileName) {
  return {
    file: fileName,
    format: "iife",
    exports: "named",
    sourcemap: true,
    name: "XAppChatIbxMiddleware",
    globals: {
      "@xapp/chat-widget": "XAppChatWidget",
      react: "XAppChatWidget.React",
    },
  };
}

const config = [
  {
    input: "src/index.tsx",
    output: [iife(`build/ibx-widget-middleware.js`)],
    plugins: plugins(),
  },
];

export default config;
