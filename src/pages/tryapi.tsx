import React from 'react'

import CreateCustomer from '~/components/exp/CreateCustomer'
import CreateNewsletterSignUp from '~/components/exp/CreateNewsletterSignup'
import CreatePaidSubscription from '~/components/exp/CreateSubscription'
import ShowServices from '~/components/exp/ShowServices'
import ShowSubscriptions from '~/components/exp/ShowSubscriptions'

const TryApis = () => {
	return (
		<div className="flex flex-col">
			TryApis
			<ShowServices />
			<ShowSubscriptions />
			<CreateCustomer />
			<CreatePaidSubscription />
			<CreateNewsletterSignUp />
		</div>
	)
}

export default TryApis
