import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticatedWebSocket(socket: any): string {
  const { token } = socket.handshake.query;
  const decoded = verify(token, authConfig.jwt.secret);
  const { sub } = decoded as ITokenPayload;
  return sub;
}
