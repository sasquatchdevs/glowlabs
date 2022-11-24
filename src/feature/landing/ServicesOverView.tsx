/* eslint-disable @next/next/no-img-element */
import React from 'react'

const ServicesOverView = () => {
	return (
		<section className="flex w-full flex-col pt-16">
			<div className="relative m-auto block ">
				<div className="container mx-auto max-w-7xl px-8">
					<div className="relative text-center">
						<h2 className="break-words font-serif text-5xl font-extralight leading-relaxed tracking-tight text-brand-headings sm:text-6xl">
							Beauty and Spa Center
						</h2>
						<p className="mt-7 max-w-4xl text-xl font-light leading-7 text-brand-textSecondary">
							Lorem ipsum dolor sit amet, eum modus ludus efficiendi ad, in sea
							ceteros postulant imperdiet, mel ei harum appellantur disputationi.
							Ridens pertinax eos ei, mel ad mazim nominati sensibus. Unum dolorum
							epicurei eum ne. Voluptaria quaerendum.
						</p>
					</div>
				</div>
			</div>
			<div className="relative mt-20 block">
				<div className="container relative mx-auto flex flex-col px-8 lg:flex-row">
					<ServiceCard
						href="#services"
						image="/imgs/services-banner-1.jpg"
						title="Mineral Salt Scrub"
						blurb="Lorem ipsum dolor sit amet, eum modus ludus efficiendi ad, in sea ceteros postulant nec."
					/>
					<ServiceCard
						href="#services"
						image="/imgs/services-banner-2.jpg"
						title="Geothermal Spa"
						blurb="Lorem ipsum dolor sit amet, eum modus ludus efficiendi ad, in sea ceteros postulant nec."
					/>
					<ServiceCard
						href="#services"
						image="/imgs/services-banner-3.jpg"
						title="Mineral Baths"
						blurb="Lorem ipsum dolor sit amet, eum modus ludus efficiendi ad, in sea ceteros postulant nec."
					/>
				</div>
			</div>
		</section>
	)
}

const ServiceCard = ({
	image,
	title,
	blurb,
	href,
}: {
	image: string
	title: string
	blurb: string
	href: string
}) => {
	return (
		<div className="group/item relative mt-10 flex w-full first:mt-0 lg:mt-0 lg:w-1/3">
			<div className="relative lg:mr-4">
				<div className="relative inline-block w-full overflow-hidden align-top">
					<img
						className="block w-full -translate-x-1 scale-105 transition-transform duration-300 ease-in-out group-hover/item:translate-x-1"
						src={image}
						alt={title}
						width="800"
						height="1074"
					/>
				</div>
				<a
					href={href}
					className="group/items absolute top-0 left-0 z-[1] block h-full w-full cursor-pointer text-brand-textPrimary no-underline hover:text-brand-headings"
				>
					<span className="hidden">{title}</span>
				</a>
				<div className="absolute top-0 left-0 flex h-full w-full items-end py-8 px-9">
					<div className="w-full bg-white px-5 py-10 text-center align-middle sm:py-14 sm:px-[20%] lg:px-8">
						<h5 className="m-0 break-words font-serif text-2xl font-medium leading-5 text-brand-headings">
							{title}
						</h5>
						<p className="mt-4 hidden leading-6 text-brand-textPrimary sm:block lg:text-sm">
							{blurb}
						</p>
						<div className="group/learn z-[2] mt-8 hidden sm:block">
							<a
								href={href}
								className="relative inline-block w-auto border-none bg-transparent p-0 align-middle text-sm font-medium uppercase tracking-wider text-brand-headings no-underline transition-all duration-200 ease-in-out"
							>
								<span className="relative z-[1] m-0 inline-block pr-6 pl-1 align-middle">
									Learn More
									<span className='absolute bottom-0 left-0 -z-[1] h-2 w-full bg-brand-textPrimary bg-current opacity-20 content-[""] group-hover/learn:bg-brand-headings' />
								</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ServicesOverView
