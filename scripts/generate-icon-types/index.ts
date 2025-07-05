#!/usr/bin/env node

import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';

import Mustache from 'mustache';

import { unique } from '@rodbe/fn-utils';

export const getFilesNamesFromPublicDir = (dir: string) => {
  return readdirSync(dir).filter((file) => file.endsWith('.svg'));
};

const iconFilesNames = unique(
  getFilesNamesFromPublicDir('./src/icons').map((fn) =>
    fn.replace('.svg', '').replace(/-(flat|lineal|lineal-color|sketchy)$/, '')
  )
);

const tplContent = Mustache.render(
  readFileSync('./scripts/generate-icon-types/types.template').toString(),
  {
    iconFilesNames,
  }
);

mkdirSync('./dist', { recursive: true });
writeFileSync('./dist/index.ts', tplContent);
