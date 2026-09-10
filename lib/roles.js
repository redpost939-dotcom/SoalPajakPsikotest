export const ROLES = {
  admin: { nama: 'Admin', menus: ['psikotest', 'belajar', 'admin'] },
  user: { nama: 'Peserta', menus: ['psikotest', 'belajar'] },
  psikotest: { nama: 'Peserta Psikotest', menus: ['psikotest'] },
  akuntansi: { nama: 'Peserta Akuntansi/Pajak', menus: ['belajar'] }
};

export function can(user, menu) {
  if (!user) return false;
  const role = ROLES[user.role];
  if (!role) return false;
  if (menu === 'admin') return user.role === 'admin';
  return role.menus.includes(menu);
}
