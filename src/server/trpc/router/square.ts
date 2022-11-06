import { TRPCError } from '@trpc/server'

import { getSquareServices } from '~/server/api/square/getServices'
import { router, publicProcedure } from '~/server/trpc/trpc'

export const squareRouter = router({
	getServices: publicProcedure.query(async () => {
		try {
			const catalogItems = getSquareServices()
			return catalogItems
		} catch (error) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'An unexpected error occurred, please try again later.',
				cause: error,
			})
		}
	}),
	getSubscriptions: publicProcedure.query(() => {
		return []
	}),
})
