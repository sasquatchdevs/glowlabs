import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { Subscription } from 'square'

import { reportError } from '~/utils/errors'
import { trpc } from '~/utils/trpc'

interface FormData {
	customerId: string
	planId: string
}

const CreatePaidSubscription = () => {
	const [show, setShow] = useState(false)
	const [apiRes, setApiRes] = useState<Subscription | null>(null)

	const { handleSubmit, register, reset } = useForm<FormData>()
	const { mutateAsync } = trpc.square.initiateCustomerSubscription.useMutation()
	useEffect(() => {
		return () => {
			setShow(false)
			setApiRes(null)
		}
	}, [])

	const handleCreateCustomer = async (values: FormData) => {
		try {
			const subscription = await mutateAsync(values)
			if (!subscription) {
				throw new Error()
			}
			setApiRes(subscription)
			reset()
		} catch (error) {
			if (error instanceof Error) {
				reportError(error)
			}
		}
	}
	return (
		<div className="my-4 w-full border border-green-300 bg-green-200 p-1">
			<div className="flex justify-between">
				<h4 className="my-2 text-xl font-bold">Post Create Subscription</h4>
				<button
					className="m-2 bg-green-500 p-1 text-white"
					onClick={() => setShow((prev) => !prev)}
					type="button"
				>
					{!show ? 'Open' : 'Close'}
				</button>
			</div>
			<div>
				{show && (
					<>
						<form onSubmit={handleSubmit(handleCreateCustomer)}>
							<label htmlFor="firstName">
								Square Customer Id:
								<input type="text" id="firstName" {...register('customerId')} />
							</label>
							<label htmlFor="lastName">
								Subscription Plan Id:
								<input type="text" id="lastName" {...register('planId')} />
							</label>

							<button type="submit" className="bg-green-600 p-2">
								Submit
							</button>
						</form>
						<dl>
							<dt className="font-semibold">Subscription Id:</dt>
							<dd>{apiRes?.id}</dd>
							<dt className="font-semibold">Started on:</dt>
							<dd>{apiRes?.startDate}</dd>
							<dt className="font-semibold">Active?</dt>
							<dd>{apiRes?.status}</dd>
						</dl>
					</>
				)}
			</div>
		</div>
	)
}

export default CreatePaidSubscription
