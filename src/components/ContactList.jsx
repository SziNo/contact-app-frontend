import Contact from './Contact'

const ContactList = ({ data, currentPage, getAllContacts }) => {
  return (
    <main className='main'>
      {data?.content?.length === 0 && (
        <div>No Contacts. Please add a new contact</div>
      )}

      <ul className='contact__list'>
        {data?.content?.length > 0 &&
          data.content.map((contact) => (
            <Contact contact={contact} key={contact.id} />
          ))}
      </ul>

      {data?.content?.length > 0 && data?.totalPages > 1 && (
        <div className='pagination'>
          <a
            onClick={() => getAllContacts(currentPage - 1)}
            className={currentPage === 0 ? 'disabled' : ''}
          >
            &laquo;
          </a>

          {data &&
            [...Array(data.totalPages).keys()].map((page) => (
              <a
                onClick={() => getAllContacts(page)}
                className={currentPage === page ? 'active' : ''}
                key={page}
              >
                {page + 1}
              </a>
            ))}

          <a
            onClick={() => getAllContacts(currentPage + 1)}
            className={data.totalPages === currentPage + 1 ? 'disabled' : ''}
          >
            &raquo;
          </a>
        </div>
      )}
    </main>
  )
}

export default ContactList
