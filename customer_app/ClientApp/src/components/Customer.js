import React,{useState,useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';  
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Customer=()=> {

const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [countryCode,setCountryCode] = useState('');
  const [gender,setGender] = useState('');
  const [balance,setBalance] = useState(0);

  const [editId,setEditId] = useState('');
  const [editFirstName,setEditFirstName] = useState('');
  const [editLastName,setEditLastName] = useState('');
  const [editEmail,setEditEmail] = useState('');
  const [editPhoneNumber,setEditPhoneNumber] = useState('');
  const [editCountryCode,setEditCountryCode] = useState('');
  const [editGender,setEditGender] = useState('');
  const [editBalance,setEditBalance] = useState(0);

// const customerData=[

//     {
//         id:1,
//         firstName:"John",
//         lastName:"Jerom",
//         email:"aa@gmail.com",
//         phoneNumber:7567346,
//         countryCode:"EN",
//         gender:"Male",
//         balance:2200
//     },
//     {
//         id:2,
//         firstName:"Peter",
//         lastName:"Pom",
//         email:"bb@gmail.com",
//         phoneNumber:8844444,
//         countryCode:"US",
//         gender:"Female",
//         balance:5000
//     }
// ]


const [data,setData] =useState([]);
useEffect(()=>{
    getCustomerData();
},[])


// edit customer data
const handleEdit=(id)=>
{
    //alert(id);
    handleShow();
    axios.get(`https://localhost:7072/api/customer/${id}`)
    .then((result)=>{
        setEditFirstName(result.data.firstName);
        setEditLastName(result.data.lastName);
        setEditEmail(result.data.email);
        setEditPhoneNumber(result.data.phoneNumber);
        setEditCountryCode(result.data.countryCode);
        setEditGender(result.data.gender);
        setEditBalance(result.data.balance);
        setEditId(result.data.balance);
    })
    .catch((error)=>
{
    console.log(error);
})
}

// delete customer data
const handleDelete=(id)=>
{
    if(window.confirm("Are you sure to delete this customer")==true)
    {
    axios.delete(`https://localhost:7072/api/customer/delete/${id}`)
    .then((result)=>{
        if(result.status===200)
        {
        toast.success('Customer has been deleted');
        getCustomerData();
        }
    })
    .catch((error)=>{toast.error(error);})
    }
}

// update customer data
const handleUpdate=()=>
{
   
}

//save customer data
const handleSave=()=>
{
const url = 'https://localhost:7072/api/customer/create';
const data ={

            firstname:firstName,
            lastname:lastName,
            email:email,
            phone_Number:phoneNumber,
            country_code:countryCode,
            gender:gender,
            balance:balance
}
axios.post(url,data)
.then((result)=>{
getCustomerData()
clear();
toast.success('Customer has been added');
}).catch((error)=>{toast.error(error);})
}
// clear form data
const clear=()=>
{
setFirstName('');
setLastName('');
setEmail('');
setPhoneNumber('');
setCountryCode('');
setGender('');
setBalance('');

setEditFirstName('');
setEditLastName('');
setEditEmail('');
setEditPhoneNumber('');
setEditCountryCode('');
setEditGender('');
setEditBalance('');
setEditId('');
}

//get customer data
const getCustomerData = ()=>{
    axios.get("https://localhost:7072/api/customer")
    .then((result)=>{
        console.log(result)
        setData(result.data)
    })
    .catch((error)=>{
console.log(error)
    })
}
    return (
      <>
      <ToastContainer/>
       <Container>
      <Row>
        <Col>
        <input type={Text} className='form-control' placeholder='Enter First Name' value={firstName} onChange={(e)=>setFirstName(e.target.value)}></input>
        </Col>
        <Col>
        <input type={Text} className='form-control' placeholder='Enter Last Name' value={lastName} onChange={(e)=>setLastName(e.target.value)}></input>
        </Col>
        <Col>
        <input type={Text} className='form-control' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
        </Col>
        <Col>
        <input type={Text} className='form-control' placeholder='Enter Phone Number' value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}></input>
        </Col>
        <Col>
        <input type={Text} className='form-control' placeholder='Enter Country Code' value={countryCode} onChange={(e)=>setCountryCode(e.target.value)}></input>
        </Col>
        <Col>
        <input type={Text} className='form-control' placeholder='Enter Gender' value={gender} onChange={(e)=>setGender(e.target.value)}></input>
        </Col>
        <Col>
        <input type={Text} className='form-control' placeholder='Enter Balance' value={balance} onChange={(e)=>setBalance(e.target.value)}></input>
        </Col>
        <Col>
        <button className='btn btn-primary'onClick={()=>handleSave()} >Submit</button>
        </Col>
      </Row>
    </Container>
    <br></br>
      <Table striped bordered hover>
      <thead>
        <tr>
            <th>Cutomer Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Country Code</th>
            <th>Gender</th>
            <th>Balance</th>
            <th>Action</th>
        </tr>
      </thead>
      <tbody>
       {
         data && data.length>0 ?
         data.map((item,index)=>{
        return (
        <tr kye={index}>
            <td>{item.id}</td>
            <td>{item.firstname}</td>
            <td>{item.lastname}</td>
            <td><a href='#'>{item.email}</a></td>
            <td>{item.phone_Number}</td>
            <td>{item.country_code}</td>
            <td>{item.gender}</td>
            <td>${item.balance}</td>
            <td colSpan={2}>
            <button className='btn btn-primary' onClick={()=>handleEdit(item.id)}>Edit</button> &nbsp;
            <button className='btn btn-danger' onClick={()=>handleDelete(item.id)}>Delete</button> 
            </td>
        </tr>
        ) 
        })
        :
        'Loading...'
       }
      </tbody>
    </Table>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify / Update Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>Edit or Update Customer</Modal.Body>
        <Row>
        <Col>
        <input type={Text} className='form-control' placeholder='Enter First Name' value={editFirstName} onChange={(e)=>setEditFirstName(e.target.value)}></input>
        </Col>
        <Col>
        <input type={Text} className='form-control' placeholder='Enter Last Name' value={editLastName} onChange={(e)=>setEditLastName(e.target.value)}></input>
        </Col>
        <Col>
        <input type={Text} className='form-control' placeholder='Enter Email' value={editEmail} onChange={(e)=>setEditEmail(e.target.value)}></input>
        </Col>
        <Col>
        <input type={Text} className='form-control' placeholder='Enter Phone Number' value={editPhoneNumber} onChange={(e)=>setEditPhoneNumber(e.target.value)}></input>
        </Col>
        <Col>
        <input type={Text} className='form-control' placeholder='Enter Country Code' value={editCountryCode} onChange={(e)=>setEditCountryCode(e.target.value)}></input>
        </Col>
        <Col>
        <input type={Text} className='form-control' placeholder='Enter Gender' value={editGender} onChange={(e)=>setEditGender(e.target.value)}></input>
        </Col>
        <Col>
        <input type={Text} className='form-control' placeholder='Enter Balance' value={editBalance} onChange={(e)=>setEditBalance(e.target.value)}></input>
        </Col>
        </Row>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }
  export default Customer;