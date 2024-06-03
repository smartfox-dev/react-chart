import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css'


import store from './store';
import CreateToastr from './utils/toastr';
import NormalRoute from './components/Route/NormalRoute';
import Home from './components/Home';

import socket from './utils/socket';
import CreatePDF from './components/PDF/CreatePDF';

socket.connect();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route index path='/' element={<NormalRoute><Home /></NormalRoute>} />
          <Route index path='/pdf' element={<CreatePDF />}/>
        </Routes>
        <CreateToastr />
      </Router>
    </Provider>
  );
}

export default App;