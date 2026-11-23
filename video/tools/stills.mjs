import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'path';
const args = process.argv.slice(2); const browser = args[0] === '-' ? undefined : args[0]; const secs = args.slice(1);
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const comp = await selectComposition({serveUrl, id: 'StoryVideo', ...(browser ? {browserExecutable: browser} : {})});
for (const s of secs) {
  const frame = Math.round(Number(s) * 30);
  await renderStill({serveUrl, composition: comp, frame, output: `out/st_${String(s).padStart(6,'0')}.png`, ...(browser ? {browserExecutable: browser} : {}), scale: 0.5});
  process.stdout.write(s + ' ');
}
