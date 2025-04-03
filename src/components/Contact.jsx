import { Link } from 'react-router-dom'
import { truncate } from '../utils/truncate'
import PropTypes from 'prop-types'

const Contact = ({ contact }) => {
  return (
    <li className='contact__item'>
      <Link to={`/contacts/${contact.id}`}>
        <div className='contact__header'>
          <div className='contact__image'>
            <img src={contact.photoUrl} alt={contact.name} />
          </div>
          <div className='contact__details'>
            <p className='contact_name'>{truncate(contact.name, 15)}</p>
            <p className='contact_title'>{contact.title}</p>
          </div>
        </div>
        <div className='contact__body'>
          <p>
            <i className='bi bi-envelope'></i> {truncate(contact.email, 20)}
          </p>
          <p>
            <i className='bi bi-geo'></i> {contact.address}
          </p>
          <p>
            <i className='bi bi-telephone'></i> {contact.phone}
          </p>
          <p>
            {contact.status === 'Active' ? (
              <i className='bi bi-check-circle'></i>
            ) : (
              <i className='bi bi-x-circle'></i>
            )}{' '}
            {contact.status}
          </p>
        </div>
      </Link>
    </li>
  )
}

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    photoUrl: PropTypes.string,
  }).isRequired,
}

export default Contact
