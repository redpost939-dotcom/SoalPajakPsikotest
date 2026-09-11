'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { pulihkanTamu } from '@/lib/actions';
import { bacaTamuLocal } from '@/lib/tamu-local';

export default function TamuRestore() {
  const router = useRouter();
  const [kerja, setKerja] = useState(false);

  useEffect(() => {
    let batal = false;
    (async () => {
      const data = bacaTamuLocal();
      if (!data || batal) return;
      setKerja(true);
      try {
        const r = await pulihkanTamu(data);
        if (!batal && r?.ok) router.refresh();
      } catch {} finally {
        if (!batal) setKerja(false);
      }
    })();
    return () => { batal = true; };
  }, [router]);

  if (!kerja) return null;
  return <p className="muted">Memulihkan sesi, mohon tunggu...</p>;
}
