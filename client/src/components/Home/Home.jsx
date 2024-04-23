import React, {useContext, useEffect} from "react";
import Navi from "../Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import "./Home.css";
import img from './bg-image.png';
import { AuthContext } from "../Context/AuthContext";
import Dashboard from "../Dashboard/Dashboard";



const Home = () => {

  const {isLoggedIn} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(()=>{
    if(isLoggedIn === true) navigate("/dashboard");

  })

  return (
    <>
      <Navi />
      {/* <div className="row">
        <div className="column first">
          <img src={img} alt="Secret Share"/>
        </div>

        <div className="column second">
            Confess, Share, write for your friends or loved ones secretly.
          <div className="landing-buttons">
            <Link to={'/login'} className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-green-600 border-2 border-green-600 rounded-full hover:text-white group hover:bg-gray-50">
              <span className="absolute left-0 block w-full h-0 transition-all bg-green-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease" />
              <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
              <span className="relative">Get Started</span>
            </Link>
          </div>
        </div>
      </div> */}
      <section className="main-scrn text-gray-600 body-font" style={{ height: '100vh', marginBottom: "20px", padding: 0 }}>
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center" style={{height:"100vh"}}>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
      <img
        className="object-cover object-center rounded"
        alt="hero"
        src={img}
      />
    </div>
    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <h1 className="title-font sm:text-4xl text-4xl mb-4 font-bold text-gray-900" style={{fontSize:'3.25rem',lineHeight:"3.5rem"}}>
        Confess, Share or Write for your
        <br className="hidden lg:inline-block" />
        <span className=" text-red-600"> Loved Ones</span> Anonymously.
      </h1>
      
      <div className="flex justify-center items-center">
      <div className="landing-buttons">
            <Link to={'/login'} className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-green-600 border-2 border-green-600 rounded-full hover:text-white group hover:bg-gray-50">
              <span className="absolute left-0 block w-full h-0 transition-all bg-green-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease" />
              <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
              <span className="relative">Get Started</span>
            </Link>
          </div>
      </div>
    </div>
  </div>
</section>

      <Footer />
    </>
  );
};

export default Home;
