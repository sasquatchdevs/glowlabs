import { NewsletterSignUps, Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

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
	addEmailToNewsletter: publicProcedure
		.input(
			z
				.object({
					email: z.string().email(),
				})
				.required(),
		)
		.mutation(async ({ ctx, input }) => {
			try {
				const newsletterSignUp: NewsletterSignUps =
					await ctx.prisma.newsletterSignUps.create({
						data: {
							email: input.email,
						},
					})
				return newsletterSignUp?.id
			} catch (error) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'An unexpected error occurred, please try again later.',
					cause: error,
				})
			}
		}),
})
