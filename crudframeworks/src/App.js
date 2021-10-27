import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';

function App() {
  const baseUrl = 'http://localhost/crudreact/apiframeworks/';
  const [data, setData] = useState([]);
  const peticionGet = async () => {
    await axios.get().then((response) => {
      console.log(response.data);
    });
  };
  useEffect(() => {
    peticionGet();
  }, []);

  return <div></div>;
}
/*Ver que apsa con el git as */
export default App;
