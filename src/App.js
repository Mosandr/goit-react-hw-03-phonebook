import { Component } from "react";
import shortId from "shortid";

import Container from "./components/Container";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem("contacts"));
    if (contacts) {
      this.setState({ contacts: contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  onContactFormSubmit = (contactData) => {
    const id = shortId.generate();
    const { name, number } = contactData;
    const newContact = { id, name, number };

    this.setState(({ contacts }) => {
      return {
        contacts: [newContact, ...contacts],
      };
    });
  };

  onFilterChange = ({ target }) => {
    this.setState({ filter: target.value });
  };

  deleteContactById = (id) => {
    const { contacts } = this.state;
    const newContactList = contacts.filter((contact) => contact.id !== id);
    this.setState({ contacts: newContactList });
  };

  render() {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm
          onAddContact={this.onContactFormSubmit}
          contacts={contacts}
        />
        <h2>Contacts</h2>
        <Filter value={filter} onFilterChange={this.onFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onDelete={this.deleteContactById}
        />
      </Container>
    );
  }
}

export default App;
