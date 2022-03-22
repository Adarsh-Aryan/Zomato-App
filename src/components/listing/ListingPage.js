import React from 'react'
import FilterSection from './FilterSection'
import ListingDetails from './ListingDetails'
import './ListingPage.css'

const ListingPage = () => {
  return (
    <div className='listing_section'>
      <FilterSection/>
      <ListingDetails/>
    </div>
  )
}

export default ListingPage