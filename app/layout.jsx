import './globals.css';

export const metadata = {
  title: 'Bank Soal Psikotest & Pajak',
  description: 'Latihan psikotest, akuntansi dasar, pajak dasar, dan Brevet A/B.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
