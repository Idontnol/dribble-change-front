import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { useEffect,useContext } from 'react';
import { notificationContext } from '../../context/notification';
import { base_url } from '../../utils';

const Verification=()=>{
    const navigate = useNavigate();
    const {setNotificationMessage,setVisibleNotification,setShowLoader}=useContext(notificationContext);
    useEffect(()=>{
    
        const verifyUser=async()=>{
            const token=Cookies.get('jwt_token');
            setShowLoader(true);

            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;
            const options={
                method:'GET',
            }
            console.log(userId);
            const response= await fetch(base_url+`/users/verification/${userId}`,options);
            const result =await response.json();
            console.log(result,"result");
            if(result.msg==='success')
            {
                setShowLoader(false);
                navigate('/home');
            }
            else{
                setShowLoader(false);
                console.log('Error');
                setVisibleNotification(true);
                setNotificationMessage('errror in verification');
            }
        }
        verifyUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return(
        <div className="">
            verificationStatus
        </div>
    )
}

export default Verification;