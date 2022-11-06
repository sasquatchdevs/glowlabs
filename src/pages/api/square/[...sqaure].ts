/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiRequest, NextApiResponse } from 'next'
import Error from 'next/error'

import { getSquareServices } from '~/server/api/square/getServices'
import { getSquareSubscriptions } from '~/server/api/square/getSubscriptions'

// eslint-disable-next-line no-shadow
export enum ApiMethods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE',
}

export default async function squareApiHandler(
	_req: NextApiRequest,
	_res: NextApiResponse<any | Error>,
) {
	console.log({ url: _req.url?.split('/')[3], method: _req.method })
	switch (_req.url?.split('/')[3]) {
		case 'getServices':
			if (_req.method === ApiMethods.GET) {
				const bookableServices = await getSquareServices()
				return _res.status(200).json(bookableServices ?? [])
			}
			return _res.status(404).json('method not allowed')
		case 'getSubscriptions':
			if (_req.method === ApiMethods.GET) {
				const subscriptionPlans = await getSquareSubscriptions()
				return _res.status(200).json(subscriptionPlans ?? [])
			}
			return _res.status(404).json('method not allowed')
		default:
			return _res.status(404).end('Endpoint not found')
	}
}
