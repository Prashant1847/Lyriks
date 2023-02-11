import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {NavLink} from 'react-router-dom'

import logo from '../assets/logo.svg'
import {BiHome, BiHash} from 'react-icons/bi'
import {MdPeople, MdLandscape} from 'react-icons/md'

const SHOW_NAVBAR_CLASS = 'show-navBar'

const NavBar = () => {
    const {showNavOnSmallDevices} = useSelector(state => state.uiSlice)
    const navBarRef = useRef()

    useEffect(() => {
        if(showNavOnSmallDevices) navBarRef.current.classList.add(SHOW_NAVBAR_CLASS)
        else  navBarRef.current.classList.remove(SHOW_NAVBAR_CLASS)
    }, [showNavOnSmallDevices])

      
    return (
        <div className='nav-container' ref={navBarRef}>
            <div className='logo-container'>
                <img src={logo} alt='logo' className='logo' />
            </div>
            <nav className='navBar'>
                <ul className='nav-items-container flex'>
                    <NavLink to="/">
                        <BiHome className='nav-icon'/> Discover
                    </NavLink>
                    <NavLink to="/TopCharts">
                        <BiHash className='nav-icon'/>Top Charts
                    </NavLink>
                    <NavLink to="/TopArtists">
                        <MdPeople className='nav-icon' />Top Artists
                    </NavLink>
                    <NavLink to="/AroundYou">
                        <MdLandscape className='nav-icon'/>Around You
                    </NavLink>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar