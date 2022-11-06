import React, { useEffect, useState } from 'react'

import formatMoney from '~/utils/formatMoney'
import { trpc } from '~/utils/trpc'

const ShowServices = () => {
	const [fetch, setFetch] = useState(false)
	const { data: services, isLoading: isLoadingServices } = trpc.square.getServices.useQuery(
		undefined,
		{
			enabled: fetch,
		},
	)
	useEffect(() => {
		return () => {
			setFetch(false)
		}
	}, [])
	return (
		<div className="my-4 w-full border border-blue-300 bg-blue-200 p-1">
			<h4 className="my-2 text-xl font-bold">Get Services</h4>
			<button
				className="bg-gray-300 p-1"
				onClick={() => setFetch((prev) => !prev)}
				type="button"
			>
				{!fetch ? 'Enable' : 'Disable'}
			</button>
			<ul>
				{fetch &&
					!isLoadingServices &&
					services &&
					services?.map(({ id, itemData }) => {
						const { name, variations } = itemData!
						return (
							<li key={id} className="flex">
								<p>{id}</p>
								<p className="pl-2">{name}</p>
								<p className="pl-2">
									{formatMoney(
										variations![0]!.itemVariationData!.priceMoney!.amount,
									)}
								</p>
							</li>
						)
					})}
			</ul>
		</div>
	)
}

export default ShowServices
