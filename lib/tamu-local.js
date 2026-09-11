const KUNCI = 'bs_tamu';

export function simpanTamuLocal(nama, umur, alamat) {
  try {
    localStorage.setItem(KUNCI, JSON.stringify({ nama, umur: umur || null, alamat: alamat || null }));
  } catch {}
}

export function bacaTamuLocal() {
  try {
    const d = JSON.parse(localStorage.getItem(KUNCI) || 'null');
    if (d && typeof d.nama === 'string' && d.nama.trim()) return d;
  } catch {}
  return null;
}

export function hapusTamuLocal() {
  try {
    localStorage.removeItem(KUNCI);
  } catch {}
}
