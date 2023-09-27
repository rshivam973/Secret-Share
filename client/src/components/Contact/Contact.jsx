import React from 'react'
import Navi from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Contact = () => {
  return (
    <div>
      <Navi/>
      <div style={{display:"flex",flexDirection:"column",height:"80vh"}}>
      Contact
      </div>
      <Footer/>

    </div>
  )
}

export default Contact;