'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const RONDE = 5;
const acak = (n) => Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join('');

export default function Ingatan() {
  const [ronde, setRonde] = useState(0);
  const [deret, setDeret] = useState(() => acak(4));
  const [tahap, setTahap] = useState('hafal');
  const [hitung, setHitung] = useState(4);
  const [jawab, setJawab] = useState('');
  const [lulus, setLulus] = useState([]);
  const [selesai, setSelesai] = useState(false);
  const simpanRef = useRef(false);

  useEffect(() => {
    if (tahap !== 'hafal' || selesai) return;
    setHitung(deret.length);
    const t = setInterval(() => {
      setHitung((h) => {
        if (h <= 1) {
          clearInterval(t);
          setTahap('jawab');
          return 0;
        }
        return h - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [tahap, ronde, selesai, deret]);

  function cek() {
    const ok = jawab.trim() === deret;
    const hasil = [...lulus, ok];
    setLulus(hasil);
    if (ronde + 1 >= RONDE) {
      setSelesai(true);
      const benar = hasil.filter(Boolean).length;
      if (!simpanRef.current) {
        simpanRef.current = true;
        fetch('/api/latihan/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ kategori: 'Tes Daya Ingat', total: RONDE, benar, detail: { deretTerakhir: deret.length } })
        }).catch(() => {});
      }
    } else {
      const pjg = 4 + (ronde + 1);
      setDeret(acak(pjg));
      setRonde(ronde + 1);
      setJawab('');
      setTahap('hafal');
    }
  }

  if (selesai) {
    const benar = lulus.filter(Boolean).length;
    const skor = Math.round((benar / RONDE) * 100);
    const ring = skor >= 80 ? 'good' : skor >= 40 ? 'mid' : 'bad';
    return (
      <section className="result-card">
        <h1>Hasil Tes Daya Ingat</h1>
        <p className="muted">{RONDE} ronde &middot; deret 4–8 digit</p>
        <div className={`score-ring ${ring}`}>
          <div className="score-num">{skor}%</div>
          <div className="score-sub">{benar} dari {RONDE} ronde benar</div>
        </div>
        <p className="muted">
          {benar === RONDE && 'Sempurna! Memori jangka pendek Anda sangat kuat.'}
          {benar >= 3 && benar < RONDE && 'Bagus! Terus latih dengan deret yang lebih panjang.'}
          {benar < 3 && 'Terus berlatih. Coba kelompokkan angka (chunking) agar mudah diingat.'}
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
        <span className="muted">Ronde {ronde + 1} dari {RONDE} &middot; {deret.length} digit</span>
      </div>
      <div className="progress"><div className="progress-bar" style={{ width: `${((ronde + (tahap === 'jawab' ? 1 : 0.5)) / RONDE) * 100}%` }} /></div>
      {tahap === 'hafal' ? (
        <>
          <h2 className="question-text">Hafalkan deret ini ({hitung} detik)</h2>
          <p className="question-body" style={{ fontSize: '2rem', letterSpacing: '0.4rem', fontWeight: 800 }}>{deret}</p>
          <p className="muted">Jangan ditulis dulu — hafalkan saja.</p>
        </>
      ) : (
        <>
          <h2 className="question-text">Tulis ulang deret tadi</h2>
          <div className="form-group">
            <label>Deret angka ({deret.length} digit)</label>
            <input
              type="text"
              inputMode="numeric"
              value={jawab}
              onChange={(e) => setJawab(e.target.value.replace(/\D/g, ''))}
              onKeyDown={(e) => { if (e.key === 'Enter') cek(); }}
              placeholder="Ketik angkanya..."
              autoFocus
            />
          </div>
          <div className="quiz-nav">
            <span />
            <button className="btn btn-primary" type="button" onClick={cek}>Periksa &rarr;</button>
          </div>
        </>
      )}
    </section>
  );
}
