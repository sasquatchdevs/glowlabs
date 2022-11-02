/* eslint-disable @next/next/no-img-element */
import React from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import tw from 'tailwind-styled-components'

const Hero = () => {
  return (
    <HeroSection>
      <div className="container mx-auto flex h-full flex-col items-center justify-center">
        <div className="flex flex-col content-center items-center">
          <h1 className="pointer-events-none inline text-7xl font-light leading-[78px] text-white">
            Your beauty truly matters to us
            <img src="/img/img1.png" className="mx-3 inline h-12 w-auto" alt="a healing bush" />
            and we know you&apos;ll love <i>your visit</i> here at Glowlabs, a place of
            <img src="/img/img2.png" className="mx-3 inline h-12 w-auto" alt="a healing branch" />
            splendor made for you.
          </h1>
          <HeroLink href="#services">View Services</HeroLink>
        </div>
      </div>
    </HeroSection>
  )
}

const HeroSection = tw.section<any>`bg-hero-pattern bg-center h-[917px] bg-no-repeat bg-cover`
const HeroLink = tw.a`mt-4 p-6 text-brand-blue hover:text-white transition-all 200ms ease-in-out bg-btn-bg bg-slideStart hover:bg-slideDone bg-btn-start`

export default Hero
