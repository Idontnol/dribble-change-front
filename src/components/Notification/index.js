import React, { useEffect ,useContext} from 'react';
import { RxCross2 } from "react-icons/rx";
import './index.css';
import { notificationContext } from '../../context/notification';

const NotificationBar = () => {
  
  const {notificationMessage,visibleNotification,setVisibleNotification}=useContext(notificationContext);
  // const {type,message}=notificationMessage;
  const handleClose = () => {
    setVisibleNotification(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setVisibleNotification(false); // Unmount component after 6 seconds
    }, 5000); // Timeout in milliseconds (6 seconds here)

    return () =>clearTimeout(timeoutId); // Cleanup on unmount (return function executes during unmount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleNotification,notificationMessage]);


  return (
    <>
      {visibleNotification &&<div className={`notification-bar ${notificationMessage?.type==="success"?"successNotify":"failureNotify"}`}>
        <p className="">{notificationMessage?.message}</p>
        <span  onClick={handleClose}>
          <RxCross2 className="close-notification" style={{color:"white",height:'26px',width:'26px',marginLeft:'80%',marginTop:'5%',cursor:'pointer'}} />
        </span>
      </div>}
    </>
  );
};

export default NotificationBar;