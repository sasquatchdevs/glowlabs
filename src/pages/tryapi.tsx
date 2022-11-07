import React from 'react'

import CreateCustomer from '~/components/exp/CreateCustomer'
import ShowServices from '~/components/exp/ShowServices'
import ShowSubscriptions from '~/components/exp/ShowSubscriptions'

const TryApis = () => {
	return (
		<div className="flex flex-col">
			TryApis
			<ShowServices />
			<ShowSubscriptions />
			<CreateCustomer />
		</div>
	)
}

export default TryApis
