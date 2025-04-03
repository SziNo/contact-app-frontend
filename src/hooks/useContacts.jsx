import { useEffect, useState, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getContacts, saveContact, updatePhoto } from '../api/contactService'
import { toastError } from '../utils/toastService'

export default function useContacts() {
  const [data, setData] = useState({})
  const [currentPage, setCurrentPage] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()

  const getAllContacts = useCallback(async (page = 0, size = 10) => {
    try {
      const { data } = await getContacts(page, size)
      setData(data)
      setCurrentPage(page)
    } catch (error) {
      toastError(error.message)
    }
  }, [])

  const saveNewContact = async (contact, file) => {
    try {
      const { data: savedContact } = await saveContact(contact)

      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('id', savedContact.id)
        const { data: photoUrl } = await updatePhoto(formData)
        return { ...savedContact, photoUrl }
      }
      return savedContact
    } catch (error) {
      throw error
    }
  }

  const updateContact = async (contact) => {
    try {
      const { data: updatedContact } = await saveContact(contact)
      setData((prev) => ({
        ...prev,
        content: prev.content?.map((c) =>
          c.id === updatedContact.id ? updatedContact : c
        ),
      }))
    } catch (error) {
      toastError(error.message)
    }
  }

  const updateImage = async (formData, contactId) => {
    try {
      const { data: photoUrl } = await updatePhoto(formData)
      setData((prev) => ({
        ...prev,
        content: prev.content?.map((contact) =>
          contact.id === contactId ? { ...contact, photoUrl } : contact
        ),
      }))
    } catch (error) {
      toastError(error.message)
    }
  }

  useEffect(() => {
    if (location.state?.forceRefresh) {
      getAllContacts(currentPage)
      // If there's forceRefresh in location,we then clear the state to prevent unnecessary refreshes
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location, currentPage, navigate, getAllContacts])

  useEffect(() => {
    getAllContacts()
  }, [getAllContacts])

  return {
    data,
    setData,
    currentPage,
    getAllContacts,
    saveNewContact,
    updateContact,
    updateImage,
  }
}
