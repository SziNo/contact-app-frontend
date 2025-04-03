import PropTypes from 'prop-types'
import InputField from './InputField'

const ContactFormModal = ({
  modalRef,
  values,
  onChange,
  fileRef,
  setFile,
  handleNewContact,
  toggleModal,
}) => {
  return (
    <dialog ref={modalRef} className='modal' id='modal'>
      <div className='modal__header'>
        <h3>New Contact</h3>
        <i onClick={() => toggleModal(false)} className='bi bi-x-lg' />
      </div>
      <div className='divider' />
      <div className='modal__body'>
        <form onSubmit={handleNewContact}>
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
            <InputField
              label='Account Status'
              value={values.status}
              onChange={onChange}
              name='status'
              required
            />
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
          <div className='form_footer'>
            <button
              onClick={() => toggleModal(false)}
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

ContactFormModal.propTypes = {
  modalRef: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  fileRef: PropTypes.object.isRequired,
  setFile: PropTypes.func.isRequired,
  handleNewContact: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
}

export default ContactFormModal
