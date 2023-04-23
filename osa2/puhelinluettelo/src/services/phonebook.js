import axios from "axios";
const baseUrl = '/api/persons'
//const baseUrl = 'http://localhost:3001/api/persons'

const phonebookService = {
getAll: () => {
  console.log("ladataan tietokanta phonebook.js")  
  const request = axios.get(baseUrl)
    return request.then(response => {
      return response.data
    })    
},

create: newObject => {
  console.log(newObject)  
  return axios.post(baseUrl, newObject)
},

remove: (id) => {
    return axios.delete(`${baseUrl}/${id}`);
},

update: (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
  }
}
export default phonebookService