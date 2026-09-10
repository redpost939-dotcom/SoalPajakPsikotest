'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { simpanMateri } from '@/lib/actions';

export default function MateriForm({ materi, kategoris }) {
  const [state, action] = useActionState(simpanMateri, null);
  return (
    <section className="section form-card">
      <h1>{materi ? 'Edit Materi' : 'Materi Baru'}</h1>
      {state?.pesan && <div className="alert alert-error">{state.pesan}</div>}
      <form action={action}>
        {materi && <input type="hidden" name="id" value={materi.id} />}
        <div className="form-row">
          <div className="form-group">
            <label>Kategori *</label>
            <select name="category_id" defaultValue={materi?.category_id || kategoris[0]?.id}>
              {kategoris.map((k) => (
                <option key={k.id} value={k.id}>{k.tipe} - {k.nama}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Urutan</label>
            <input type="number" name="urutan" defaultValue={materi?.urutan ?? 1} />
          </div>
        </div>
        <div className="form-group">
          <label>Judul *</label>
          <input type="text" name="judul" defaultValue={materi?.judul || ''} required />
        </div>
        <div className="form-group">
          <label>Isi (HTML diperbolehkan: &lt;p&gt;, &lt;table&gt;, &lt;ul&gt;, dll) *</label>
          <textarea name="isi" rows="14" required defaultValue={materi?.isi || ''} />
        </div>
        <button className="btn btn-primary" type="submit">Simpan</button>
        {' '}<Link className="btn btn-outline" href="/admin/materi">Batal</Link>
      </form>
    </section>
  );
}
