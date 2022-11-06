import React from 'react'

import ShowServices from '~/components/exp/ShowServices'
import ShowSubscriptions from '~/components/exp/ShowSubscriptions'

const TryApis = () => {
	return (
		<div className="flex flex-col">
			TryApis
			<ShowServices />
			<ShowSubscriptions />
		</div>
	)
}

export default TryApis
