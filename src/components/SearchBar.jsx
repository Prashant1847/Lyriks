import React, { useState } from 'react'

import { BsSearch } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'

import { useNavigate } from 'react-router-dom'
import { minQueryLenth } from '../redux/slices/searchSlice'

import { useDispatch } from 'react-redux'
import { toggleNavBarOnSmallDevices } from '../redux/slices/uiSlice'

const SearchBar = () => {
  const [input, setInput] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = () => {
    if (input.length < minQueryLenth) alert("Please enter altest 2 characters")
    else if (input.length > 50) alert("Please enter only 50 characters ")
    else navigate(`/search/${input}`)
  }

  const handleHamburgerClick = () => {
    dispatch(toggleNavBarOnSmallDevices())
  }

  const handleEnterKeyPress = (e) => {
    if (e.key.toLowerCase() == 'enter') handleSubmit()
  }

  return (
    <div className='searchBar-container flex align-ctr'>
      <BsSearch className='search-icon' onClick={handleSubmit} />

      <input type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className='searchBar'
        onKeyDown={handleEnterKeyPress} />

      <GiHamburgerMenu className='hamburger-icon' onClick={handleHamburgerClick} />
    </div>
  )
}

export default SearchBar