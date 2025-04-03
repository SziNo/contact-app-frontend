import PropTypes from 'prop-types'

const Header = ({ toggleModal, nbOfContacts }) => {
  return (
    <header className='header'>
      <div className='container'>
        <h3>Contact List ({nbOfContacts})</h3>
        <button onClick={() => toggleModal(true)} className='btn'>
          <i className='bi bi-plus-square'></i> Add New Contact
        </button>
      </div>
    </header>
  )
}

Header.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  nbOfContacts: PropTypes.number.isRequired,
}

export default Header
