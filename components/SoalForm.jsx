'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { simpanSoal } from '@/lib/actions';

export default function SoalForm({ soal, kategoris }) {
  const [state, action] = useActionState(simpanSoal, null);
  return (
    <section className="section form-card">
      <h1>{soal ? 'Edit Soal' : 'Soal Baru'}</h1>
      {state?.pesan && <div className="alert alert-error">{state.pesan}</div>}
      <form action={action}>
        {soal && <input type="hidden" name="id" value={soal.id} />}
        <div className="form-row">
          <div className="form-group">
            <label>Kategori *</label>
            <select name="category_id" defaultValue={soal?.category_id || kategoris[0]?.id}>
              {kategoris.map((k) => (
                <option key={k.id} value={k.id}>{k.tipe} - {k.nama}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Level</label>
            <select name="level" defaultValue={soal?.level || 'mudah'}>
              {['mudah', 'sedang', 'sulit'].map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Urutan</label>
            <input type="number" name="nomor_urutan" defaultValue={soal?.nomor_urutan ?? 1} />
          </div>
        </div>
        <div className="form-group">
          <label>Pertanyaan *</label>
          <textarea name="pertanyaan" rows="3" required defaultValue={soal?.pertanyaan || ''} />
        </div>
        <div className="form-group">
          <label>Diagram (ASCII / opsional)</label>
          <textarea name="diagram" rows="5" defaultValue={soal?.diagram || ''} />
        </div>
        <div className="form-row">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="form-group">
              <label>Opsi {'ABCDE'[i - 1]}</label>
              <input type="text" name={'opsi' + i} defaultValue={soal?.opsi?.[i - 1] || ''} />
            </div>
          ))}
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Kunci Jawaban (nomor opsi) *</label>
            <input type="number" name="kunci" min="1" max="5" defaultValue={soal?.kunci ?? 1} required />
          </div>
          <div className="form-group">
            <label>Pembahasan</label>
            <textarea name="pembahasan" rows="3" defaultValue={soal?.pembahasan || ''} />
          </div>
        </div>
        <button className="btn btn-primary" type="submit">Simpan</button>
        {' '}<Link className="btn btn-outline" href="/admin/soal">Batal</Link>
      </form>
    </section>
  );
}
