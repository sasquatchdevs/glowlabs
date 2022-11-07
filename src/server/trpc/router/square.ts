/* eslint-disable no-console */
import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import * as bcrypt from 'bcrypt'
import { z } from 'zod'

import { env } from '~/env/server.mjs'
import { getSquareServices } from '~/server/api/square/getServices'
import { getSquareSubscriptions } from '~/server/api/square/getSubscriptions'
import { squareClient } from '~/server/common/squareClient'
import { router, publicProcedure } from '~/server/trpc/trpc'

const HASH_ROUNDS = 12

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
	createNewSquareCustomer: publicProcedure
		.input(
			z
				.object({
					firstName: z.string(),
					lastName: z.string(),
					email: z.string(),
				})
				.required(),
		)
		.mutation(async ({ ctx, input }) => {
			try {
				// find user
				const isLoggedIn = !!ctx.session?.user?.id
				const searchParams: Prisma.UserFindFirstArgs = isLoggedIn
					? { where: { id: ctx.session?.user?.id } }
					: { where: { email: input.email } }
				const dbUser = await ctx.prisma.user.findFirst(searchParams)

				// check if user and squareCustomerId
				if (dbUser && dbUser?.squareCustomerId) {
					return dbUser?.squareCustomerId
				}
				const tempUser = await ctx.prisma.unregisteredSquareUser.findFirst({
					where: { emailHash: await bcrypt.hash(input.email, HASH_ROUNDS) },
				})
				if (tempUser) {
					return tempUser.squareCustomerId
				}

				// no dbUser w/ NO customerId || !tempUser, so we create one
				const {
					result: { customer },
				} = await squareClient.customersApi.createCustomer({
					givenName: input.firstName,
					familyName: input.lastName,
					emailAddress: input.email,
				})

				const squareCustomerId = customer?.id
				if (!squareCustomerId) {
					throw new Error('ERROR creating new square customer')
				}
				console.log('created square user :: %s', squareCustomerId)

				if (dbUser) {
					// user acc found but no squareInfo, then update
					await ctx.prisma.user.update({
						where: { id: dbUser.id },
						data: { squareCustomerId },
					})
					console.log('Updated User')
				} else if (!tempUser) {
					// this is not a registration flow
					// create tempUser in db in case they want to register later
					const newTempUser = await ctx.prisma.unregisteredSquareUser.create({
						data: {
							emailHash: await bcrypt.hash(input.email, HASH_ROUNDS),
							squareCustomerId,
						},
					})
					console.log('created temp ::', newTempUser)
				}

				return squareCustomerId
			} catch (error) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'An unexpected error occurred, please try again later.',
					cause: error,
				})
			}
		}),
	initiateCustomerSubscription: publicProcedure
		.input(
			z
				.object({
					planId: z.string(),
					customerId: z.string(),
				})
				.required(),
		)
		.mutation(async ({ input }) => {
			// need UUID for square API
			try {
				const idempotencyKey = crypto.randomUUID()
				// need locationId for square API
				const locationId = env.SQUARE_LOCATION_ID

				// create subscription using customerInfo
				const {
					result: { subscription },
				} = await squareClient.subscriptionsApi.createSubscription({
					idempotencyKey,
					locationId,
					planId: input.planId,
					customerId: input.customerId,
				})

				console.log('Created subscription:: ', subscription)
				// square will send an invoice to the customer's email for payment
				return subscription
			} catch (error) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'An unexpected error occurred, please try again later.',
					cause: error,
				})
			}
		}),
})
