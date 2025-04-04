import { useRef } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import useContacts from './hooks/useContacts'
import ContactFormModal from './components/ContactFormModal'
import Header from './components/Header'
import ContactList from './components/ContactList'
import ContactDetail from './components/ContactDetail'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const modalRef = useRef()
  const {
    data,
    currentPage,
    getAllContacts,
    saveNewContact,
    updateContact,
    updateImage,
  } = useContacts()

  const toggleModal = (show) =>
    show ? modalRef.current.showModal() : modalRef.current.close()

  const handleSubmitSuccess = () => {
    toggleModal(false)
    getAllContacts()
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
        ref={modalRef}
        onSubmitContact={saveNewContact}
        onSubmitSuccess={handleSubmitSuccess}
        onClose={() => toggleModal(false)}
      />

      <ToastContainer />
    </>
  )
}

export default App
