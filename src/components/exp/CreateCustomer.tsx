import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'

import formatMoney from '~/utils/formatMoney'
import { trpc } from '~/utils/trpc'

interface FormData {
	firstName: string
	lastName: string
	email: string
}

const CreateCustomer = () => {
	const [show, setShow] = useState(false)
	const [apiRes, setApiRes] = useState<string | null>(null)

	const { handleSubmit, register, reset } = useForm<FormData>()
	const { mutateAsync } = trpc.square.createNewSquareCustomer.useMutation()
	useEffect(() => {
		return () => {
			setShow(false)
			setApiRes(null)
		}
	}, [])

	const handleCreateCustomer = async (values: FormData) => {
		try {
			const customerId = await mutateAsync(values)
			setApiRes(`Square Customer Id:: ${customerId}`)
			reset()
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div className="my-4 w-full border border-green-300 bg-green-200 p-1">
			<div className="flex justify-between">
				<h4 className="my-2 text-xl font-bold">Post Create Square Customer</h4>
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
								First Name:
								<input type="text" id="firstName" {...register('firstName')} />
							</label>
							<label htmlFor="lastName">
								Last Name:
								<input type="text" id="lastName" {...register('lastName')} />
							</label>
							<label htmlFor="email">
								Email:
								<input type="email" id="email" {...register('email')} />
							</label>

							<button type="submit" className="bg-green-600 p-2">
								Submit
							</button>
						</form>
						<div>{apiRes}</div>
					</>
				)}
			</div>
		</div>
	)
}

export default CreateCustomer
