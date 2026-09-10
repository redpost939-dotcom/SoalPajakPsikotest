'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const DURASI = 30;
const WARNA = [
  { nama: 'MERAH', kode: '#d64545' },
  { nama: 'HIJAU', kode: '#1f9d55' },
  { nama: 'BIRU', kode: '#2d6fbf' },
  { nama: 'KUNING', kode: '#d98a1f' }
];

function acakStimulus() {
  const kata = WARNA[Math.floor(Math.random() * WARNA.length)];
  let tinta = WARNA[Math.floor(Math.random() * WARNA.length)];
  while (tinta.nama === kata.nama) tinta = WARNA[Math.floor(Math.random() * WARNA.length)];
  return { kata, tinta };
}

export default function Konsentrasi() {
  const [stim, setStim] = useState(acakStimulus);
  const [sisa, setSisa] = useState(DURASI);
  const [mulai, setMulai] = useState(false);
  const [hasil, setHasil] = useState(null);
  const statRef = useRef({ coba: 0, benar: 0 });
  const simpanRef = useRef(false);

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
              body: JSON.stringify({ kategori: 'Tes Konsentrasi', total, benar, detail: { tipe: 'stroop-30detik' } })
            }).catch(() => {});
          }
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [mulai]);

  function pilih(nama) {
    if (!mulai) setMulai(true);
    statRef.current.coba += 1;
    if (nama === stim.tinta.nama) statRef.current.benar += 1;
    setStim(acakStimulus());
  }

  if (hasil) {
    const skor = Math.round((hasil.benar / hasil.coba) * 100);
    const ring = skor >= 85 ? 'good' : skor >= 60 ? 'mid' : 'bad';
    return (
      <section className="result-card">
        <h1>Hasil Tes Konsentrasi</h1>
        <p className="muted">30 detik &middot; {hasil.coba} soal dijawab</p>
        <div className={`score-ring ${ring}`}>
          <div className="score-num">{skor}%</div>
          <div className="score-sub">{hasil.benar} dari {hasil.coba} benar</div>
        </div>
        <p className="muted">
          {skor >= 85 && 'Fokus Anda tajam! Mampu mengabaikan distraksi dengan baik.'}
          {skor >= 60 && skor < 85 && 'Cukup fokus. Latihan rutin akan menajamkan konsentrasi.'}
          {skor < 60 && 'Mudah terdistraksi kata. Coba lagi dengan tempo pelan tapi tepat.'}
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
      <h2 className="question-text">Pilih WARNA TINTA dari kata berikut (abaikan artinya):</h2>
      <p className="question-body" style={{ fontSize: '2.6rem', fontWeight: 800, color: stim.tinta.kode }}>{stim.kata.nama}</p>
      <div className="grid small">
        {WARNA.map((w) => (
          <button key={w.nama} className="btn btn-outline" type="button" onClick={() => pilih(w.nama)}>
            {w.nama}
          </button>
        ))}
      </div>
    </section>
  );
}
