'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';

const DURASI = 60;
const TEKS = [
  'Pajak adalah kontribusi wajib kepada negara yang terutang oleh orang pribadi atau badan yang bersifat memaksa berdasarkan undang-undang. Pajak digunakan untuk keperluan negara bagi sebesar-besarnya kemakmuran rakyat. Setiap warga negara yang memenuhi syarat wajib mendaftarkan diri dan melaporkan pajaknya tepat waktu.',
  'Psikotest adalah serangkaian tes yang dirancang untuk mengukur kemampuan kognitif dan karakter seseorang. Tes ini sering digunakan dalam proses rekrutmen kerja. Persiapan yang baik meliputi latihan soal verbal, numerik, logika, serta menjaga kondisi fisik dan mental agar tetap fokus.',
  'Daya ingat dapat dilatih dengan cara membaca, menghafal, dan mengulang informasi secara berkala. Konsentrasi yang baik membantu otak menyimpan informasi lebih lama. Kurangi distraksi saat belajar, buat catatan ringkas, dan uji diri sendiri dengan menulis ulang apa yang sudah dipelajari.'
];

function verdict(wpm, akurasi) {
  if (wpm >= 40 && akurasi >= 95) return 'Luar biasa! Kecepatan dan akurasi mengetik Anda sangat baik.';
  if (wpm >= 25 && akurasi >= 90) return 'Bagus! Terus latih konsistensi kecepatan dan ketepatan Anda.';
  if (akurasi >= 85) return 'Cukup baik. Fokus dulu pada akurasi, kecepatan akan menyusul.';
  return 'Terus berlatih. Utamakan mengetik dengan benar, lalu tambah kecepatan perlahan.';
}

export default function Mengetik() {
  const teks = useMemo(() => TEKS[Math.floor(Math.random() * TEKS.length)], []);
  const [input, setInput] = useState('');
  const [jalan, setJalan] = useState(false);
  const [sisa, setSisa] = useState(DURASI);
  const [hasil, setHasil] = useState(null);
  const ketikRef = useRef(0);
  const timerRef = useRef(null);
  const simpanRef = useRef(false);

  function selesai(inputAkhir, ketikan) {
    clearInterval(timerRef.current);
    const benar = [...inputAkhir].filter((c, i) => c === teks[i]).length;
    const total = Math.max(ketikan, 1);
    const akurasi = Math.round((benar / total) * 100 * 100) / 100;
    const menit = (DURASI - sisaRef.current) / 60 || 1 / 60;
    const wpm = Math.round(((benar / 5) / menit) * 10) / 10;
    const h = { wpm, akurasi, benar, total: ketikan };
    setHasil(h);
    if (!simpanRef.current) {
      simpanRef.current = true;
      fetch('/api/latihan/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kategori: 'Tes Mengetik', total: ketikan, benar, detail: { wpm, akurasi } })
      }).catch(() => {});
    }
  }

  const sisaRef = useRef(DURASI);
  function tick() {
    sisaRef.current -= 1;
    setSisa(sisaRef.current);
    if (sisaRef.current <= 0) {
      setJalan(false);
      selesai(inputRef.current, ketikRef.current);
    }
  }
  const inputRef = useRef('');
  function mulai() {
    if (jalan) return;
    setJalan(true);
    timerRef.current = setInterval(tick, 1000);
  }
  function onKey(e) {
    if (!jalan && !hasil && e.key.length === 1) mulai();
    if (e.key.length === 1) ketikRef.current += 1;
  }
  function onChange(e) {
    if (hasil) return;
    const v = e.target.value.slice(0, teks.length);
    inputRef.current = v;
    setInput(v);
    if (v.length >= teks.length) {
      setJalan(false);
      clearInterval(timerRef.current);
      selesai(v, ketikRef.current);
    }
  }

  if (hasil) {
    const ring = hasil.akurasi >= 90 ? 'good' : hasil.akurasi >= 75 ? 'mid' : 'bad';
    return (
      <>
        <section className="result-card">
          <h1>Hasil Tes Mengetik</h1>
          <p className="muted">60 detik &middot; {hasil.total} ketikan</p>
          <div className={`score-ring ${ring}`}>
            <div className="score-num">{hasil.wpm}</div>
            <div className="score-sub">kata per menit (WPM)</div>
          </div>
          <p className="verdict">Akurasi: <b>{hasil.akurasi}%</b> ({hasil.benar} dari {hasil.total} karakter benar)</p>
          <p className="muted">{verdict(hasil.wpm, hasil.akurasi)}</p>
          <p className="muted">Hasil tersimpan di riwayat.</p>
          <div className="quiz-nav">
            <Link className="btn btn-outline" href="/latihan">Kembali</Link>
            <button className="btn btn-primary" type="button" onClick={() => window.location.reload()}>Ulangi</button>
          </div>
        </section>
      </>
    );
  }

  return (
    <section className="quiz-box">
      <div className="quiz-meta">
        <span className="badge">LATIHAN</span>
        <span className="muted">Sisa waktu: <b>{sisa} detik</b></span>
      </div>
      <div className="progress"><div className="progress-bar" style={{ width: `${(sisa / DURASI) * 100}%` }} /></div>
      <p className="question-body" style={{ lineHeight: 2 }} aria-hidden>
        {[...teks].map((c, i) => {
          let cls = '';
          if (i < input.length) cls = input[i] === c ? 'opt-kunci' : 'opt-salah';
          else if (i === input.length) cls = 'pembahasan';
          return <span key={i} className={cls} style={{ borderRadius: 3 }}>{c}</span>;
        })}
      </p>
      <div className="form-group">
        <label>Ketik di sini (mulai mengetik untuk menjalankan timer)</label>
        <textarea
          rows="4"
          value={input}
          onKeyDown={onKey}
          onChange={onChange}
          onPaste={(e) => e.preventDefault()}
          placeholder="Klik lalu mulai mengetik..."
          autoFocus
        />
      </div>
    </section>
  );
}
