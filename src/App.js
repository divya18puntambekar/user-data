// import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import UserForm from './components/AddUser';
import UserData from './components/UserData';
import UpdateUser from './components/UpdateUser';
import ViewUser from './components/ViewUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create" element={<UserForm />}></Route>
        <Route path="/" element={<UserData />}></Route>
        <Route path="/user/edit/:userid" element={<UpdateUser />}></Route>
        <Route path="/user/view/:userid" element={<ViewUser />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
