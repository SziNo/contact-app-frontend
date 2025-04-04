import { forwardRef, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import InputField from './InputField'

const ContactFormModal = forwardRef(
  ({ onSubmitContact, onSubmitSuccess, onClose }, ref) => {
    const fileRef = useRef()
    const [file, setFile] = useState()
    const [values, setValues] = useState({
      name: '',
      email: '',
      phone: '',
      address: '',
      title: '',
      status: '',
    })

    const onChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        await onSubmitContact(values, file)
        onSubmitSuccess()
        setFile(undefined)
        fileRef.current.value = null
        setValues({
          name: '',
          email: '',
          phone: '',
          address: '',
          title: '',
          status: '',
        })
      } catch (error) {
        console.error('Error submitting contact:', error)
      }
    }

    return (
      <dialog ref={ref} className='modal' id='modal'>
        <div className='modal__header'>
          <h3>New Contact</h3>
          <i onClick={onClose} className='bi bi-x-lg' />
        </div>
        <div className='divider' />
        <div className='modal__body'>
          <form onSubmit={handleSubmit}>
            <div className='user-details'>
              <InputField
                label='Name'
                value={values.name}
                onChange={onChange}
                name='name'
                required
              />
              <InputField
                label='Email'
                value={values.email}
                onChange={onChange}
                name='email'
                required
              />
              <InputField
                label='Title'
                value={values.title}
                onChange={onChange}
                name='title'
                required
              />
              <InputField
                label='Phone Number'
                value={values.phone}
                onChange={onChange}
                name='phone'
                required
              />
              <InputField
                label='Address'
                value={values.address}
                onChange={onChange}
                name='address'
                required
              />
              <div className='input-box'>
                <span className='details'>Account Status</span>
                <select
                  value={values.status}
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
              <div className='file-input'>
                <span className='details'>Profile Photo</span>
                <input
                  type='file'
                  onChange={(e) => setFile(e.target.files[0])}
                  ref={fileRef}
                  name='photo'
                  required
                />
              </div>
            </div>
            <div className='form__footer'>
              <button
                onClick={onClose}
                type='button'
                className='btn btn-danger'
              >
                Cancel
              </button>
              <button type='submit' className='btn'>
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
    )
  }
)

ContactFormModal.propTypes = {
  onSubmitContact: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

ContactFormModal.displayName = 'ContactFormModal'

export default ContactFormModal
