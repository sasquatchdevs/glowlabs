import JSONbig from 'json-bigint'
import { type CatalogObject } from 'square'

import { squareClient } from '~/server/common/squareClient'

export async function getSquareSubscriptions() {
	try {
		const { catalogApi } = squareClient
		const { result } = await catalogApi.listCatalog(
			undefined,
			'SUBSCRIPTION_PLAN',
			undefined,
			undefined,
		)

		return JSONbig.parse(JSONbig.stringify(result?.objects)) as CatalogObject[] | undefined
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('getSquareSubscriptions', error)
		throw new Error('An unexpected error occurred, please try again later.')
	}
}
