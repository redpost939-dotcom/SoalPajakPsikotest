const PALET = {
  verbal:      { i: 'Aa',   c1: '#7c5cff', c2: '#a79bff' },
  numerik:     { i: '123',  c1: '#1f9d55', c2: '#5ec98f' },
  logika:      { i: '=>',   c1: '#d98a1f', c2: '#f0b55f' },
  spasial:     { i: 'fig',  c1: '#2d6fbf', c2: '#6ba3e6' },
  matematika:  { i: '∑',    c1: '#d64545', c2: '#f07878' },
  kepribadian: { i: ':)',   c1: '#c9508f', c2: '#e687bb' },
  akuntansi:   { i: 'A+',   c1: '#1f4e8c', c2: '#5f87c0' },
  'brevet-a':  { i: 'A',    c1: '#7c5cff', c2: '#a79bff' },
  'brevet-b':  { i: 'B+',   c1: '#d64545', c2: '#f07878' },
  pbb:         { i: 'P',    c1: '#1f9d55', c2: '#5ec98f' }
};

export function warna(kode) {
  return PALET[kode] || PALET[String(kode).replace(/-.*/, '')] || { i: '?', c1: '#67788c', c2: '#98a5b5' };
}
