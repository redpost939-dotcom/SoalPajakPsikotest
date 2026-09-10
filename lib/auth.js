import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { ROLES, can } from './roles';

export { ROLES, can };

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
    return { id: payload.id, username: payload.username, nama: payload.nama, role: payload.role };
  } catch {
    return null;
  }
}

export async function setSession(user) {
  const token = await new SignJWT({ id: user.id, username: user.username, nama: user.nama, role: user.role })
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
