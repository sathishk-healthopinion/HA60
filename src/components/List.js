import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { AuthContext } from "../App";


export const HorseContext = React.createContext();

function List(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  const { state: authState } = React.useContext(AuthContext);
  const apiUrl = "https://dev.api.staller.show/v1/horses";

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(apiUrl, {
        headers: {
          Authorization: `Bearer ${authState.token}`
        }
      });
      console.log(result.data);
      setData(result.data.data);
      setShowLoading(false);
    };

    fetchData();
  }, [authState.token]);

  const showDetail = (id) => {
    props.history.push({
      pathname: '/show/' + id
    });
  }

  const toggleAddSong = () => {
    props.history.push({
      pathname: '/create'
    });
  }

  return (
    
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }
      <button className="toggle-button" onClick={toggleAddSong}>ADD HORSES</button>
      
      <ListGroup>
      Click Here to view Horses List:
        {data.map((item, idx) => (
          <ListGroup.Item key={idx} action onClick={() => {showDetail(item.id) }}>{item.horse_name}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default List;
