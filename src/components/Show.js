import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import { AuthContext } from "../App";

function Show(props) {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const { state: authState } = React.useContext(AuthContext);
  const apiUrl = "https://dev.api.staller.show/v1/horses/" + props.match.params.id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl, {
        headers: {
          Authorization: `Bearer ${authState.token}`
        }
      });
      console.log(result);
      setData(result.data.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editHorses = (id) => {
    props.history.push({
      pathname: '/edit/' + id
    });
  };

  const deleteHorses = (id) => {
    setShowLoading(true);
    const Horses = { horse_name: data.horse_name, horse_number: data.horse_number, age_verified: parseInt(data.age_verified) , ushja_registered: parseInt(data.ushja_registered), dob: data.dob, color: data.color };
    axios.delete(apiUrl, Horses,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authState.token}`,
      }
    })
      .then((result) => {
        setShowLoading(false);
        props.history.push({
          pathname: '/list'
        });
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
      <Jumbotron>
        <h1>Horse Name : {data.horse_name}</h1>
        <p>Horse Number : {data.horse_number}</p>
        <h2>Age Verified : {data.age_verified=='1'? 'Yes' :'No'}</h2>
        <h2>Date of Birth : {data.dob}</h2>
        <h2>color: {data.color}</h2>
        <h2>Ushja Registered : {data.ushja_registered=='1'? 'Yes' :'No'}</h2>

        
        <p>
          <Button type="button" variant="primary" onClick={() => { editHorses(data.id) }}>Edit</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteHorses(data.id) }}>Delete</Button>
        </p>
      </Jumbotron>
    </div>
  );
}

export default withRouter(Show);
