import { useRef, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import useContacts from './hooks/useContacts'
import ContactFormModal from './components/ContactFormModal'
import Header from './components/Header'
import ContactList from './components/ContactList'
import ContactDetail from './components/ContactDetail'
import { toastError } from './utils/toastService'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const {
    data,
    currentPage,
    getAllContacts,
    saveNewContact,
    updateContact,
    updateImage,
  } = useContacts()

  const modalRef = useRef()
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

  const toggleModal = (show) =>
    show ? modalRef.current.showModal() : modalRef.current.close()

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleNewContact = async (e) => {
    e.preventDefault()
    try {
      await saveNewContact(values, file)
      toggleModal(false)
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
      getAllContacts()
    } catch (error) {
      toastError(error.message)
    }
  }

  return (
    <>
      <Header
        toggleModal={toggleModal}
        nbOfContacts={data.totalElements || 0}
      />
      <main className='main'>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Navigate to='/contacts' />} />
            <Route
              path='/contacts'
              element={
                <ContactList
                  data={data}
                  currentPage={currentPage}
                  getAllContacts={getAllContacts}
                />
              }
            />
            <Route
              path='/contacts/:id'
              element={
                <ContactDetail
                  updateContact={updateContact}
                  updateImage={updateImage}
                />
              }
            />
          </Routes>
        </div>
      </main>

      <ContactFormModal
        modalRef={modalRef}
        values={values}
        onChange={onChange}
        fileRef={fileRef}
        setFile={setFile}
        handleNewContact={handleNewContact}
        toggleModal={toggleModal}
      />

      <ToastContainer />
    </>
  )
}

export default App
