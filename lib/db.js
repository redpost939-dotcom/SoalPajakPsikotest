import { neon } from '@neondatabase/serverless';

let _sql = null;

export function db() {
  if (!_sql) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL belum diisi. Lihat .env.example');
    }
    _sql = neon(process.env.DATABASE_URL);
  }
  return _sql;
}
