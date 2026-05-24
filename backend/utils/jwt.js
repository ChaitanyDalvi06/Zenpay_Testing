import crypto from 'crypto';

const base64UrlEncode = (input) =>
  Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

const base64UrlDecode = (input) =>
  Buffer.from(input.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8');

const getSigningInput = (header, payload) =>
  `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(payload))}`;

export const signJwt = (payload, secret, expiresInSeconds = 60 * 60) => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const tokenPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
  };

  const signingInput = getSigningInput(header, tokenPayload);
  const signature = crypto
    .createHmac('sha256', secret)
    .update(signingInput)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${signingInput}.${signature}`;
};

export const verifyJwt = (token, secret) => {
  const [encodedHeader, encodedPayload, signature] = token.split('.');

  if (!encodedHeader || !encodedPayload || !signature) {
    throw new Error('Invalid token');
  }

  const signingInput = `${encodedHeader}.${encodedPayload}`;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(signingInput)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  if (
    !crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature),
    )
  ) {
    throw new Error('Invalid token signature');
  }

  const payload = JSON.parse(base64UrlDecode(encodedPayload));
  if (payload.exp && Math.floor(Date.now() / 1000) >= payload.exp) {
    throw new Error('Token expired');
  }

  return payload;
};
