import React, { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import InputField from './InputField'
import useContactDetail from '../hooks/useContactDetail'

const ContactDetail = ({ updateContact, updateImage }) => {
  const { id } = useParams()
  const inputRef = useRef()
  const { contact, setContact, handlePhotoUpdate, onUpdateContact } =
    useContactDetail(id, { updateImage, updateContact })

  const selectImage = () => inputRef.current.click()

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onUpdateContact(contact)
  }

  return (
    <>
      <Link to='/contacts' className='link'>
        <i className='bi bi-arrow-left'></i> Back to list
      </Link>

      <div className='profile'>
        {/* Profile Image Section */}
        <div className='profile__details'>
          <img
            src={contact.photoUrl || '/default-avatar.png'}
            alt={`Profile of ${contact.name}`}
            className='profile__image'
            onError={(e) => {
              e.target.src = '/default-avatar.png'
            }}
          />
          <div className='profile__metadata'>
            <p className='profile__name'>{contact.name}</p>
            <p className='profile__muted'>JPG, GIF, or PNG. Max 10MB</p>
            <button
              type='button'
              onClick={selectImage}
              className='btn btn--secondary'
              aria-label='Change profile photo'
            >
              <i className='bi bi-cloud-upload'></i> Change Photo
            </button>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className='profile__settings'>
          <form onSubmit={handleSubmit} className='form'>
            <div className='user-details'>
              <input type='hidden' value={contact.id} name='id' />

              <InputField
                label='Full Name'
                value={contact.name}
                onChange={onChange}
                name='name'
                required
                placeholder='John Doe'
              />

              <InputField
                label='Email Address'
                value={contact.email}
                onChange={onChange}
                name='email'
                type='email'
                required
                placeholder='john@example.com'
              />

              <InputField
                label='Phone Number'
                value={contact.phone}
                onChange={onChange}
                name='phone'
                type='tel'
                required
                placeholder='+1 (555) 123-4567'
              />

              <InputField
                label='Physical Address'
                value={contact.address}
                onChange={onChange}
                name='address'
                required
                placeholder='123 Main St, City, Country'
              />

              <InputField
                label='Job Title'
                value={contact.title}
                onChange={onChange}
                name='title'
                required
                placeholder='Software Engineer'
              />

              <div className='input-box'>
                <span className='details'>Account Status</span>
                <select
                  value={contact.status}
                  onChange={onChange}
                  name='status'
                  className='form__select'
                  required
                >
                  <option value=''>Select Status</option>
                  <option value='Active'>Active</option>
                  <option value='Inactive'>Inactive</option>
                  <option value='Pending'>Pending</option>
                </select>
              </div>
            </div>

            <div className='form__footer'>
              <button
                type='submit'
                className='btn btn--primary'
                aria-label='Save contact changes'
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        type='file'
        ref={inputRef}
        onChange={(e) =>
          e.target.files[0] && handlePhotoUpdate(e.target.files[0])
        }
        style={{ display: 'none' }}
        accept='image/jpeg, image/png, image/gif'
        aria-hidden='true'
      />
    </>
  )
}

ContactDetail.propTypes = {
  updateContact: PropTypes.func.isRequired,
  updateImage: PropTypes.func.isRequired,
}

export default React.memo(ContactDetail)
