'use client';

import { useActionState } from 'react';
import { tambahStaff } from '@/lib/actions';

export default function StaffForm({ roles }) {
  const [state, action] = useActionState(tambahStaff, null);
  const staff = roles.filter((r) => ['admin', 'manager'].includes(r.kode));
  return (
    <div className="quiz-start">
      <h2>Tambah Staff (Admin/Manager)</h2>
      {state?.pesan && <div className="alert alert-error">{state.pesan}</div>}
      <form action={action}>
        <div className="form-row">
          <div className="form-group">
            <label>Username *</label>
            <input type="text" name="username" required />
          </div>
          <div className="form-group">
            <label>Nama *</label>
            <input type="text" name="nama" required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Password (min 6) *</label>
            <input type="password" name="password" required />
          </div>
          <div className="form-group">
            <label>Level</label>
            <select name="role" defaultValue="manager">
              {staff.map((r) => <option key={r.kode} value={r.kode}>{r.kode} - {r.nama}</option>)}
            </select>
          </div>
        </div>
        <button className="btn btn-primary" type="submit">Tambah Staff</button>
      </form>
    </div>
  );
}
