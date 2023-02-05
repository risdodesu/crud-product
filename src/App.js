import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import ButtonGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

function App() {
  const [data, setData] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(0)

  const [nameEdit,setNameEdit] = useState('')
  const [descriptionEdit, setDescriptionEdit] = useState('')
  const [imageEdit, setImageEdit] = useState('')
  const [priceEdit, setPriceEdit] = useState(0)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => setShow(id);

  const handleAdd = (e) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:7777/product',
      data: {
      name: name,
      description: description,
      image: image,
      price: parseInt(price),
      }
    })
      .then(function (response){
        setName('')
        setDescription('')
        setImage('')
        setPrice(0)
        getData()
      });
  }

  const handleEdit = () => {
    console.log(show);
    axios({
      method: 'put',
      url: `http://localhost:7777/employee/${show}`,
      data: {
        name: nameEdit,
        description: descriptionEdit,
        image: imageEdit,
        price: parseInt(priceEdit),
      }
    })
    .then(function (response) {
      handleClose()
      setNameEdit('')
      setDescriptionEdit('')
      setImageEdit('')
      setPriceEdit(0)
      getData()
    })
  }
  
  const handleDelete = (id) => {
    if (window.confirm('Apakah anda yakin ingin menghapus produk ini?'))
    axios({
      method: 'post',
      url: `http://localhost:7777/product/delete/${id}`,
    })
      .then(function (response){
        getData()
      });
  }

  useEffect(() => {
    getData()
  },[]); 

  const getData = () => {
    axios({
      method: 'get',
      url: 'http://localhost:7777/product',
    })
      .then(function (response){
        console.log(response);
        setData(response.data.data)
      });
  }

  return (
   <>
    <Container fluid>
      <h1>INPUT DATA PRODUK</h1>
      <Row>
        <Col>
        <Form onSubmit={handleAdd}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Product Name</Form.Label>
            <Form.Control value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Enter product name" />
          </Form.Group>

          <Form.Group  className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control value={description} onChange={(e)=>setDescription(e.target.value)} as="textarea" rows={3} placeholder="Enter description" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image URL</Form.Label>
            <Form.Control value={image} onChange={(e)=>setImage(e.target.value)} type="text" placeholder="Enter Image URL" />
          </Form.Group>

          <InputGroup className="mb-3">
            <InputGroup.Text>Rp</InputGroup.Text>
            <Form.Control value={price} onChange={(e)=>setPrice(e.target.value)} type="number" />
          </InputGroup>

          <Button onClick={handleAdd} variant="success" type="submit">
            Submit
          </Button>

        </Form>
        </Col>
      </Row><br/>
    </Container>

    <Table size='sm' striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Desription</th>
          <th>Image</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
            return <tr key={index}>
              <td>{index+1}</td>
              <td>{item.name}</td>
              <td >{item.description}</td>
              <td><img src={item.image}></img></td>
              <td>Rp{item.price}</td>
              <td>
              <ButtonGroup aria-label="Action">
                <Button size='sm' variant="primary" onClick={() => handleShow(item.id)}>Edit</Button>
                <Button size='sm' variant="danger" onClick={()=>handleDelete(item.id)}>Delete</Button>
              </ButtonGroup>
              </td>
            </tr>
        })}
      </tbody>
    </Table>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3" controlId="name">
            <Form.Label>Product Name</Form.Label>
            <Form.Control value={nameEdit} onChange={(e)=>setNameEdit(e.target.value)} type="text" placeholder="Enter product name" />
          </Form.Group>

          <Form.Group  className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control value={descriptionEdit} onChange={(e)=>setDescriptionEdit(e.target.value)} as="textarea" rows={3} placeholder="Enter description" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image URL</Form.Label>
            <Form.Control value={imageEdit} onChange={(e)=>setImageEdit(e.target.value)} type="text" placeholder="Enter Image URL" />
          </Form.Group>

          <InputGroup className="mb-3">
            <InputGroup.Text>Rp</InputGroup.Text>
            <Form.Control value={priceEdit} onChange={(e)=>setPriceEdit(e.target.value)} type="number" />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
    </Modal>
   </>
  );
}

export default App;