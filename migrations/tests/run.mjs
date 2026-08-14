// Migration / query runner. Dev-time only -- the app itself has no build step
// and no runtime dependencies. `pg` is NOT vendored into the repo; install it
// somewhere outside the repo and run this from there, or `npm i pg` in a
// throwaway directory:
//
//   node run.mjs --sql "select 1"
//   node run.mjs --file ../0001_create_decks.sql
//   node run.mjs --file ../0001_create_decks.sql --pooled   (default: UNPOOLED)
//
// Defaults to DATABASE_URL_UNPOOLED because the pooled endpoint runs PgBouncer
// in transaction mode and cannot handle the session state the migration needs.
// Reads the repo .env. Never prints the connection string.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import pg from 'pg';

// repo root is two levels up from migrations/tests/
const ENV_PATH = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', '.env');

function loadEnv(path) {
  const out = {};
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/i);
    if (!m) continue;
    out[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
  }
  return out;
}

const args = process.argv.slice(2);
const get = (flag) => { const i = args.indexOf(flag); return i === -1 ? null : args[i + 1]; };

const env = loadEnv(ENV_PATH);
const pooled = args.includes('--pooled');
const url = pooled ? env.DATABASE_URL : env.DATABASE_URL_UNPOOLED;
if (!url) { console.error('missing connection string in .env'); process.exit(1); }

const sql = get('--sql') ?? readFileSync(get('--file'), 'utf8');

const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
await client.connect();
console.error(`# connected via ${pooled ? 'POOLED' : 'UNPOOLED'} endpoint`);

try {
  const res = await client.query(sql);
  for (const r of Array.isArray(res) ? res : [res]) {
    if (r.command === 'SELECT' || r.rows?.length) console.log(JSON.stringify(r.rows, null, 2));
    else console.log(`${r.command} ${r.rowCount ?? ''}`.trim());
  }
} catch (e) {
  console.error('SQL ERROR:', e.message);
  if (e.position) console.error('  at position', e.position);
  process.exitCode = 1;
} finally {
  await client.end();
}
