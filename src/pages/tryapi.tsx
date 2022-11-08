import React from 'react'

import CreateNewsletterSignUp from '~/components/exp/CreateNewsletterSignup'
import ShowServices from '~/components/exp/ShowServices'
import ShowSubscriptions from '~/components/exp/ShowSubscriptions'

const TryApis = () => {
	return (
		<div className="flex flex-col">
			TryApis
			<ShowServices />
			<ShowSubscriptions />
			<CreateNewsletterSignUp />
		</div>
	)
}

export default TryApis
