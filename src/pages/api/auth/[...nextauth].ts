// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'

import { env } from '~/env/server.mjs'
import { prisma } from '~/server/db/client'

export const authOptions: NextAuthOptions = {
	// Include user.id on session
	callbacks: {
		session({ session, user }) {
			if (session.user) {
				// eslint-disable-next-line no-param-reassign
				session.user.id = user.id
			}
			return session
		},
	},
	// Configure one or more authentication providers
	adapter: PrismaAdapter(prisma),
	providers: [
		FacebookProvider({
			clientId: env.FACEBOOK_CLIENT_ID,
			clientSecret: env.FACEBOOK_CLIENT_SECRET,
		}),
		GoogleProvider({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		}),
	],
}

export default NextAuth(authOptions)
