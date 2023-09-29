
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './component/Auth/Register/Signup';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import Layout from './component/Layout/HomeLayout/Layout';
import Login from './component/Auth/Login/Login';
import ForgotPassword from './component/Auth/forgotPassword/ForgotPassword';
import ResetPassword from './component/Auth/forgotPassword/ResetPassword';
import FullpostView from './pages/FullpostView';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Chats from './pages/Chats';
import Posts from './pages/Posts';
import { ThemeProvider, createTheme } from '@mui/material/styles'

function App() {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col min-h-[100vh] bg-[#f2f5f7]">
        <ToastContainer />
        <Router>
          <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/forgotPassword' element={<ForgotPassword />}></Route>
            <Route path='/password/reset/:resetToken' element={<ResetPassword />}></Route>
            <Route element={<Layout />}>
              <Route index path='/home' element={
                <ProtectedRoute><Home /></ProtectedRoute>
              } />
              <Route path='/chats' element={
                <ProtectedRoute><Chats /></ProtectedRoute>
              } />
              <Route path='/profile/:userId' element={
                <ProtectedRoute><Profile /></ProtectedRoute>
              } />
              <Route path='/view/singlepost/:postId' element={
                <ProtectedRoute><FullpostView /></ProtectedRoute>
              } />
              <Route path='/posts' element={
                <ProtectedRoute><Posts /></ProtectedRoute>
              } />
            </Route>
          </Routes>
        </Router>
      </div >
    </ThemeProvider>
  );
}

export default App;
