import {useState,useEffect,useContext} from 'react';
import { FaExclamationTriangle } from 'react-icons/fa'; 
import { HiMiniEye } from "react-icons/hi2";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { HiEyeSlash } from "react-icons/hi2";
import { notificationContext } from '../../context/notification';
import './index.css';
import { base_url } from '../../utils';

const SignUpForm=()=>{

    const navigate = useNavigate();
    const [error,setError]=useState("");
    const [name,setName]=useState("");
    const [username,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [errorLocate,setErrorLocate]=useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [showPassword,setShowPassword]=useState(false);
    const {setNotificationMessage,setVisibleNotification,setShowLoader}=useContext(notificationContext);

    const validateEmail=(email)=> {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
    const handleSubmit = async (event) => {
        event.preventDefault();
        setShowLoader(true);
        const checkUserExists = await fetch(base_url+'/users/exists',{
            method:"POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({newUserName:username})
        });
        const {userExists}=await checkUserExists.json();
        if(name.length<=3){
            setShowLoader(false);
            setError("length of the name should be atleast 4");
            setErrorLocate("name");
        }
        else if(username.length===0){
            setShowLoader(false);
            setError("username field is empty");
                setErrorLocate("username");
        }
        else if(userExists){
            setShowLoader(false);
            setError("That username is already taken. Please choose a different one.");
            setErrorLocate("username");
        }
        else if(! validateEmail(email) || email.length===0){
            setShowLoader(false);
                setError("Not a valid Email");
                setErrorLocate("email");
            }
        else if(password.length<6 || password.length===0){
            setShowLoader(false);
            setError("Password must be at least 6 characters");
            setErrorLocate("password");
        }
        else if(! isChecked){
            setShowLoader(false);
            setError("Please accept the terms and conditions (tick the checkbox)");
        }
        else{
            setShowLoader(true);
        const userDetails = {
          username,name,email,
          password,
        }
        // console.log('user detail sare',userDetails);
        const url = base_url+'/user/register'
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userDetails),
        }
        const response = await fetch(url, options);
        // console.log(response,"response");
        
        const data = await response.json()
        if (response.ok === true) {
        //   this.onSubmitSuccess(data.jwt_token)
        setVisibleNotification(true);
        setNotificationMessage({type:"success",message:"user created successfully"});
        setShowLoader(false);
        console.log(data);
        Cookies.set("jwt_token",data.jwt_token,{expires:10});
        
        navigate('/create-profile');
        } else {
            setError(data.msg);
            setShowLoader(false);
        } 
    }
      }
      useEffect(() => {
        if (error) {
          const timeoutId = setTimeout(() => {
            setError("");
            setErrorLocate("");
          }, 5000); 
    
          return () => clearTimeout(timeoutId);
        }
      }, [error,errorLocate]);

    return(
    <div className="sign-up-container">
        <div className="sign-up-left">
            <img src="cover.jpg" alt="" className="sign-up-banner" />
        </div>
        <div className="sign-up-right">
            <div className='dribble-small'>
                <img src="dribble-images.png" alt="nav-dribble" className="small-icons" />
            </div>
            <div className='notify-user'>
                <span className=''>Already a member ? <span className='highlight'> Sign In</span></span>
            </div>
            <form onSubmit={handleSubmit} className='sign-up-right-inner'>
                <h2 className="">Sign up to Dribble</h2>
                {error && <p className='login-error'>{error}</p> }
                <div className='nameContainer'>
                    <div className=''>
                        <label className=''>{errorLocate==="name" &&<FaExclamationTriangle style={{ color: '#ed6242', marginRight: '5px' }} />}
                        Name</label>
                        <input type="text" placeholder="name" value={name} onChange={(e)=>{setName(e.target.value)}} />
                    </div>
                    <div className=''>
                        <label className=''>{errorLocate==="username" &&<FaExclamationTriangle style={{ color: '#ed6242', marginRight: '5px' }} />}
                        Username</label>
                        <input type="text" placeholder="username" value={username} onChange={(e)=>{setUserName(e.target.value)}}  />
                    </div>
                </div>
                <span style={{display:'flex',flexDirection:"column",alignItems:"flex-start"}}>
                    <label className=''>{errorLocate==="email" &&<FaExclamationTriangle style={{ color: '#ed6242', marginRight: '5px' }} />}
                        Email</label>
                    <input type="" placeholder="email" className='input-large' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                </span>
                <span style={{display:'flex',flexDirection:"column",alignItems:"flex-start"}} className='pass-top'>
                    <label className=''>{errorLocate==="password" &&<FaExclamationTriangle style={{ color: '#ed6242', marginRight: '5px' }} />}
                        Password</label>
                    <span className='password-container' >
                        <input type={showPassword? 'text' : 'password'} className='' placeholder="6+ characters" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                        <button type="button" onClick={()=>{setShowPassword(p=>!p)}} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                            {showPassword?<HiEyeSlash />: <HiMiniEye />}
                        </button>
                    </span>
                   
                </span>
                <div className='checking'>
                    <input type="checkbox" className='checkClass' onChange={(e)=>{setIsChecked(e.target.checked)}} checked={isChecked} />
                    <label className=''>Creating an account means you're okay with our <span className='highlight'>Terms of Service, Privacy Policy,</span> and our default <span className='highlight'>Notification Settings.</span></label>
                </div>
                <button className='createBtn' type="submit">Create Account</button>
                <p className='some'>This site is protected by reCAPTCHA and the Google<span className='highlight'>Privacy Policy </span> and <span className='highlight'>Terms of Service </span>apply.
                </p>
            </form>
        </div>

    </div>
        )
}

export default SignUpForm;
