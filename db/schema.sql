CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  nama VARCHAR(100) NOT NULL,
  role VARCHAR(10) NOT NULL DEFAULT 'user',
  dibuat TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  tipe VARCHAR(20) NOT NULL,
  kode VARCHAR(40) UNIQUE NOT NULL,
  nama VARCHAR(120) NOT NULL,
  deskripsi TEXT,
  urutan INT NOT NULL
);

CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  category_id INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  level VARCHAR(20) NOT NULL DEFAULT 'mudah',
  nomor_urutan INT NOT NULL DEFAULT 0,
  pertanyaan TEXT NOT NULL,
  diagram TEXT,
  opsi TEXT[] NOT NULL,
  kunci INT NOT NULL,
  pembahasan TEXT
);

CREATE TABLE IF NOT EXISTS materi (
  id SERIAL PRIMARY KEY,
  category_id INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  urutan INT NOT NULL DEFAULT 0,
  judul VARCHAR(200) NOT NULL,
  isi TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS hasil_test (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  tipe VARCHAR(20) NOT NULL,
  kategori VARCHAR(120) NOT NULL,
  level VARCHAR(20),
  total_soal INT NOT NULL,
  benar INT NOT NULL,
  skor NUMERIC(5,2) NOT NULL,
  detail JSONB,
  dibuat TIMESTAMP DEFAULT NOW()
);

ALTER TABLE hasil_test ADD COLUMN IF NOT EXISTS user_id INT REFERENCES users(id) ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  kode VARCHAR(30) UNIQUE NOT NULL,
  nama VARCHAR(100) NOT NULL,
  menus TEXT[] NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL,
  CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
);

CREATE INDEX IF NOT EXISTS "session_expire_index" ON "session" ("expire");