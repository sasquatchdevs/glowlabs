import React, { useEffect, useState } from 'react'

import tw from 'tailwind-styled-components'

const Div = tw.div<any>`
  border-2
  border-indigo-600
  fixed
  w-full
  mt-2
  px-5
  flex
  items-center
  justify-between
`
const Title = tw.div<any>`
  border-2
  border-orange-600
  flex
  flex-wrap
  items-center
  text-3xl
`
const Nav = tw.div<any>`
  border-2
  border-green-600
  w-2/3
  flex
  items-center
  justify-evenly
`

const Topnav = () => {
  const [theme, setTheme] = useState(false)
  const handleScroll = () => {
    if (window.scrollY >= 200) {
      setTheme(true)
    } else {
      setTheme(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])

  return (
    <div>
      <Div className={theme ? 'reg-nav' : 'nav-scroll'} id="main">
        <Title>
          <img src="/img/logo.png" alt="glow labs logo" width={80} />
          <h1 className="ml-3">Glow Labs</h1>
        </Title>
        <Nav>
          <a href="#Home" className="anchorHov">
            HOME
          </a>
          <a href="#Pages" className="anchorHov">
            PAGES
          </a>
          <a href="#Blog" className="anchorHov">
            BLOG
          </a>
          <a href="#Shop" className="anchorHov">
            SHOP
          </a>
          <a href="#Cart" className="anchorHov flex">
            CART{' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </a>
          <button
            type="submit"
            className="w-1/5 bg-[#acd4e4] py-3 px-2 font-bold text-white hover:bg-[#405861] hover:transition-all"
          >
            LOG IN
          </button>
        </Nav>
      </Div>
    </div>
  )
}

export default Topnav
