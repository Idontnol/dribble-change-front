import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import {useState,useEffect} from 'react';
import './index.css';
import Navbar from '../Navbar';
import Footer from '../Footer';

const EmailVerification=()=>{
    const [userEmail,setUserEmail]=useState('');
  
    useEffect(()=>{
        const token=Cookies.get('jwt_token');
        console.log(token,"email verification");
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        const setEmail=()=>{
            if (token) {
                const usersEmail = decodedToken.email; 
                console.log("Current user email:", userEmail);
                setUserEmail(usersEmail);
            } else {
                console.log("No JWT token found in cookies");
            }
        }
        setEmail();
        
    });
    

    return(
        <>
        <Navbar/>
        <div className="email-verification-container">
            <h1 className="header">Please verify your email...</h1>
            <img src="verify-email.jpg" alt="" className='verify-email-image'/>
                <div className="message"> Please verify your email address.
                We've sent a confirmation email to:<br/>
                <span className="email">{userEmail}</span>
                </div>
                <div className="">
                Click the confirmation link in that email to begin using Dribbble.
                </div>
                <div className="trouble">
                <p className="spam-text">Didn't receive the email?
                Check your Spam folder, it may have been caught by a filter.
                If you still don't see it, you can <span className='email-highlight'>resend the confirmation email.</span> </p>
                </div>
                <div className="change-email">
                Wrong email address? <span className='email-highlight'>Change it.</span>
                </div>
        </div>
        <Footer/>
        </>
    )
}

export default EmailVerification;