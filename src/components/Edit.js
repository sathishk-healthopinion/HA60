import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Spinner,Container,Jumbotron ,Form,Button,Col} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { AuthContext } from "../App";

function Edit(props) {
  const [horses, setHorses] = useState({ id: '', horse_name: '', horse_number: '', age_verified: '' ,dob:'',color:'',ushja_registered:''});
  const [showLoading, setShowLoading] = useState(true);
  const { state: authState } = React.useContext(AuthContext);
  const apiUrl = "https://dev.api.staller.show/v1/horses/" + props.match.params.id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl,{
        headers: {
          Authorization: `Bearer ${authState.token}`
        }
      });
      setHorses(result.data.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateProduct = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { horse_name: horses.horse_name, horse_number: horses.horse_number, age_verified: parseInt(horses.age_verified) , ushja_registered: parseInt(horses.ushja_registered), dob: horses.dob, color: horses.color};
    console.log(data);

    axios.put(apiUrl, data,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authState.token}`,
      }
    })
      .then((result) => {
        setShowLoading(false);
        console.log(result);
        props.history.push({
          pathname: '/show/' + result.data.data.id
        });
    
      }).catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setHorses({...horses, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
      <Container>
        <Form onSubmit={updateProduct}>
          <Form.Group>
            <Form.Label>Horses Name</Form.Label>
            <Form.Control type="text" name="horse_name" id="horse_name" placeholder="Enter Horses name" value={horses.horse_name} onChange={onChange} />
          </Form.Group>
          <br />

          <Form.Group>
          <Form.Label>Horses Number</Form.Label>
          <Form.Control type="number" name="horse_number" id="horse_number" placeholder="Enter Horses Number" value={horses.horse_number} onChange={onChange} />
        </Form.Group>
         
        <br />
        <Form.Group>
        <Form.Label>Date of Birth </Form.Label>
        <Form.Control type="date" name="dob" id="dob" placeholder="Enter Date of Birth" value={horses.dob} onChange={onChange} />
      </Form.Group>

      <br />
        <Form.Group>
        <Form.Label>Age Verified</Form.Label>
        <Col ls={12}>
        <Col ls={6}>
        <input type="radio" name="age_verified" id="age_verified" value="1" checked={horses.age_verified =='1'}   onChange={onChange} /><span>Yes</span>
        </Col>
        <Col ls={6}>
        <input type="radio" name="age_verified"  id="age_verified" value="0" checked={horses.age_verified =='0'}   onChange={onChange} /><span>No</span>
        </Col>
        </Col>
      </Form.Group>

      <br />
     

      <Form.Group>
      <Form.Label>Ushja Registered</Form.Label>
      <Col ls={12}>
      <Col ls={6}>
      <Form.Check type="checkbox" name="ushja_registered" id="ushja_registered" value="1"  checked={horses.ushja_registered =='1'}   onChange={onChange} label=" Yes"/>
      </Col>
      <Col ls={6}>
      <Form.Check type="checkbox" name="ushja_registered" id="ushja_registered" value="0"  checked={horses.ushja_registered =='0'}   onChange={onChange} label=" No"/>
      </Col>
      </Col> 
    </Form.Group>

    <br />

    
    <Form.Group>
    <Form.Label>Colour</Form.Label>
    <Form.Control as="select" name="color" >
      <option  selected={horses.color ==='Red'}  value="Red" >Red</option> 
      <option  selected={horses.color ==='Green'}  value="Green">Green</option>
    
    </Form.Control>
  </Form.Group>
  <br />


          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
        </Container>
      </Jumbotron>
    </div>
  );
}

export default withRouter(Edit);
