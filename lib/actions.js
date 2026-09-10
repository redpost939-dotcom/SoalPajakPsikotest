'use server';

import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from './db';
import { getSession, setSession, clearSession } from './auth';

function safeNext(v) {
  return v && String(v).startsWith('/') ? String(v) : '/';
}

export async function loginAction(prev, formData) {
  const username = String(formData.get('username') || '').trim();
  const password = String(formData.get('password') || '');
  const lanjut = safeNext(formData.get('lanjut'));
  if (!username || !password) return { pesan: 'Username dan password wajib diisi.' };
  const sql = db();
  const rows = await sql`SELECT * FROM users WHERE LOWER(username) = LOWER(${username})`;
  if (rows.length === 0 || !bcrypt.compareSync(password, rows[0].password)) {
    return { pesan: 'Username atau password salah.' };
  }
  const u = rows[0];
  await setSession({ id: u.id, username: u.username, nama: u.nama, role: u.role });
  redirect(lanjut);
}

export async function registerAction(prev, formData) {
  const username = String(formData.get('username') || '').trim();
  const nama = String(formData.get('nama') || '').trim();
  const password = String(formData.get('password') || '');
  const password2 = String(formData.get('password2') || '');
  if (!username || !nama || !password) return { pesan: 'Semua kolom wajib diisi.' };
  if (password.length < 6) return { pesan: 'Password minimal 6 karakter.' };
  if (password !== password2) return { pesan: 'Konfirmasi password tidak cocok.' };
  const sql = db();
  const cek = await sql`SELECT id FROM users WHERE LOWER(username) = LOWER(${username})`;
  if (cek.length > 0) return { pesan: 'Username sudah terpakai.' };
  const hash = bcrypt.hashSync(password, 10);
  const rows = await sql`INSERT INTO users (username, password, nama, role)
    VALUES (${username}, ${hash}, ${nama}, 'user')
    RETURNING id, username, nama, role`;
  const u = rows[0];
  await setSession({ id: u.id, username: u.username, nama: u.nama, role: u.role });
  redirect('/');
}

export async function logoutAction() {
  await clearSession();
  redirect('/');
}

async function needAdmin() {
  const user = await getSession();
  if (!user || user.role !== 'admin') throw new Error('Akses ditolak. Halaman ini khusus admin/master.');
  return user;
}

export async function simpanKategori(prev, formData) {
  await needAdmin();
  const id = String(formData.get('id') || '');
  const tipe = String(formData.get('tipe') || '').trim();
  const kode = String(formData.get('kode') || '').trim();
  const nama = String(formData.get('nama') || '').trim();
  const deskripsi = String(formData.get('deskripsi') || '') || null;
  const urutan = parseInt(formData.get('urutan') || '0', 10) || 0;
  if (!tipe || !kode || !nama) return { pesan: 'Tipe, kode, dan nama wajib diisi.' };
  const sql = db();
  if (id) {
    await sql`UPDATE categories SET tipe=${tipe}, kode=${kode}, nama=${nama}, deskripsi=${deskripsi}, urutan=${urutan} WHERE id=${Number(id)}`;
  } else {
    await sql`INSERT INTO categories (tipe, kode, nama, deskripsi, urutan) VALUES (${tipe}, ${kode}, ${nama}, ${deskripsi}, ${urutan})`;
  }
  revalidatePath('/admin/kategori');
  redirect('/admin/kategori');
}

export async function hapusKategori(formData) {
  await needAdmin();
  const sql = db();
  await sql`DELETE FROM categories WHERE id=${Number(formData.get('id'))}`;
  revalidatePath('/admin/kategori');
  redirect('/admin/kategori');
}

export async function simpanSoal(prev, formData) {
  await needAdmin();
  const id = String(formData.get('id') || '');
  const category_id = Number(formData.get('category_id'));
  const level = String(formData.get('level') || 'mudah');
  const nomor_urutan = parseInt(formData.get('nomor_urutan') || '0', 10) || 0;
  const pertanyaan = String(formData.get('pertanyaan') || '').trim();
  const diagram = String(formData.get('diagram') || '').trim() || null;
  const pembahasan = String(formData.get('pembahasan') || '').trim() || null;
  const kunci = parseInt(formData.get('kunci') || '1', 10);
  const opsi = [1, 2, 3, 4, 5]
    .map((i) => String(formData.get('opsi' + i) || '').trim())
    .filter((o) => o !== '');
  if (!category_id || !pertanyaan || opsi.length < 2) {
    return { pesan: 'Kategori, pertanyaan, dan minimal 2 opsi wajib diisi.' };
  }
  if (!(kunci >= 1 && kunci <= opsi.length)) {
    return { pesan: 'Nomor kunci jawaban tidak valid.' };
  }
  const sql = db();
  if (id) {
    await sql`UPDATE questions SET category_id=${category_id}, level=${level}, nomor_urutan=${nomor_urutan},
      pertanyaan=${pertanyaan}, diagram=${diagram}, opsi=${opsi}, kunci=${kunci}, pembahasan=${pembahasan}
      WHERE id=${Number(id)}`;
  } else {
    await sql`INSERT INTO questions (category_id, level, nomor_urutan, pertanyaan, diagram, opsi, kunci, pembahasan)
      VALUES (${category_id}, ${level}, ${nomor_urutan}, ${pertanyaan}, ${diagram}, ${opsi}, ${kunci}, ${pembahasan})`;
  }
  revalidatePath('/admin/soal');
  redirect('/admin/soal');
}

export async function hapusSoal(formData) {
  await needAdmin();
  const sql = db();
  await sql`DELETE FROM questions WHERE id=${Number(formData.get('id'))}`;
  revalidatePath('/admin/soal');
  redirect('/admin/soal');
}

export async function simpanMateri(prev, formData) {
  await needAdmin();
  const id = String(formData.get('id') || '');
  const category_id = Number(formData.get('category_id'));
  const urutan = parseInt(formData.get('urutan') || '0', 10) || 0;
  const judul = String(formData.get('judul') || '').trim();
  const isi = String(formData.get('isi') || '').trim();
  if (!category_id || !judul || !isi) {
    return { pesan: 'Kategori, judul, dan isi wajib diisi.' };
  }
  const sql = db();
  if (id) {
    await sql`UPDATE materi SET category_id=${category_id}, urutan=${urutan}, judul=${judul}, isi=${isi} WHERE id=${Number(id)}`;
  } else {
    await sql`INSERT INTO materi (category_id, urutan, judul, isi) VALUES (${category_id}, ${urutan}, ${judul}, ${isi})`;
  }
  revalidatePath('/admin/materi');
  redirect('/admin/materi');
}

export async function hapusMateri(formData) {
  await needAdmin();
  const sql = db();
  await sql`DELETE FROM materi WHERE id=${Number(formData.get('id'))}`;
  revalidatePath('/admin/materi');
  redirect('/admin/materi');
}

export async function ubahRole(formData) {
  await needAdmin();
  const allowed = ['admin', 'user', 'psikotest', 'akuntansi'];
  const role = allowed.includes(String(formData.get('role'))) ? String(formData.get('role')) : 'user';
  const sql = db();
  await sql`UPDATE users SET role=${role} WHERE id=${Number(formData.get('id'))}`;
  revalidatePath('/admin/user');
  redirect('/admin/user');
}

export async function resetPassword(formData) {
  await needAdmin();
  const pw = String(formData.get('password') || 'user123');
  const sql = db();
  await sql`UPDATE users SET password=${bcrypt.hashSync(pw, 10)} WHERE id=${Number(formData.get('id'))}`;
  revalidatePath('/admin/user');
  redirect('/admin/user');
}

export async function hapusUser(formData) {
  await needAdmin();
  const sql = db();
  await sql`DELETE FROM users WHERE id=${Number(formData.get('id'))}`;
  revalidatePath('/admin/user');
  redirect('/admin/user');
}
