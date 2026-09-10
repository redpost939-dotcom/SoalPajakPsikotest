'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { simpanLevel } from '@/lib/actions';
import { MENUS, MENU_LABEL } from '@/lib/menus';

export default function LevelForm({ level }) {
  const [state, action] = useActionState(simpanLevel, null);
  return (
    <section className="section form-card">
      <h1>{level ? 'Edit Level' : 'Level Baru'}</h1>
      {state?.pesan && <div className="alert alert-error">{state.pesan}</div>}
      <form action={action}>
        {level && <input type="hidden" name="id" value={level.id} />}
        <div className="form-row">
          <div className="form-group">
            <label>Kode * {level && <span className="muted">(tidak bisa diubah)</span>}</label>
            <input type="text" name="kode" defaultValue={level?.kode || ''} required disabled={!!level} />
            {level && <input type="hidden" name="kode" value={level.kode} />}
          </div>
          <div className="form-group">
            <label>Nama Level *</label>
            <input type="text" name="nama" defaultValue={level?.nama || ''} required />
          </div>
        </div>
        <div className="form-group">
          <label>Hak Akses Menu *</label>
          <div className="actions">
            {MENUS.map((m) => (
              <label key={m} className="option" style={{ cursor: 'pointer' }}>
                <input type="checkbox" name={'menu_' + m} defaultChecked={level ? (level.menus || []).includes(m) : m !== 'admin'} />
                <span>{MENU_LABEL[m] || m}</span>
              </label>
            ))}
          </div>
        </div>
        <button className="btn btn-primary" type="submit">Simpan</button>
        {' '}<Link className="btn btn-outline" href="/admin/level">Batal</Link>
      </form>
    </section>
  );
}
