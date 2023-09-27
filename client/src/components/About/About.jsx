import React from 'react'
import Navi from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const About = () => {
  return (
    <div >
      <Navi/>
      <div style={{display:"flex",flexDirection:"column",height:"80vh"}}>
      About
      </div>
      <Footer/>
    </div>
  )
}

export default About;