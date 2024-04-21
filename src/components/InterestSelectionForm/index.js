import {useState,useContext} from 'react';
import { TiTick } from "react-icons/ti";
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

import './index.css';
import { notificationContext } from '../../context/notification';

const InterestSelectionForm=()=>{
    const [checkedItems,setCheckedItems]=useState({});
    const navigate = useNavigate();
    const {setNotificationMessage,setVisibleNotification,setShowLoader}=useContext(notificationContext);

    const itemChecked=({item})=>{
      console.log(item);

        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [item]: !prevCheckedItems[item], 
          }));
          console.log(checkedItems); 
    }
    const sendMail=(event)=>{
      event.preventDefault();
      console.log("send mailssssssssssssssssssssssss");
      setShowLoader(true);
      const subject="Dribble :Verify your email address";
      const message=`Thanks for signing up for Dribble, the world's leading platform for showcasing and discovering creative work. 
      We're excited to have you join our community of designers and artists!To activate your account and start exploring Dribble, 
      please click the verification link below: \n google.com`;
      const token=Cookies.get('jwt_token');

      const decodedToken = jwtDecode(token);
      const usersEmail = decodedToken.email; 
      const templateParams = {
        "to_email":usersEmail,
        "to_name":decodedToken.username,
        "from_subject":subject,
        "from_message":message,
        
    }
    emailjs.init({
        publicKey: "13f5qjr7AHBPJ8QmU",
    });
    console.log(templateParams);
    emailjs.send('service_arhj6ma', 'template_bythk3s', templateParams).then( //'SERVICE_ID', 'TEMPLATE_ID'
        function (response) {
        console.log('SUCCESS!', response.status, response.text);
        setVisibleNotification(true);
        setNotificationMessage({type:'success',message:'Check your inbox for email verification'});
        setShowLoader(false);
        navigate('/email-verify');
        },
        function (err) {
        console.log('FAILED...', err);
        setVisibleNotification(true);
        setShowLoader(false);
        setNotificationMessage({type:'failure',message:'email verification failed'});
        },
    );
    }

    return(
        <div className="isf-container">
      <div className="form-wrapper">
        <div className="dribbble-logo">
          <img src="dribble-images.png" className="dribbleImage" alt="Dribbble logo"/>
          <div className='left-page' onClick={()=>{navigate(-1)}}><MdOutlineKeyboardArrowLeft /></div>
        </div>
        <h1 className="form-title">What brings you to Dribbble?</h1>
        <p className="form-description">Select the options that best describe you. Don't worry, you can explore other options later.</p>
        <form className="interest-signup-form" onSubmit={sendMail}>
            <div className="interests">
                <div className={`form-group1 ${checkedItems.item1 ? 'clicked' : ''}`} onClick={()=>{itemChecked({item:'item1'})}}>
                    <img alt="" className="interest-image" src="interest1.jpg" />
                    {/* <input type="checkbox" id="designer" className={`interest-check ${checkedItems.item1 ? 'interest-checked' : ''}`} name="designer" value="designer" /> */}
                    <div id="hire-designer" className={`interest-check2 ${checkedItems.item1 ? 'interest-checked' : ''}`} name="hire-designer" value="hire-designer" >
                      {checkedItems.item1 && <TiTick style={{color:'white'}} />}
                    </div>
                    <label htmlFor="designer">I'm a designer looking to share my work</label>
                </div>
                <div className={`form-group2 ${checkedItems.item2 ? 'clicked' : ''}`} onClick={()=>{itemChecked({item:'item2'})}}>
                    <img alt="" className="interest-image" src="interest2.jpg" />
                    <div id="hire-designer" className={`interest-check2 ${checkedItems.item2 ? 'interest-checked' : ''}`} name="hire-designer" value="hire-designer" >
                      {checkedItems.item2 && <TiTick style={{color:'white'}} />}
                    </div>
                    <label htmlFor="hire-designer">I'm looking to hire a designer</label>
                </div>
                <div className={`form-group3 ${checkedItems.item3 ? 'clicked' : ''}`} onClick={()=>{itemChecked({item:'item3'})}}>
                    <img alt="" className="interest-image" src="interest3.jpg" />
                    <div id="hire-designer" className={`interest-check2 ${checkedItems.item3 ? 'interest-checked' : ''}`} name="hire-designer" value="hire-designer" >
                      {checkedItems.item3 && <TiTick style={{color:'white'}} />}
                    </div>
                    <label htmlFor="design-inspiration">I'm looking for design inspiration</label>
                </div>
            </div>
            {<p className="" style={{fontWeight:'500'}}>Anything else? you can select multiple</p>}
          <button type="submit" className="finish-btn">Finish</button>
          {<p className="return-text" style={{color:"#999896",cursor:'pointer'}} onClick={()=>{navigate(-1)}}>or Press Return</p>}
        </form>
      </div>
    </div>
    )
}

export default InterestSelectionForm;


