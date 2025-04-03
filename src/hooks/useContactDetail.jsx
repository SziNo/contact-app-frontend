import { useState, useEffect } from 'react'
import { getContact } from '../api/contactService'
import { toastError, toastSuccess } from '../utils/toastService'

export default function useContactDetail(id, { updateImage, updateContact }) {
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

  useEffect(() => {
    fetchContact()
  }, [id])

  return {
    contact,
    setContact,
    handlePhotoUpdate,
    onUpdateContact,
    fetchContact,
  }
}
