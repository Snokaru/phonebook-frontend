import React, { useState, useEffect } from 'react';
import personService from './services/persons';


const Filter = ({value, setValue}) => {
  return (
    <div>
      filter shown with <input value={value} onChange={(event) => setValue(event.target.value)} />
    </div>
  );
};

const PhonebookForm = ({persons, setPersons, updatePerson}) => {

  const [ newNumber, setNewNumber ] = useState('');
  const [ newName, setNewName ] = useState('');

  const addNewPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    if (!persons.find(p => p.name === newPerson.name)) {
      personService.add(newPerson).then(returnedPerson => setPersons(persons.concat(returnedPerson)));
    } else { 
      if(window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number?`)) 
      updatePerson(persons.find(p => p.name === newPerson.name).id, newPerson); 
    } 
    setNewName('');
    setNewNumber('');
  }
  return (
    <div>
      <h3>add a new</h3>
      <form onSubmit={addNewPerson}>
        <div> name: <input value={newName} onChange={(event) => setNewName(event.target.value)} /> </div>
        <div> number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} /> </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const Person = ({person, deletePerson}) => {
  return (
  <li>
    {person.name} {person.number} 
    <button onClick={() => 
      window.confirm(`Delete ${person.name} ?`) ? deletePerson(person.id) : null}>
      delete
    </button>
  </li> 
  );
};

const PhonebookNumbers = ({persons, filter, deletePerson}) => {
  const displayedPersons = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));
  return (
    <div>
      <h3>Numbers</h3>
      <ul>
        {displayedPersons.map(p => <Person person={p} key={p.name} deletePerson={deletePerson} />)}
      </ul>
    </div>
  );
};


const App = () => {

  const [persons, setPersons] = useState([]); 
  const [filter, setFilter] = useState('');

  const deletePerson = id => personService.remove(id).then(response => {
    setPersons(persons.filter(p => p.id !== id));
  });

  const updatePerson = (id, newPerson) => {
    personService.update(id, newPerson).then(receivedPerson => 
      setPersons(persons.map(p => p.id === id ? receivedPerson : p))
    );
  };
  

  useEffect(() => {
    personService.getAll().then(persons => setPersons(persons));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} setValue={setFilter} />
      <PhonebookForm persons={persons} setPersons={setPersons} updatePerson={updatePerson} />
      <PhonebookNumbers persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  );
}

export default App;