import React, { useState ,useContext} from 'react';

import './index.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import DefaultProfiles from '../defaultProfiles';
import { notificationContext } from '../../context/notification';
import { base_url } from '../../utils';



const CreateProfileForm = () => {
  const [avatar, setAvatar] = useState(""); 
  const [location, setLocation] = useState(''); 
  const [imageData,setImageData]=useState("");
  const navigate = useNavigate();
  const {setNotificationMessage,setVisibleNotification,setShowLoader}=useContext(notificationContext);
  const [defaultImage,setDefaultImage]=useState("");

  const [showProfiles,setShowProfiles]=useState(false);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    console.log(file);

    if (!file?.type.startsWith('image/')) {
      console.log("please insert a valid image file");
      setVisibleNotification(true);
      setNotificationMessage({type:"failure",message:"Please insert a valid image file."});
      return;
    }

    if(file?.size>=50*1024*1024){
        console.log("file is very large cannot upload (>50 mb)"); //here notify
        setVisibleNotification(true);
        setNotificationMessage({type:"failure",message:"file is very large cannot upload (>50 mb)"});
        return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setAvatar(reader.result); // Still set for preview
      const base64Data = reader.result.split(',')[1]; // Extract base64 data
      // Call a new function to send data to backend (explained below)
      setImageData(base64Data);
      // console.log(base64Data);
    };
  };

  const handleDefaultImage=(file)=>{
    const imageUrl = `https://res.cloudinary.com/dswjg0rjx/image/upload/v1712312269/dribbleUsers/${file}`; // Construct the full image URL
    console.log(imageUrl,"imageurl");
    setDefaultImage(imageUrl);
  }

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault(); 
    // console.log(imageData,"imagedata");
    if(location.length===0 || (imageData.length===0 && defaultImage.length===0)){
      console.log("image or location is empty");
      setVisibleNotification(true);
      setNotificationMessage({type:"failure",message:"image or location is empty"});
      return;
    }

    try {
      const jwtToken=Cookies.get('jwt_token');
      if(jwtToken ===undefined){
        console.log("no jwt token");
      return;
      }
      setShowLoader(true);
      console.log("jwt token",`Bearer ${jwtToken}`);

      if(defaultImage.length ===0){ //user chosen image
        
          // const url = 'http://localhost:3001/user/profile'; //  backend URL
          const url=base_url+"/user/profile"; //backend URL
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${jwtToken}`,
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({imageData,location})
          });
          console.log(response,"response from frontend");
          if (response.ok) {
            setShowLoader(false);
            console.log('Image data sent successfully!');
            navigate('/interests');
          } else {
            console.error('Error sending image data:', await response.text());
          }
      }

      else{ //default image
        // const url = 'http://localhost:3001/user/default-profile'; //  backend URL
        const url=base_url+"/user/default-profile"; //base url
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({defaultImage,location})
        });
        console.log(response,"response from frontend");
        if (response.ok) {
          setShowLoader(false);
          console.log('Image data sent successfully!');
          navigate('/interests');
        } else {
          console.error('Error sending image data:', await response.text());
        }
      }
      
    } catch (error) {
      console.error('Error:', error);
      setShowLoader(false);
    }

    console.log('Form submitted:', imageData, location);
  };

  return (
    <div className="create-profile-form">
        <div className="dribbble-logo">
          <img src="dribble-images.png" className="dribbleImage" alt="Dribbble logo"/>
        </div>
      <h1 className="form-title">Welcome! Let's create your profile</h1>
      <p className="form-description">
        Let others get to know you better! You can do these later.
      </p>
      <form onSubmit={handleSubmit} className="profile-form" enctype="multipart/form-data">
        <div className="avatar-section">
          <label htmlFor="avatar">
            <h3 className="avatar-label">Add an avatar</h3>
            {avatar ? (
              <img src={avatar} alt="Selected avatar" className="avatar-preview" />
            ) : defaultImage?(<img src={defaultImage} alt="selected avatar" className="avatar-preview"/>):(
              <img src="cameraback.jpg"  alt="choose" className="choose-image" />
            )}
          </label>
          <span className='avatar-section-details'>
            <input type="file" id="avatar" name="avatar" accept="image/*" className='custom-file-input' onChange={handleAvatarChange} />
            <p className="" style={{color:"#999896",cursor:'pointer'}} onClick={()=>{setShowProfiles(true)}}> {">"} or Choose one of our defaults</p>
          </span>
        </div>
        <div className="location-section">
            <label className="location-label">Add your location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={handleLocationChange}
              placeholder="Enter a location"
              className="location-input"
            />
        </div>
        <button type="submit"  className="nxt-btn">
          Next
        </button>
        {<p className="return-text" style={{color:"#999896",cursor:'pointer'}} onClick={()=>{navigate(-1)}}>or Press Return</p>}
      </form>
      {showProfiles&& <DefaultProfiles setShowProfiles={setShowProfiles} handleDefaultImage={handleDefaultImage} />}
    </div>

  );
};

export default CreateProfileForm;
