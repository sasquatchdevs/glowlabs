import { router, publicProcedure } from '../trpc'

export const squareRouter = router({
  getServices: publicProcedure.query(() => {
    return []
  }),
  getSubscriptions: publicProcedure.query(() => {
    return []
  }),
})
