import React from 'react'
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import './Landing.css';
import Gears from "../images/Gears.png";
import Octocat from "../images/Octocat.png";
import DevelopmentSkill from "../images/DevelopmentSkill.png";
import DashedCloud from "../images/DashedCloud.png";
import { Link } from 'react-router-dom';
import codergif from "../images/codergif.gif";

const Landing = () => {
  
  
  return (
   <>
   <Navbar  bgColor= "#040514"  color = "#4BC286"/>
   <div className="Landing-main-section">
    <div className='Landing-content1'>
    <div className="Landing-content1a">
      <p>Growing with collaborative <br/> Scripting</p> 
       
    <img src={Gears} alt='' />
    </div>
    
    <div className="Landing-content1b">
    <img src={codergif} alt=''/>
    </div>

    </div>
    
    <div className='Landing-content2'>
    <div className='Landing-content2a'>
      <h1>Unleash Innovation:<img src={DashedCloud} alt=''/></h1> 
      <p>Where Growth Meets Scripting in <span>Perfect Harmony...</span></p>
      </div>
      <div className='Landing-content2b'>
      <div className='Landing-content2bButton'>
      <Link to="/join" className="nav-links" >
      <button>Get Started</button>
      </Link>
        
        </div>
        <div className='Landing-content2bPhoto'>
    <img src={DevelopmentSkill} alt='' />
    </div>
      </div>
    </div>
</div>
   <Footer/>
   </>
  )
}

export default Landing
