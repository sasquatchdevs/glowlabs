import React, { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { trpc } from '~/utils/trpc'

interface FormData {
	email: string
}

const formSchema = z.object({
	email: z.string().email(),
})

const CreateNewsletterSignUp = () => {
	const [show, setShow] = useState(false)
	const [apiRes, setApiRes] = useState<string | null>(null)

	// Example react-hook-form with validation
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		criteriaMode: 'all',
		mode: 'all',
		resolver: zodResolver(formSchema),
	})
	const { mutateAsync: addEmailToNewsletter } = trpc.square.addEmailToNewsletter.useMutation()
	useEffect(() => {
		return () => {
			setShow(false)
			setApiRes(null)
		}
	}, [])

	const handleMutateAsync = async (values: FormData) => {
		try {
			const newsletterId = await addEmailToNewsletter(values)
			setApiRes(`Newsletter Id:: ${newsletterId}`)
			reset()
		} catch (error) {
			if (error instanceof Error) {
				// eslint-disable-next-line no-console
				console.log(error?.message)
			}
		}
	}
	return (
		<div className="my-4 w-full border border-green-300 bg-green-200 p-1">
			<div className="flex justify-between">
				<h4 className="my-2 text-xl font-bold">Post Create Newsletter Signup</h4>
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
						<form onSubmit={handleSubmit(handleMutateAsync)}>
							<label htmlFor="email">
								Email:
								<input type="email" id="email" {...register('email')} />
							</label>
							<p>{errors?.email?.message}</p>

							<button type="submit" className="bg-green-600 p-2">
								Submit
							</button>
						</form>
						<dl>
							<dt>Newsletter Id:</dt>
							<dd>{apiRes}</dd>
						</dl>
					</>
				)}
			</div>
		</div>
	)
}

export default CreateNewsletterSignUp
