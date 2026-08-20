// Hak akses per menu berdasarkan role pengguna
const ROLES = {
  admin: { nama: 'Admin', menus: ['psikotest', 'belajar', 'admin'], deskripsi: 'Akses semua menu + panel admin' },
  user: { nama: 'Peserta', menus: ['psikotest', 'belajar'], deskripsi: 'Akses psikotest dan akuntansi/pajak' },
  psikotest: { nama: 'Peserta Psikotest', menus: ['psikotest'], deskripsi: 'Hanya psikotest' },
  akuntansi: { nama: 'Peserta Akuntansi/Pajak', menus: ['belajar'], deskripsi: 'Hanya akuntansi & pajak' }
};

function can(user, menu) {
  if (!user) return false;
  const role = ROLES[user.role];
  if (!role) return false;
  if (menu === 'admin') return user.role === 'admin';
  return role.menus.includes(menu);
}

function requireLogin(req, res, next) {
  if (req.session.user) return next();
  const lanjut = encodeURIComponent(req.originalUrl);
  return res.redirect('/auth/login?lanjut=' + lanjut);
}

// Pembatasan akses per menu
function requireMenu(menu) {
  return (req, res, next) => {
    if (!req.session.user) {
      const lanjut = encodeURIComponent(req.originalUrl);
      return res.redirect('/auth/login?lanjut=' + lanjut);
    }
    if (can(req.session.user, menu)) return next();
    return res.status(403).render('error', {
      pesan: 'Akses ditolak. Akun Anda (role: ' + (ROLES[req.session.user.role] ? ROLES[req.session.user.role].nama : req.session.user.role) + ') tidak memiliki hak akses ke menu ini.'
    });
  };
}

function requireAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === 'admin') return next();
  return res.status(403).render('error', { pesan: 'Akses ditolak. Halaman ini khusus admin/master.' });
}

function locals(req, res, next) {
  res.locals.user = req.session.user || null;
  res.locals.path = req.path;
  res.locals.can = (menu) => can(req.session.user, menu);
  next();
}

module.exports = { ROLES, can, requireLogin, requireMenu, requireAdmin, locals };