import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import FilterSection from './FilterSection'
import ListingDetails from './ListingDetails'
import { BsFilterSquareFill } from 'react-icons/bs'
import './ListingPage.css'

const ListingPage = () => {

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        
        <Modal.Body>
          <FilterSection/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }


  const [filterShow, setFilterShow] = React.useState(false);

  return (
    <div className='listing_section'>

      <div style={{ textAlign: 'center',marginBottom:'2rem' }} className='filter_btn'>

        <Button variant="info" style={{ width: '50%' }} onClick={() => setFilterShow(true)}>
          <span>Filters By</span>
          &nbsp;
          <BsFilterSquareFill />
        </Button>
      </div>

      <MyVerticallyCenteredModal
        show={filterShow}
        onHide={() => setFilterShow(false)}
      />


      <div className='filter_content'>
        <FilterSection/>
      </div>
      
      <ListingDetails />
    </div>
  )
}

export default ListingPage