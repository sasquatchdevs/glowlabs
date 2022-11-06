import { Client, Environment } from 'square'

import { env } from '~/env/server.mjs'

declare global {
	// eslint-disable-next-line no-var, vars-on-top
	var square: Client | undefined
}

export const squareClient =
	global.square ||
	new Client({
		accessToken: env.SQUARE_ACCESS_TOKEN,
		environment: Environment.Sandbox,
	})

if (env.NODE_ENV !== 'production') {
	global.square = squareClient
}
