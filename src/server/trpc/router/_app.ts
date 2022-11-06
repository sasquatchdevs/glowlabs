import { router } from '../trpc'
import { authRouter } from './auth'
import { squareRouter } from './square'

export const appRouter = router({
	auth: authRouter,
	square: squareRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
