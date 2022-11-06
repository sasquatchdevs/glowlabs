import { TRPCError } from '@trpc/server'

import { getSquareServices } from '~/server/api/square/getServices'
import { getSquareSubscriptions } from '~/server/api/square/getSubscriptions'
import { router, publicProcedure } from '~/server/trpc/trpc'

export const squareRouter = router({
	getServices: publicProcedure.query(async () => {
		try {
			const catalogItems = await getSquareServices()
			return catalogItems
		} catch (error) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'An unexpected error occurred, please try again later.',
				cause: error,
			})
		}
	}),
	getSubscriptions: publicProcedure.query(async () => {
		try {
			const subscriptionPlans = await getSquareSubscriptions()
			return subscriptionPlans
		} catch (error) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'An unexpected error occurred, please try again later.',
				cause: error,
			})
		}
	}),
})
