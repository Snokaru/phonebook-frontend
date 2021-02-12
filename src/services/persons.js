import axios from 'axios';

const baseURL = `/api/persons`;

const getAll = () => axios.get(baseURL).then(response => response.data);
const add = newPerson => axios.post(baseURL, newPerson).then(response => response.data);
const update = (id, newPerson) => axios.put(`${baseURL}/${id}`, newPerson).then(response => response.data); 
const remove = id => axios.delete(`${baseURL}/${id}`).then(response => response.data);

const personService = {
    getAll, add, update, remove
};

export default personService;