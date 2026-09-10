import { db } from './db';
import { MENUS } from './menus';

export { MENUS };

export const ROLE_DEFAULTS = {
  admin: { nama: 'Admin', menus: ['psikotest', 'belajar', 'latihan', 'admin'] },
  manager: { nama: 'Manager Perusahaan', menus: ['psikotest', 'belajar', 'latihan'] },
  user: { nama: 'Peserta', menus: ['psikotest', 'belajar', 'latihan'] },
  psikotest: { nama: 'Peserta Psikotest', menus: ['psikotest', 'latihan'] },
  akuntansi: { nama: 'Peserta Akuntansi/Pajak', menus: ['belajar', 'latihan'] }
};

export function can(user, menu) {
  if (!user) return false;
  const role = ROLE_DEFAULTS[user.role];
  if (!role) return false;
  if (menu === 'admin') return user.role === 'admin';
  return role.menus.includes(menu);
}

let _cache = null;

export function bustRoleCache() {
  _cache = null;
}

export async function getRoleMap() {
  if (_cache) return _cache;
  try {
    const sql = db();
    const rows = await sql`SELECT kode, nama, menus FROM roles`;
    const map = {};
    for (const r of rows) map[r.kode] = { nama: r.nama, menus: r.menus || [] };
    if (Object.keys(map).length > 0) {
      _cache = map;
      return map;
    }
  } catch {}
  _cache = Object.fromEntries(
    Object.entries(ROLE_DEFAULTS).map(([kode, r]) => [kode, { nama: r.nama, menus: r.menus }])
  );
  return _cache;
}

export async function canMenu(user, menu) {
  if (!user) return false;
  if (menu === 'manager') return user.role === 'manager' || user.role === 'admin';
  const map = await getRoleMap();
  const role = map[user.role];
  if (!role) return false;
  if (menu === 'admin') return (role.menus || []).includes('admin');
  return (role.menus || []).includes(menu);
}

export async function getAllRoles() {
  const sql = db();
  const rows = await sql`SELECT r.*, (SELECT COUNT(*)::int FROM users u WHERE u.role = r.kode) AS jml_user
    FROM roles r ORDER BY r.id`;
  return rows;
}
