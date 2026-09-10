'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const DURASI = 60;
const soalBaru = () => {
  const a = 1 + Math.floor(Math.random() * 9);
  const b = 1 + Math.floor(Math.random() * 9);
  return { a, b, jawab: a + b };
};

export default function Teliti() {
  const [soal, setSoal] = useState(soalBaru);
  const [jawab, setJawab] = useState('');
  const [sisa, setSisa] = useState(DURASI);
  const [mulai, setMulai] = useState(false);
  const [hasil, setHasil] = useState(null);
  const statRef = useRef({ coba: 0, benar: 0 });
  const simpanRef = useRef(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!mulai) return;
    const t = setInterval(() => {
      setSisa((s) => {
        if (s <= 1) {
          clearInterval(t);
          const { coba, benar } = statRef.current;
          const total = Math.max(coba, 1);
          setHasil({ coba: total, benar });
          if (!simpanRef.current) {
            simpanRef.current = true;
            fetch('/api/latihan/submit', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ kategori: 'Tes Ketelitian', total, benar, detail: { tipe: 'pauli-60detik' } })
            }).catch(() => {});
          }
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [mulai]);

  function kirim(e) {
    e.preventDefault();
    if (!jawab.trim()) return;
    if (!mulai) setMulai(true);
    statRef.current.coba += 1;
    if (Number(jawab) === soal.jawab) statRef.current.benar += 1;
    setSoal(soalBaru());
    setJawab('');
    inputRef.current?.focus();
  }

  if (hasil) {
    const skor = Math.round((hasil.benar / hasil.coba) * 100);
    const ring = skor >= 90 ? 'good' : skor >= 70 ? 'mid' : 'bad';
    return (
      <section className="result-card">
        <h1>Hasil Tes Ketelitian</h1>
        <p className="muted">60 detik &middot; {hasil.coba} soal dikerjakan</p>
        <div className={`score-ring ${ring}`}>
          <div className="score-num">{skor}%</div>
          <div className="score-sub">{hasil.benar} dari {hasil.coba} benar</div>
        </div>
        <p className="muted">
          {skor >= 90 && 'Sangat teliti! Kecepatan dan akurasi Anda seimbang.'}
          {skor >= 70 && skor < 90 && 'Baik! Sedikit latihan lagi untuk mendekati sempurna.'}
          {skor < 70 && 'Terus berlatih. Utamakan jawaban benar, kecepatan akan menyusul.'}
        </p>
        <p className="muted">Hasil tersimpan di riwayat.</p>
        <div className="quiz-nav">
          <Link className="btn btn-outline" href="/latihan">Kembali</Link>
          <button className="btn btn-primary" type="button" onClick={() => window.location.reload()}>Ulangi</button>
        </div>
      </section>
    );
  }

  return (
    <section className="quiz-box">
      <div className="quiz-meta">
        <span className="badge">LATIHAN</span>
        <span className="muted">Sisa waktu: <b>{sisa} detik</b> &middot; Benar: <b>{statRef.current.benar}</b></span>
      </div>
      <div className="progress"><div className="progress-bar" style={{ width: `${(sisa / DURASI) * 100}%` }} /></div>
      <h2 className="question-text" style={{ fontSize: '2.2rem', fontWeight: 800 }}>{soal.a} + {soal.b} = ?</h2>
      <form onSubmit={kirim}>
        <div className="form-group">
          <label>Jawaban (tekan Enter untuk lanjut)</label>
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            value={jawab}
            onChange={(e) => setJawab(e.target.value.replace(/\D/g, '').slice(0, 2))}
            placeholder="..."
            autoFocus
          />
        </div>
        <div className="quiz-nav">
          <span />
          <button className="btn btn-primary" type="submit">Jawab &rarr;</button>
        </div>
      </form>
    </section>
  );
}
