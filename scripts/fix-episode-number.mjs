// scripts/fix-episode-number.mjs
import fs from 'node:fs';
import path from 'node:path';
import { createClient } from 'next-sanity';

const parseEnvLine = (line) => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return null;

  const equalsIndex = trimmed.indexOf('=');
  if (equalsIndex === -1) return null;

  const key = trimmed.slice(0, equalsIndex).trim();
  let value = trimmed.slice(equalsIndex + 1).trim();

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }

  return { key, value };
};

const loadEnvFile = (filePath) => {
  if (!fs.existsSync(filePath)) return;

  const fileContent = fs.readFileSync(filePath, 'utf8');
  for (const line of fileContent.split('\n')) {
    const parsed = parseEnvLine(line);
    if (!parsed) continue;

    const { key, value } = parsed;
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
};

const cwd = process.cwd();
loadEnvFile(path.join(cwd, '.env.local'));
loadEnvFile(path.join(cwd, '.env'));

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2022-11-15';

if (!projectId || !dataset || !token) {
  throw new Error(
    'Missing required env vars. Expected NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN',
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const docs = await client.fetch(
  `*[_type == "episode" && defined(episodeNumber)]{ _id, episodeNumber }`,
);

for (const doc of docs) {
  if (typeof doc.episodeNumber !== 'string') continue;
  const n = Number(doc.episodeNumber);
  if (!Number.isFinite(n)) continue;

  await client.patch(doc._id).set({ episodeNumber: n }).commit();
  console.log(`Updated ${doc._id}: "${doc.episodeNumber}" -> ${n}`);
}
