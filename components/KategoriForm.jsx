'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { simpanKategori } from '@/lib/actions';

export default function KategoriForm({ kategori }) {
  const [state, action] = useActionState(simpanKategori, null);
  return (
    <section className="section form-card">
      <h1>{kategori ? 'Edit Kategori' : 'Kategori Baru'}</h1>
      {state?.pesan && <div className="alert alert-error">{state.pesan}</div>}
      <form action={action}>
        {kategori && <input type="hidden" name="id" value={kategori.id} />}
        <div className="form-row">
          <div className="form-group">
            <label>Tipe *</label>
            <select name="tipe" defaultValue={kategori?.tipe || 'psikotest'}>
              <option value="psikotest">psikotest</option>
              <option value="akuntansi">akuntansi</option>
              <option value="pajak">pajak</option>
            </select>
          </div>
          <div className="form-group">
            <label>Kode *</label>
            <input type="text" name="kode" defaultValue={kategori?.kode || ''} required />
          </div>
          <div className="form-group">
            <label>Urutan</label>
            <input type="number" name="urutan" defaultValue={kategori?.urutan ?? 0} />
          </div>
        </div>
        <div className="form-group">
          <label>Nama *</label>
          <input type="text" name="nama" defaultValue={kategori?.nama || ''} required />
        </div>
        <div className="form-group">
          <label>Deskripsi</label>
          <textarea name="deskripsi" rows="3" defaultValue={kategori?.deskripsi || ''} />
        </div>
        <button className="btn btn-primary" type="submit">Simpan</button>
        {' '}<Link className="btn btn-outline" href="/admin/kategori">Batal</Link>
      </form>
    </section>
  );
}
