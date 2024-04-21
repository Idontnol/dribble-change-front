import './index.css';
import { RxCross2 } from "react-icons/rx";

const DefaultProfiles=({setShowProfiles,handleDefaultImage})=>{

    // const images=['girl1.jpg', 'girl2.jpg','girl3.jpg','girl4.jpg','boy1.jpg','boy2.jpg','boy3.jpg','boy4.jpg'];
    const imageUrls=[
        {name:'girl4.jpg',publicId:'obdawmtikeraefpkeira'},
        {name:'boy2.jpg',publicId:'mdhy3p1o9wrq2w6dtlit'},
        {name:'boy3.jpg',publicId:'mpryzldzgdkn9s6sogmr'},
        {name:'boy4.jpg',publicId:'zdali6cgfzrw8fz8e13g'},
        {name:'girl1.jpg',publicId:'dpkd0ftqwel6kqed8dlb'},
        {name:'girl2.jpg',publicId:'jyx633zukbyzpetqd2be'},
        {name:'girl3.jpg',publicId:'bwssnxbnhhhlrnxjm1vt'},
        {name:'boy1.jpg',publicId:'jowsw66qqfxny8b3kwhe'},
    ];  

    return(
        <div className='dpContainer'>

            <div className="defaultProfileContainer">
                <RxCross2 className='closer' style={{height:'26px',width:'26px',marginLeft:'80%',marginTop:'5%',cursor:'pointer'}} onClick={()=>{setShowProfiles(false)}} />
                <div className='profiles'>
                    {imageUrls.map((imag,inde)=>(
                    <img key={inde} 
                        src={`https://res.cloudinary.com/dswjg0rjx/image/upload/v1712312269/dribbleUsers/${imag.publicId}`} 
                        onClick={()=>{handleDefaultImage(imag.publicId);setShowProfiles(false);}} alt={imag.name} className='defaultImage'
                        />))}
                </div>
            </div>
        </div>
    )
}
export default DefaultProfiles;