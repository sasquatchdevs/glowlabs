import React, { useEffect, useState } from 'react'

import formatMoney from '~/utils/formatMoney'
import { trpc } from '~/utils/trpc'

const ShowSubscriptions = () => {
	const [fetch, setFetch] = useState(false)
	const { data: subscriptions, isLoading: isLoadingSubscriptions } =
		trpc.square.getSubscriptions.useQuery(undefined, {
			enabled: fetch,
		})
	useEffect(() => {
		return () => {
			setFetch(false)
		}
	}, [])
	return (
		<div className="my-4 w-full border border-blue-300 bg-blue-200 p-1">
			<div className="flex justify-between">
				<h4 className="my-2 text-xl font-bold">Get Subscriptions</h4>
				<button
					className="m-2 bg-blue-500 p-1 text-white"
					onClick={() => setFetch((prev) => !prev)}
					type="button"
				>
					{!fetch ? 'Enable' : 'Disable'}
				</button>
			</div>
			<ul>
				{fetch &&
					!isLoadingSubscriptions &&
					subscriptions &&
					subscriptions?.map(({ id, subscriptionPlanData }) => {
						const { name, phases } = subscriptionPlanData!
						return (
							<li key={id} className="flex">
								<p>{id} | </p>
								<p className="pl-2">{name} | </p>
								<p className="pl-2">
									{formatMoney(phases![0]!.recurringPriceMoney!.amount)}
								</p>
							</li>
						)
					})}
			</ul>
		</div>
	)
}

export default ShowSubscriptions
