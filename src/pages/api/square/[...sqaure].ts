/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiRequest, NextApiResponse } from 'next'
import Error from 'next/error'

import { getSquareServices } from '~/server/api/square/getServices'

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
				const catalogItems = await getSquareServices()
				return _res.status(200).json(catalogItems)
			}
			return _res.status(404).json('method not allowed')
		default:
			return _res.status(404).end('Endpoint not found')
	}
}
