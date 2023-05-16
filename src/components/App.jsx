import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/contactForm';
import { ContactList } from './ContactList/contactList';
import { Filter } from './Filter/filter';
import PropTypes from 'prop-types';

export function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? []
  });
  const [filter, setFilter] = useState('');

  const formSubmit = data => {
    contacts.some(contacts => contacts.name === data[0].name)
      ? alert(` ${data[0].name} is already in contacts`)
      : setContacts(prevContacts => [...prevContacts, ...data]);
  };

  const getVisibleContacts = () => {
    const filterToLowerCase = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterToLowerCase)
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div style={divStyles}>
      <div
        style={{
          width: 1100,
        }}
      >
        <h1 style={{ fontSize: 60 }}>Phonebook</h1>
        <ContactForm onSubmit={formSubmit} />
        <h2 style={{ fontSize: 50 }}>Contacts</h2>
        <Filter
          value={filter}
          onChange={evt => setFilter(evt.currentTarget.value)}
        />
        <ContactList
          contacts={getVisibleContacts()}
          onDeleteContact={deleteContact}
        />
      </div>
    </div>
  );
}

const divStyles = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  fontSize: 40,
  color: '#010101',
  flexDirection: 'column',
};
App.prototype = {
 filter: PropTypes.string,
  contacts: PropTypes.number,
};