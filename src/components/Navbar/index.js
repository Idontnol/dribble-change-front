import { PiSuitcaseSimpleFill } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import './index.css';
import { IoMdMenu } from "react-icons/io";
import { base_url } from "../../utils";

const Navbar=()=>{
    const [profileUrl,setProfileUrl]=useState('');
    const [showMenu,setShowMenu]=useState(false);
    const navigate=useNavigate();

    useEffect(()=>{
        const token=Cookies.get('jwt_token');
        const decodedToken = jwtDecode(token);

        const fetchUserDetails=async()=>{
            
            const currentUserId= decodedToken.userId;
            const url=base_url+"/users/profile/"+currentUserId;
            // const url="http://localhost:3001/users/profile/"+currentUserId;
            console.log(url,"baseurl-added");
            const options={
                method:"GET",
                headers:{
                    Authotization:"Bearer "+token,
                },
            }
            const response=await fetch(url,options,{
                mode: 'no-cors'
              });
            const userDetails= await response.json();
            console.log(userDetails,"here navbar");
            setProfileUrl(userDetails?.profileUrl);
        }
        fetchUserDetails();
    })
    const menubar=()=>{
        setShowMenu(s=>!s);
    }

    return(
        <div className="navbar-container">
            <ul className="navbar-left">
                <li className='' onClick={()=>{navigate('/home')}}><img src="dribbble-nav.jpg" alt="nav-dribble" className="navbar-dribble-icon" /></li>
                <li className=''>Inspiration</li>
                <li className=''>Find Work</li>
                <li className=''>Learn Design</li>
                <li className=''>GoPro</li>
                <li className=''>Hire Designers</li>
            </ul>
            {showMenu && <ul className="menuCard ">
                <li className=''>Inspiration</li>
                <li className=''>Find Work</li>
                <li className=''>Learn Design</li>
                <li className=''>GoPro</li>
                <li className=''>Hire Designers</li>
            </ul>}
            <span className="navbar-left-small">
                <IoMdMenu  style={{height:"31px",width:"36px"}} className="menu-icon" onClick={menubar} />
                <li className=''><img src="dribbble-nav.jpg" alt="nav-dribble" className="navbar-dribble-icon smea" /></li>
            </span>
            <div className='navbar-right'>
                <div className="search-container">
                    <IoSearch style={{color:'#c9c5c9'}} />
                    <input type="search" placeholder="search" className='search-input' />
                </div>
                <PiSuitcaseSimpleFill />
                <img src={profileUrl} alt="navbar-profile" style={{cursor:"pointer"}} onClick={()=>{navigate('/create-profile')}} className='navbar-profile'/>
                <button className="upload-btn">Upload</button>
            </div>
        </div>
    )
}

export default Navbar;