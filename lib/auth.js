import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { ROLE_DEFAULTS as ROLES, can, canMenu } from './roles';

export { ROLES, can, canMenu };

const COOKIE = 'bs_session';

function secret() {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error('SESSION_SECRET belum diisi. Lihat .env.example');
  return new TextEncoder().encode(s);
}

export async function getSession() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return {
      id: payload.id ?? null,
      username: payload.username ?? 'tamu',
      nama: payload.nama,
      role: payload.role,
      tamu: payload.tamu === true,
      umur: payload.umur ?? null,
      alamat: payload.alamat ?? null
    };
  } catch {
    return null;
  }
}

export async function setSession(user) {
  const token = await new SignJWT({
    id: user.id ?? null,
    username: user.username ?? 'tamu',
    nama: user.nama,
    role: user.role,
    tamu: user.tamu === true,
    umur: user.umur ?? null,
    alamat: user.alamat ?? null
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret());
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 7 * 24 * 60 * 60
  });
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}
