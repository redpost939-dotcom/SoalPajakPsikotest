'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const HURUF = ['A', 'B', 'C', 'D', 'E'];

export default function QuizRunner({ tipe, kode, level, kembali }) {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const [idx, setIdx] = useState(0);
  const [jawab, setJawab] = useState({});
  const [hasil, setHasil] = useState(null);
  const [kirim, setKirim] = useState(false);

  useEffect(() => {
    fetch(`/api/quiz/${tipe}/${kode}?level=${encodeURIComponent(level)}`)
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok) throw new Error(j.pesan || 'Gagal memuat soal.');
        return j;
      })
      .then(setData)
      .catch((e) => setErr(e.message));
  }, [tipe, kode, level]);

  async function selesai() {
    if (kirim) return;
    setKirim(true);
    try {
      const r = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipe, kode, level,
          ids: data.soal.map((s) => s.id),
          jawaban: jawab
        })
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.pesan || 'Gagal menyimpan hasil.');
      setHasil(j.hasil);
      window.scrollTo(0, 0);
    } catch (e) {
      setErr(e.message);
    } finally {
      setKirim(false);
    }
  }

  if (err) {
    return (
      <section className="section">
        <div className="alert alert-error">{err}</div>
        <Link className="btn btn-outline" href={kembali}>Kembali</Link>
      </section>
    );
  }
  if (!data) return <section className="section"><p className="muted">Memuat soal...</p></section>;

  if (hasil) {
    const ring = hasil.skor >= 70 ? 'good' : hasil.skor >= 50 ? 'mid' : 'bad';
    const verdict = hasil.skor >= 70
      ? { cls: 'good-text', teks: 'Bagus! Kamu menguasai materi ini. Lanjutkan ke kategori/modul berikutnya.' }
      : hasil.skor >= 50
        ? { cls: 'mid-text', teks: 'Cukup baik. Pelajari kembali pembahasan di bawah untuk soal yang salah.' }
        : { cls: 'bad-text', teks: 'Perlu belajar lagi. Baca pembahasan di bawah, lalu coba ulangi.' };
    return (
      <>
        <section className="result-card">
          <h1>Hasil Tes</h1>
          <p className="muted">{hasil.kategori}{hasil.level && hasil.level !== 'semua' ? ` · Level ${hasil.level}` : ''}</p>
          <div className={`score-ring ${ring}`}>
            <div className="score-num">{hasil.skor}%</div>
            <div className="score-sub">Benar {hasil.benar} dari {hasil.total} soal</div>
          </div>
          <p className={`verdict ${verdict.cls}`}>{verdict.teks}</p>
          {hasil.penilaian && (
            <div className="penilaian">
              <h2>Penilaian Akhir</h2>
              <table className="table">
                <tbody>
                  <tr><td><b>Kategori</b></td><td>{hasil.penilaian.nama}</td></tr>
                  <tr><td><b>Yang diukur</b></td><td>{hasil.penilaian.pengukuran}</td></tr>
                  <tr><td><b>Hasil</b></td><td>{hasil.penilaian.benar} benar dari {hasil.penilaian.total} soal ({hasil.penilaian.skor}% / <b>{hasil.penilaian.predikat}</b>)</td></tr>
                  <tr><td><b>Saran</b></td><td>{hasil.penilaian.saran}</td></tr>
                </tbody>
              </table>
            </div>
          )}
          <div className="quiz-nav">
            <Link className="btn" href={kembali}>Kembali ke Daftar</Link>
          </div>
        </section>
        <section className="section">
          <h2>Kunci Jawaban &amp; Pembahasan</h2>
          {hasil.review.map((r) => !r.soal ? null : (
            <div key={r.nomor} className={`review ${r.isBenar ? 'review-ok' : 'review-wrong'}`}>
              <div className="review-head">
                <span className={`badge ${r.isBenar ? 'ok' : 'no'}`}>{r.isBenar ? 'BENAR' : 'SALAH'}</span>
                <span>Soal {r.nomor}</span>
              </div>
              <p>{r.soal.pertanyaan}</p>
              {r.soal.diagram && <pre className="diagram">{r.soal.diagram}</pre>}
              <ul className="optlist">
                {r.soal.opsi.map((op, i) => (
                  <li key={i} className={`${(i + 1) === r.soal.kunci ? 'opt-kunci' : ''} ${(i + 1) === r.jawabanUser && (i + 1) !== r.soal.kunci ? 'opt-salah' : ''}`}>
                    <b>{HURUF[i]}.</b> {op}
                    {(i + 1) === r.soal.kunci && <span className="tag">Kunci</span>}
                    {(i + 1) === r.jawabanUser && (i + 1) !== r.soal.kunci && <span className="tag">Jawabanmu</span>}
                  </li>
                ))}
              </ul>
              {r.soal.pembahasan && <div className="pembahasan"><b>Pembahasan:</b> {r.soal.pembahasan}</div>}
            </div>
          ))}
        </section>
      </>
    );
  }

  const s = data.soal[idx];
  const total = data.soal.length;
  return (
    <>
      <div className="progress"><div className="progress-bar" style={{ width: `${((idx + 1) / total) * 100}%` }} /></div>
      <section className="quiz-box">
        <div className="quiz-meta">
          <span className="badge">{tipe === 'psikotest' ? 'PSIKOTEST' : 'MODUL'}</span>
          {level !== 'semua' && <span className="badge">{level}</span>}
          <span className="muted">Soal {idx + 1} dari {total}</span>
        </div>
        <h2 className="question-text">Soal {idx + 1}</h2>
        <p className="question-body">{s.pertanyaan}</p>
        {s.diagram && <pre className="diagram">{s.diagram}</pre>}
        <div className="options">
          {s.opsi.map((op, i) => (
            <label key={i} className="option">
              <input
                type="radio"
                name={`soal-${s.id}`}
                checked={jawab[s.id] === i + 1}
                onChange={() => setJawab((j) => ({ ...j, [s.id]: i + 1 }))}
              />
              <span><b>{HURUF[i]}.</b> {op}</span>
            </label>
          ))}
        </div>
        <div className="quiz-nav">
          {idx > 0
            ? <button className="btn btn-outline" type="button" onClick={() => setIdx(idx - 1)}>&larr; Sebelumnya</button>
            : <span />}
          {idx < total - 1
            ? <button className="btn btn-primary" type="button" onClick={() => setIdx(idx + 1)}>Simpan &amp; Lanjut &rarr;</button>
            : <button className="btn btn-primary" type="button" onClick={selesai} disabled={kirim}>{kirim ? 'Menyimpan...' : 'Selesai & Lihat Hasil'}</button>}
        </div>
      </section>
    </>
  );
}
