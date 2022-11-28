/* eslint-disable @next/next/no-img-element */
import React from 'react'

const CustomerWellbeing = () => {
	return (
		<section className="relative block  w-full flex-col pt-48">
			<div className="container relative mx-auto flex flex-wrap">
				<div className="flex w-full flex-wrap">
					<div className="relative inline-block w-full align-top">
						<div className="m-0 flex flex-col items-stretch lg:flex-row-reverse">
							<div className="relative w-full flex-shrink-0 p-0 px-11 before:absolute before:-top-12 before:right-[16%] before:-z-10 before:h-[calc(100%+100px)] before:w-2/3 before:scale-y-[1] before:bg-brand-khaki before:transition-transform before:duration-100 before:ease-in-out before:content-[''] sm:before:right-[95px] lg:w-[57.3%]">
								<img
									src="/imgs/wellbeing.jpg"
									alt="test"
									className="block h-full w-full object-cover"
								/>
							</div>
							<div className="relative inline-flex w-full flex-col justify-center pt-32 pb-11 lg:py-10 lg:px-11 ">
								<div className="relative">
									<span className="mt-1 transform-none p-0 font-medium uppercase leading-5 tracking-wider text-brand-textCaptions">
										EXTRAORDINARY
									</span>
									<h2 className="relative break-words font-serif text-5xl font-extralight leading-tight tracking-tight text-brand-headings sm:text-6xl">
										Your Wellbeing
									</h2>
								</div>
								<div className="relative mt-3 text-brand-textPrimary">
									<p>
										Vix te soleat eirmod civibus. Ius ad autem dicam exerci, sed
										et erremasc simul phaedrum, ex latine minimum deleniti has.
										No mei case assenna. Mea nobis putent discere no. Duo ea
										homero senserit, fugit quando intellegat dicam no his ullum.
									</p>
									<ul className="mt-5 mb-6 list-inside list-disc p-0">
										<li>Entrance to the Blue Lagoon</li>
										<li>Silica mud mask (face and body)</li>
										<li>Use of soft towel and bathrobe</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default CustomerWellbeing
