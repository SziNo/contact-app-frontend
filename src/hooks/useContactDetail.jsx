import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useContacts from './useContacts'
import { deleteContact, getContact } from '../api/contactService'
import { toastError, toastSuccess } from '../utils/toastService'
import PropTypes from 'prop-types'

export default function useContactDetail(id, { updateImage, updateContact }) {
  const navigate = useNavigate()
  const { setData } = useContacts()

  const [contact, setContact] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    title: '',
    status: '',
    photoUrl: '',
  })

  const fetchContact = async () => {
    try {
      const { data } = await getContact(id)
      setContact(data)
    } catch (error) {
      toastError(error.message)
    }
  }

  const handlePhotoUpdate = async (file) => {
    try {
      const formData = new FormData()
      formData.append('file', file, file.name)
      formData.append('id', id)
      await updateImage(formData, id)
      setContact((prev) => ({
        ...prev,
        photoUrl: `${prev.photoUrl}?updated_at=${new Date().getTime()}`,
      }))
      toastSuccess('Photo updated')
    } catch (error) {
      toastError(error.message)
    }
  }

  const onUpdateContact = async (contactData) => {
    try {
      await updateContact(contactData)
      toastSuccess('Contact Updated')
    } catch (error) {
      toastError(error.message)
    }
  }

  const onDeleteContact = async (id) => {
    try {
      await deleteContact(id)
      toastSuccess('Contact Deleted')

      setData((prevData) => ({
        ...prevData,
        content: prevData.content.filter((contact) => contact.id !== id),
      }))

      navigate('/', { state: { forceRefresh: true } })
    } catch (error) {
      toastError(error.message)
    }
  }

  useEffect(() => {
    if (id) {
      fetchContact()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return {
    contact,
    setContact,
    fetchContact,
    handlePhotoUpdate,
    onUpdateContact,
    onDeleteContact,
  }
}

useContactDetail.propTypes = {
  id: PropTypes.string.isRequired,
  updateImage: PropTypes.func.isRequired,
  updateContact: PropTypes.func.isRequired,
}
