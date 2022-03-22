import React from 'react'
import CostFilter from './filters/CostFilter'
import CuisineFilter from './filters/CuisineFilter'
import SortFilter from './filters/SortFilter'
import './FilterSection.css'

const FilterSection = () => {
  return (
    <div className='filter_section'>
      <div>
        <h4>Filters: By</h4>
      </div>
      <hr />
      <CuisineFilter/>
      <CostFilter/>
      <SortFilter/>
    </div>
  )
}

export default FilterSection