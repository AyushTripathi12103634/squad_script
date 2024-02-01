import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import './About.css';
import { BiLogoLinkedin } from "react-icons/bi";
import { BiLogoGithub } from "react-icons/bi";
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import About1 from '../images/About1.png';
import About2 from '../images/About2.png';
function AboutUs() {
  return (
    <main className='about-main-section'>
      <Navbar />
      <div className='about-main-div'>
        <div className='about-main-left my-5 mx-3'>
          <div className='about-card'>
            <div className='about-card-image'>
              <img src={About1} alt='About1'></img>
            </div>
            <div className='about-card-name my-3'>
              <h1>Ayush Tripathi</h1>
            </div>
            <div className='about-card-profile my-3'>
              <h6>Full Stack Developer</h6>
            </div>
            <IconContext.Provider value={{color:"black"}}>
              <div className='about-card-icons'>
                <Link to="https://www.linkedin.com/in/ayush-tripathi-039a20220" target='_blank'><BiLogoLinkedin className='about-logo'></BiLogoLinkedin></Link>
                <Link to="https://www.github.com/ayushtripathi12103634" target='_blank'><BiLogoGithub className='about-logo'></BiLogoGithub></Link>
              </div>
            </IconContext.Provider>
          </div>
        </div>
        <div className='about-main-right my-5 mx-3'>
          <div className='about-card'>
            <div className='about-card-image'>
              <img src={About2} alt='About1'></img>
            </div>
            <div className='about-card-name my-3'>
              <h1>Mohak Tiwari</h1>
            </div>
            <div className='about-card-profile my-3'>
              <h6>Full Stack Developer</h6>
            </div>
            <IconContext.Provider value={{color:"black"}}>
              <div className='about-card-icons'>
                <Link to="https://www.linkedin.com/in/mohak-tiwari-b78198226/" target='_blank'><BiLogoLinkedin className='about-logo'></BiLogoLinkedin></Link>
                <Link to="https://www.github.com/mohak1301" target='_blank'><BiLogoGithub className='about-logo'></BiLogoGithub></Link>
              </div>
            </IconContext.Provider>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default AboutUs;