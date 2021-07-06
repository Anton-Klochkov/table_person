import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Table = () => {

  const [dataList, setDataList] = useState([])
  const dataUrl = 'https://jsonplaceholder.typicode.com/users';//приходящие данные с сервера

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [addFormData, setAddFormData] = useState({//ввели значение из инпутов name:
    id: '',
    name: '',
    username: '',
    email: '',
    address: '',
    phone: '',
    website: '',
    company: ''
  })

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieledName = event.target.getAttribute('name');//getAttribute берется из <input name: ... />
    const fieledValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieledName] = fieledValue;

    setAddFormData(newFormData)
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newDataList = {
      id: addFormData.id,
      name: addFormData.name,
      username: addFormData.username,
      email: addFormData.email,
      address: addFormData.address,
      phone: addFormData.phone,
      website: addFormData.website,
      company: addFormData.company
    };
    const newContacts = [...dataList, newDataList];
    setDataList(newContacts)

  }

  const getAddress = (addressObj) => {//для доступа к объектам address, превращаем в строку
    return `${addressObj.street},
   ${addressObj.suite},
    ${addressObj.city},
    ${addressObj.zipcode}${addressObj.geo ? `,
    ${addressObj.geo.lat}, 
    ${addressObj.geo.lng}
    ` : ''}`
  }

  /* const getAddress = (addressObj) => {//для доступа к объектам address, превращаем в строку
      const address = addressObj.street +
      ',' + addressObj.suite +
      ',' + addressObj.city +
      ',' + addressObj.zipcode;
      const hasGeo = !!address.geo;
      
      if (hasGeo) {
        address = address + ',' + address.geo.lat +',' + address.geo.lng;
      }
  
      return address  
    }; */


  const getCompany = (companyObj) => {
    return `${companyObj.name},
     ${companyObj.catchPhrase},
      ${companyObj.bs}  `
  }

  /*  const getCompany = (companyObj) => {
     return companyObj.name + 
     ',' + companyObj.catchPhrase +
     ',' + companyObj.bs;
 } */

  useEffect(() => {//Хук ловушка
    getData()
  }, [])
  const getData = async () => {//создали функцию. async возвращает примисы
    const response = await axios.get(dataUrl)//при помощи аксиос получаем http запрос
    setDataList(response.data)

  }

  const removeData = (id) => {
    axios.delete(`${dataUrl}/${id}`).then(res => {
      const del = dataList.filter(dataList => id !== dataList.id)
      setDataList(del)
    })
  }

  const renderHeader = () => {//шапка таблицы
    let headerElement = ['id', 'name', 'userName', 'email', 'address', 'phone', 'website', 'company', 'action']

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }
  const renderBody = () => {//тело таблицы
    return dataList && dataList.map(({ id, name, username, email, address, phone, website, company }) => {
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{username}</td>
          <td>{email}</td>
          <td>{getAddress(address)}</td>
          <td>{phone}</td>
          <td>{website}</td>
          <td>{getCompany(company)}</td>
          <td className='action'>
            <button className='button'
              onClick={() => removeData(id)}>
              Delete
            </button>
          </td>
        </tr>
      )
    })
  }

  return (
    <>
      <div>
        {
          !isFormOpen ?
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => { setIsFormOpen(true) }}>
              Add Form Row
            </button>
            :
            <form onSubmit={handleAddFormSubmit}>
              <input
                type="text"
                name="id"
                required="required"
                placeholder="Enter a id"
                onChange={handleAddFormChange}
              />
              <input
                type="text"
                name="name"
                required="required"
                placeholder="Enter a name"
                onChange={handleAddFormChange}
              />
              <input
                type="text"
                name="username"
                required="required"
                placeholder="Enter a username"
                onChange={handleAddFormChange}
              />
              <input
                type="text"
                name="email"
                required="required"
                placeholder="Enter a email"
                onChange={handleAddFormChange}
              />
              <input
                type="text"
                name="address"
                required="required"
                placeholder="Enter a address"
                onChange={handleAddFormChange}
              />
              <input
                type="text"
                name="phone"
                required="required"
                placeholder="Enter a phone"
                onChange={handleAddFormChange}
              />
              <input
                type="text"
                name="website"
                required="required"
                placeholder="Enter a website"
                onChange={handleAddFormChange}
              />
              <input
                type="text"
                name="company"
                required="required"
                placeholder="Enter a company"
                onChange={handleAddFormChange}
              />

              <button className="btn btn-primary" type="submit" value="Submit" >Add Form</button>

            </form>
        }
      </div>

      <div>
        <table className="table table-bordered" id='data_list' >
          <thead>
            <tr>{renderHeader()}</tr>
          </thead>
          <tbody>{renderBody()}</tbody>
        </table>
      </div>


    </>
  )
}

export default Table;