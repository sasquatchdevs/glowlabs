import JSONbig from 'json-bigint'
import { type CatalogObject } from 'square'

import { squareClient } from '~/server/common/squareClient'

export async function getSquareServices() {
	try {
		const client = squareClient
		const { result } = await client.catalogApi.searchCatalogItems({
			productTypes: ['APPOINTMENTS_SERVICE'],
		})

		return JSONbig.parse(JSONbig.stringify(result.items)) as CatalogObject[] | undefined
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('getSquareServices', error)
		throw new Error('An unexpected error occurred, please try again later.')
	}
}
