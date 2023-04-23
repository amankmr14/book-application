import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/prishaLogo.svg'

type Props = {}

const Header = (props: Props) => {
  return (
    <header className='px-10 py-3 flex relative shadow'>
        <img src={logo} alt="logo" width="152" height="32"/>
        <div className='absolute left-2/4 -translate-x-2/4'>
            <NavLink className={({ isActive }) => isActive ? 'font-bold underline pr-3 text-primary' : 'text-primary pr-3'} to="/">Home</NavLink>
            <span className='text-primary cursor-pointer'>Favourites</span>
        </div>
    </header>
  )
}

export default Header