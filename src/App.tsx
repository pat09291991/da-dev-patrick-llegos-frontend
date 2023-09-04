import { Container } from "reactstrap";
import './App.css'
import { Flip, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tasks } from './Tasks/Tasks';


function App() {

  return (
    <>
      <ToastContainer
        position="top-center"
        transition={Flip}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="colored"
      />
      <Container>
        <Tasks />
      </Container>
    </>
  )
}

export default App
