import { FaDribbble, FaTwitter, FaInstagram, FaFacebook, FaPinterest } from 'react-icons/fa';

import './index.css';

const Footer=()=>{
    const designers=['Go Pro!','Explore Design work','Design blog','Overtime Podcast','Playoffs','Weekly Warm-up','Refer a friend','code of conduct'];
    const hireDesigners=['Post a job opening','Post a freelance project','Search for Designers'];
    const company=['About','Careers','Support','Media Kit','Testimonials','API','Terms of Service','Privacy Policy','Cookie Policy']
    const directories=['Design jobs','Designers for hire','Tags','Freelance designers for hire','Places']
    const designResources=['Freelancing','Design Portfolio','Design Education','Design Hiring']

    return(
        <div className='footer-main-container'>
        <div className="footer-container">
            <div className='footer-start'>
                <img src="dribble-images.png" className='dribbleImg' alt="dribbleImg" />    
                <p className=''>Dribbble is the worlds leading community for creatives to share, grow and get hired.</p>
                <div className='social-media-links'>
                    <a href="https://dribbble.com/" target="_blank" rel="noopener noreferrer">
                        <FaDribbble className='media-icon' />
                    </a>
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className='media-icon' />
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className='media-icon' />
                    </a>
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className='media-icon' />
                    </a>
                    <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer">
                        <FaPinterest className='media-icon' />
                    </a>
                </div>

            </div>
            <div className="footer1">
                <h3>For Designers</h3>
                {designers.map((val,ind)=>(
                    <p className>
                        {val}
                    </p>
                )
                )}
            </div >
            <div className="footer2">
                <h3>Hore Designers</h3>
                {hireDesigners.map((val,ind)=>(
                    <p className>
                        {val}
                    </p>
                )
                )}
                <h3 className='' style={{margin:'10px'}}>Brands</h3>
                <p>Advertise with us</p>
            </div>
            <div className="footer3">
            <h3>Company</h3>
            {company.map((val,ind)=>(
                <p className>
                    {val}
                </p>
            )
            )}
            
            </div>
            <div className="footer4">
            <h3>Directories</h3>
            {directories.map((val,ind)=>(
                <p className>
                    {val}
                </p>
            )
            )}
            </div>
            <div className="footer5 add">
                <h3 style={{fontWeight:'700'}}>Design Resources</h3>
                {designResources.map((val,ind)=>(
                    <p className>
                        {val}
                    </p>
                )
                )}
            </div>
        </div>
      <hr style={{height:'2px',width:'100vw'}} />
        <div className="footer-bottom">
        
            <p>© 2023 Dribbble. All rights reserved.</p>
            <span className="">
                <p className=""> <span className="footer-highlight">20,501,083 </span>shots dribbbled</p>
                <img src="dribble-major-icon.png" alt="" className='dribble-icon'/>
            </span>
            
        </div>
        </div>
    )
}

export default Footer;