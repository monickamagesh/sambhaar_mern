import React from "react";
import GooglePlay from "../assets/play-store-btn.png";
import ApplePlay from "../assets/app-store-btn.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br  from-gray-50 to-gray-100 text-black py-8 md:py-12 mx-auto">
      <div className="max-w-6xl mx-auto sm:px-16 md:px-12 lg:px-4 grid gap-6 lg:grid-cols-5 sm:grid-cols-2 grid-cols-1">
        
        {/* Contact Us Section */}
        <div className="text-center sm:text-left">
          <h4 className="text-lg md:text-xl  font-bold mb-2 md:mb-4">Contact Us</h4>
          
          <div className="space-y-2">
          <p className="text-sm"><i className="ri-map-pin-fill mr-2 ri-lg text-primary"></i>India | Qatar | UAE</p>
          <p className="text-sm"><i className="ri-mail-open-fill mr-2 ri-lg text-primary"></i>support@sambhaar.com</p>
          <p className="text-sm"><i className="ri-phone-fill mr-2 ri-lg text-primary"></i>+91 818181 7556</p>
          <p className="text-sm"><i className="ri-phone-fill mr-2 ri-lg text-gray-50"></i>+91 818181 7558</p>
          </div>
          
        </div>

        {/* Quick Links Section */}
        <div className="text-center sm:text-left">
          <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {["Home", "About Us", "Privacy Policy", "Terms & Conditions", "FAQ", "Contact Us"].map((link) => (
              <li key={link}><a href="#" className="text-sm hover:text-primary">{link}</a></li>
            ))}
          </ul>
        </div>

        {/* Shop Now Section */}
        <div className="text-center sm:text-left">
          <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Shop Now</h4>
          <ul className="space-y-2">
            {["Fresh Vegetables & Fruits", "Indian Grocery", "Puja Needs & Idols", "Personal Care", "Cleaning & Household", "Handlooms"].map((item) => (
              <li key={item}><a href="#" className="text-sm hover:text-primary">{item}</a></li>
            ))}
          </ul>
        </div>

        {/* My Account Section */}
        <div className="text-center sm:text-left">
          <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-4">My Account</h4>
          <ul className="space-y-2">
            {["Login", "Register", "Reset Password"].map((item) => (
              <li key={item}><a href="#" className="text-sm hover:text-primary">{item}</a></li>
            ))}
          </ul>
        </div>

        {/* App Download Section */}
        <div className="text-center sm:text-left">
          <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Download Our App</h4>
          <div className="flex flex-col gap-3 justify-center sm:justify-start">
            <a href="#"><img src={GooglePlay} alt="Google Play" className="w-28 md:w-32" /></a>
            <a href="#"><img src={ApplePlay} alt="App Store" className="w-28 md:w-32" /></a>
          </div>
        </div>

        {/* Social Icons and Footer Note */}
        <div className="col-span-full border-t border-gray-300 pt-6 mt-6 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex gap-4 justify-center lg:justify-start">
              {["twitter-fill", "instagram-fill", "facebook-circle-fill", "youtube-fill", "linkedin-fill"].map((icon) => (
                <a key={icon} href="#" className="text-primary hover:text-black hover:bg-gray-200 p-2 rounded-full">
                  <i className={`ri-${icon} ri-lg`}></i>
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              &copy; 2023 Sambhaar.com. All Rights Reserved. | Powered by Maverico.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
