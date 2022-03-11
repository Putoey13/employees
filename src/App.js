import Axios from 'axios'
import { useState } from 'react'

function App() {

  const [name , setName] = useState("");
  const [age , setAge] = useState(0);
  const [country , setCountry] = useState("");
  const [position , setPosition] = useState("");
  const [salary , setSalary] = useState(0);
  const [newsalary , setnewSalary] = useState(0);
  
  const [employeeList, setEmployessList] = useState([]);

  const getEmployees = () => {
    Axios.get('http://localhost:3001/employees').then((response) => {
      setEmployessList(response.data);
    });
  }
  
  const addEmployee = () => {
    Axios.post('http://localhost:3001/create', {
       name: name,
       age: age,
       country: country,
       position: position,
       salary: salary
    }).then(() => {
      setEmployessList([
        ...employeeList,
      {
        name: name,
        age: age,
        country: country,
        position: position,
        salary: salary
      }
      ])
      
    })
  }

  const updateEmployeeSalary = (id) => {
    Axios.put('http://localhost:3001/update', { salary: newsalary, id: id}).then((response) => {
      setEmployessList(
        employeeList.map((val) => {
          return val.id == id ? {
            id: val.id,
            name: val.name,
            country: val.country,
            age: val.age,
            position: val.position,
            salary: newsalary
          } : val;
        })
      )
    })
  }

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployessList(
        employeeList.filter((val) => {
          console.log(id);
          return val.id != id;
        })
      )
    })
  }

  return (
    <div className="App container">
      <h1>Employee Information</h1>
      <div className="information">
        <form action="">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              onChange={(event)=>{
                setName(event.target.value)
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age:
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter age"
              onChange={(event)=>{
                setAge(event.target.value)
              }}
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Country:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter country"
              onChange={(event)=>{
                setCountry(event.target.value)
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="position" className="form-label">
              Position:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter position"
              onChange={(event)=>{
                setPosition(event.target.value)
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="salary" className="form-label">
              Salary:
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter salary"
              onChange={(event)=>{
                setSalary(event.target.value)
              }}
            />
          </div>
          <botton className="btn btn-success" onClick={addEmployee}>add employee</botton>

        </form>
      </div>
      <hr></hr>
      <div className="employees">
        <button className="btn btn-primary" onClick={getEmployees}>Show employees</button>
        <br></br>
        <br></br>
        {employeeList.map((val , key) =>{
          return (
            <div className ="employee card">
              <div className="card-body text-left">
                <p className="card-text">Name: {val.name}</p>
                <p className="card-text">Age: {val.age}</p>
                <p className="card-text">Country: {val.country}</p>
                <p className="card-text">Position: {val.position}</p>
                <p className="card-text">Salary: {val.salary}</p>
                <div className="d-flex">
                  <input type="text"
                    text="number"
                    style={{width: "300px"}}
                    placeholder="15000..."
                    className="form-control"
                    onChange={(event) => {
                      setnewSalary(event.target.value)
                    }}
                  />

                  
                  <button className='btn btn-warning' onClick={() => { updateEmployeeSalary(val.id)}}>Update</button>
                  <button className='btn btn-danger' onClick={() => { deleteEmployee(val.id)}}>Delete</button>

                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
