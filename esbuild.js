
import tailwindcss from "@tailwindcss/postcss";
import * as esbuild from 'esbuild';
import svgr from 'esbuild-plugin-svgr';
import fs from 'node:fs'
import { join, dirname } from 'node:path';
import postcss from 'postcss';
import YAML from 'yaml';

let postcssPlugin = {
  name: "postcss",
  setup(build) {
    build.onLoad({ filter: /.*\.css$/}, async (args) => {      
      const css = await fs.promises.readFile(args.path, 'utf8');
      const result = await postcss([tailwindcss]).process(css, { from: args.path });                                        
      console.log('bundling css...');
        return {
          contents: result.css,
          loader: 'css'
        };
      }
    );
  },
}

let yamlPlugin = {
  name: 'yamlPlugin',
  setup(build) {    
    build.onLoad({ filter: /.*\.yml$|.*\.yaml$/ }, async (args) => {
      let text = await fs.promises.readFile(args.path, 'utf8')
      console.log('processing yaml...');
      return {
        contents: JSON.stringify(YAML.parse(text)),
        loader: 'json',
      }
    })
  },
};

let options = {
  entryPoints: [join('src', 'script.js'),join('src/css', 'style.css') ],
  bundle: true,
  outdir: 'dist',
  plugins: [
      svgr(),
      yamlPlugin,      
      postcssPlugin
  ],
  inject:[],
  jsx: 'automatic',
  loader: {
    '.js': 'jsx',
    '.svg': 'text',
    '.yaml': 'text',
    '.jpg': 'dataurl',
    '.ttf': 'dataurl'
  }
};

if (process.env.ENV == 'production'){
  await esbuild.build(options);
}else{
  options.inject.push('./esbuild-reload')
  let ctx = await esbuild.context(options)
  let { host, port } = await ctx.serve({
    servedir: 'dist',
  })
  await ctx.watch()
  console.log('watching...');
}
  