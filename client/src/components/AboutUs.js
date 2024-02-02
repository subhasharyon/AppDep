import React from "react";
import TopNavigation from "./TopNavigation";
import Footer from './Footer'

function AboutUs() {
  return (
    <div>
      <TopNavigation />
      <div>
        <h3 className="aboutUs">About Us</h3>
      </div>
      <div>
        <p className="aboutPara">
          About Us Welcome to SmartStore, your premier destination for
          cutting-edge smart devices designed to enhance your lifestyle and
          elevate your home. At SmartStore, we curate a diverse selection of
          smart products, including smart ACs, smart speakers, smart bulbs,
          smart cookers, and a myriad of other innovative gadgets that make your
          everyday life easier and more efficient
        </p>

        <p className="aboutPara">
          About Us Welcome to SmartStore, your premier destination for
          cutting-edge smart devices designed to enhance your lifestyle and
          elevate your home. At SmartStore, we curate a diverse selection of
          smart products, including smart ACs, smart speakers, smart bulbs,
          smart cookers, and a myriad of other innovative gadgets that make your
          everyday life easier and more efficient. Our passion for technology
          and commitment to quality drive everything we do. We understand the
          importance of staying connected in today's fast-paced world, which is
          why we handpick only the most advanced and reliable smart devices for
          our customers.
        </p>
        <h5 style={{position:'relative', top:'100px',left:'10px'}}>Why Choose SmartStore?</h5>
        <ul>
          <li className='aboutlist'>
            Unparalleled Selection: 
              <span className='aboutSpan'>
              Explore our extensive collection of smart devices, carefully
              chosen to meet your diverse needs and preferences. From
              energy-efficient smart bulbs to state-of-the-art smart speakers,
              we have everything you need to transform your home into a smart
              haven.
            </span>
          </li>
          <li className='aboutlist'>
            Quality Assurance:
            <span className='aboutSpan'>
              We believe in delivering products that exceed expectations. Each
              item in our inventory undergoes rigorous testing to ensure
              top-notch quality, reliability, and performance.
            </span>
          </li>
          <li className='aboutlist'>
            Expert Guidance:
            <span className='aboutSpan'>
              Not sure which smart device is right for you? Our knowledgeable
              team of experts is here to help. Whether you have questions about
              compatibility, features, or installation, we're dedicated to
              providing personalized assistance every step of the way.
            </span>
          </li>
          <li className='aboutlist'>
            Customer Satisfaction: 
             <span className='aboutSpan'>
              Your satisfaction is our top priority. We strive to deliver an
              exceptional shopping experience from start to finish. From
              seamless online ordering to prompt delivery and responsive
              customer support, we go above and beyond to ensure your complete
              satisfaction.
            </span>
          </li>
        </ul>
        <div>
          <h6 style={{position:'relative', top:'100px',left:'10px',fontSize:'larger'}}>Discover the Possibilities-</h6>
          <p className="aboutPara">
            Experience the convenience and sophistication of smart living with
            SmartStore. Explore our collection today and discover the endless
            possibilities that smart technology has to offer. Upgrade your home,
            simplify your routine, and embrace the future with SmartStore –
            where innovation meets excellence.
          </p>
        </div>
      </div>
      <h6 style={{position:'relative', top:'100px',left:'10px',fontSize:'larger'}}>
        Join us on our journey to redefine modern living. Welcome to SmartStore
        – where intelligence meets convenience.
      </h6>
      <Footer/>
    </div> 
  );
}

export default AboutUs;
