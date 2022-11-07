import { TRPCError } from '@trpc/server'
import * as bcrypt from 'bcrypt'
import { z } from 'zod'

import { env } from '~/env/server.mjs'
import { getSquareServices } from '~/server/api/square/getServices'
import { getSquareSubscriptions } from '~/server/api/square/getSubscriptions'
import { squareClient } from '~/server/common/squareClient'
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
	initiateNewCustomerSubscription: publicProcedure
		.input(
			z
				.object({
					planId: z.string(),
					firstName: z.string().optional(),
					lastName: z.string().optional(),
					email: z.string().optional(),
					userId: z.string().optional(),
				})
				.required(),
		)
		.mutation(async ({ ctx, input }) => {
			// need UUID for square API
			try {
				const idempotencyKey = crypto.randomUUID()
				// need locationId for square API
				const locationId = env.SQUARE_LOCATION_ID

				// need square customerId for square API
				const userId = ctx.session?.user?.id ?? input.userId
				console.log('fetching user with:: %s', userId)
				const user = await ctx.prisma.user.findFirst({
					where: { id: userId },
				})
				let squareCustomerId: string
				// if authenticated, check user for square customerId
				if (user) {
					console.log(
						'User :: {%s} found with SquareId :: %s',
						user?.id,
						user?.squareCustomerId,
					)
					squareCustomerId = user!.squareCustomerId!
				} else {
					// we create a customer using F/L name + email
					const { result } = await squareClient.customersApi.createCustomer({
						givenName: input.firstName,
						familyName: input.lastName,
						emailAddress: input.email,
					})
					squareCustomerId = result!.customer!.id as string
					console.log('created square user :: %s', squareCustomerId)
					// create tempUser in db in case they want to register later
					await ctx.prisma.unregisteredSquareUser.create({
						data: {
							emailHash: await bcrypt.hash(input.email, 8),
							squareCustomerId,
						},
					})
				}
				// create subscription using customerInfo
				const { result: newSubscriptionRes } =
					await squareClient.subscriptionsApi.createSubscription({
						idempotencyKey,
						locationId,
						planId: input.planId,
						customerId: squareCustomerId,
					})

				console.log('Created subscription:: ', newSubscriptionRes?.subscription)
				return newSubscriptionRes?.subscription
			} catch (error) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'An unexpected error occurred, please try again later.',
					cause: error,
				})
			}
		}),
})

// SUB PLAN :: COMFORT :: JK3HCPWTUUHWVWPQFTODR7GC
// Customer :: marK@test.com :: NHHC96B7T2RDBJP3WN3KH0EMPG
