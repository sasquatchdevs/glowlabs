// @ts-check
/**
 * This file is included in `/next.config.mjs` which ensures the app isn't built with invalid env vars.
 * It has to be a `.mjs`-file to be imported there.
 */
import { env as clientEnv, formatErrors } from './client.mjs'
import { serverSchema } from './schema.mjs'

// eslint-disable-next-line no-underscore-dangle
const _serverEnv = serverSchema.safeParse(process.env)

if (!_serverEnv.success) {
  // eslint-disable-next-line no-console
  console.error('❌ Invalid environment variables:\n', ...formatErrors(_serverEnv.error.format()))
  throw new Error('Invalid environment variables')
}

// eslint-disable-next-line no-restricted-syntax
for (const key of Object.keys(_serverEnv.data)) {
  if (key.startsWith('NEXT_PUBLIC_')) {
    // eslint-disable-next-line no-console
    console.warn('❌ You are exposing a server-side env-variable:', key)

    throw new Error('You are exposing a server-side env-variable')
  }
}

export const env = { ..._serverEnv.data, ...clientEnv }
