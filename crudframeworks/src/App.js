import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';

function App() {
  const baseUrl = 'http://localhost/crudreact/apiframeworks/';
  const [data, setData] = useState([]);
  const peticionGet = async () => {
    await axios.get().then((response) => {
      setData(response.data);
    });
  };
  useEffect(() => {
    peticionGet();
  }, []);

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Lazamiento</th>
            <th>Desarrollador</th>
          </tr>
        </thead>
        <tbody>
          {data.map((framework) => (
            <tr key={framework.id}>
              <td>{framework.id}</td>
              <td>{framework.nombre}</td>
              <td>{framework.lanzamiento}</td>
              <td>{framework.desarrollador}</td>
              <td>
                <button className="btn btn-primary">Editar</button>
                <button className="btn btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
/*Ver que apsa con el git as */
export default App;
