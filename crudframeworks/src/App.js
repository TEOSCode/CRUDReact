import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';

function App() {
  const baseUrl = 'http://localhost/crudreact/apiframeworks/';
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [frameworkSeleccionado, setframeworkSeleccionado] = useState({
    id: '',
    nombre: '',
    lanzamiento: '',
    desarrollador: '',
  });
  const handleChange = (e) => {
    const {name, value} = e.target;
    setframeworkSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(frameworkSeleccionado);
  };
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const peticionPost = async () => {
    var f = new FormData();
    f.append('nombre', frameworkSeleccionado.nombre);
    f.append('lanzamiento', frameworkSeleccionado.lanzamiento);
    f.append('desarrollador', frameworkSeleccionado.desarrollador);
    f.append('METHOD', 'POST');
    await axios.post(baseUrl, f).then((response) => {
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    });
  };
  const peticionGet = async () => {
    await axios.get(baseUrl).then((response) => {
      setData(response.data);
    });
  };

  useEffect(() => {
    peticionGet();
  }, []);

  return (
    <div style={{textAlign: 'center'}}>
      <button
        className="btn btn-primary"
        onClick={() => abrirCerrarModalInsertar()}
      >
        Insertar
      </button>
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

      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Framework</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nombre"
              onChange={handleChange}
            />
            <br />
            <label>Lanzamiento: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="lanzamiento"
              onChange={handleChange}
            />
            <br />
            <label>Desarrollador: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="desarrollador"
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticionPost()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => abrirCerrarModalInsertar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
