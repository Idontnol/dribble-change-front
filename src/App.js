import SignUpForm from './components/SignUpForm/index';
import './App.css';
import InterestSelectionForm from './components/InterestSelectionForm';
import CreateProfileForm from './components/CreateProfileForm';
import EmailVerification from './components/EmailVerification';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useState} from 'react';
import NotificationBar from './components/Notification';
import { notificationContext } from './context/notification';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Loader from './components/Loader';
import Verification from './components/Verification';


function App() {
  const [notificationMessage,setNotificationMessage]=useState({});
  const [visibleNotification,setVisibleNotification] = useState(false);
  const [showLoader,setShowLoader]=useState(false);
  // console.log(notificationMesssage,"from APP.JS");
  // console.log(process.env.frontendBaseUrl,"proceeenvbaseurl");
  
  return (
    <div className="App">

        <BrowserRouter>
          <notificationContext.Provider value={{setNotificationMessage,notificationMessage,visibleNotification,setVisibleNotification,setShowLoader}}>
            <Routes >
              <Route exact path="/signup" element={<SignUpForm/>} />
              <Route exact path="/create-profile" element={<CreateProfileForm/>} />
              <Route exact path="/interests" element={<InterestSelectionForm/>} />
              <Route exact path="/email-verify" element={<EmailVerification />} />
              <Route exact path="/" element={<SignUpForm/>} />
               <Route exact path="/home" element={<Home/>} /> 
               <Route exact path="/verification" element={<Verification/>}/>
              <Route path="*" element={<NotFound/>} />
            </Routes>             
            <NotificationBar />
            {showLoader&&<div className='black-screen'>h</div>}
            {showLoader&&<span style={{position: 'absolute',left:'47%',top:'35%'}} className='loader-container'><Loader  /> </span>}
            </notificationContext.Provider>
        </BrowserRouter>

    </div>
  );

}

export default App;
