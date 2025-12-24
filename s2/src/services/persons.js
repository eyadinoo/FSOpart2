import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const addPerson = person => {
    return axios.post(baseUrl,person).then(response => response.data)
}

const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updatePerson = (person,newNum) => {
    return axios.put(`${baseUrl}/${person.id}`,{...person, number:newNum})
        .then(response => response.data)
}

export default {getAll, addPerson, deletePerson, updatePerson}