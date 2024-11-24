import React from "react";
import GooglePlay from "../assets/play-store-btn.png";
import ApplePlay from "../assets/app-store-btn.png";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms & Conditions", path: "/termsandconditions" },
    { name: "Return & Refund Policy", path: "/returnandrefund" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact Us", path: "/contact" },
  ];

  const shopNowLinks = [
    { name: "Fresh Vegetables & Fruits", path: "/shop/vegetables-fruits" },
    { name: "Indian Grocery", path: "/shop/indian-grocery" },
    { name: "Puja Needs & Idols", path: "/shop/puja-needs" },
    { name: "Personal Care", path: "/shop/personal-care" },
    { name: "Cleaning & Household", path: "/shop/cleaning-household" },
    { name: "Handlooms", path: "/shop/handlooms" },
  ];

  const accountLinks = [
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
    { name: "Reset Password", path: "/reset-password" },
  ];

  return (
    <footer className="border-t-4 border-[#EA580C] bg-gradient-to-br from-gray-50 to-gray-100 text-black py-8 md:py-12 mx-auto">
      <div className="max-w-6xl mx-auto sm:px-16 md:px-12 lg:px-4 grid gap-6 lg:grid-cols-5 sm:grid-cols-2 grid-cols-1">
        {/* Contact Us Section */}
        <div className="text-center sm:text-left">
          <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Contact Us</h4>
          <div className="space-y-2">
            <p className="text-sm">
              <i className="ri-map-pin-fill mr-2 ri-lg text-primary"></i>India | Qatar | UAE
            </p>
            <p className="text-sm">
              <i className="ri-mail-open-fill mr-2 ri-lg text-primary"></i>support@sambhaar.com
            </p>
            <p className="text-sm">
              <i className="ri-phone-fill mr-2 ri-lg text-primary"></i>+91 818181 7556
            </p>
            <p className="text-sm">
              <i className="ri-phone-fill mr-2 ri-lg text-primary"></i>+91 818181 7558
            </p>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="text-center sm:text-left">
          <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a href={link.path} className="text-sm hover:text-primary">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Shop Now Section */}
        <div className="text-center sm:text-left">
          <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Shop Now</h4>
          <ul className="space-y-2">
            {shopNowLinks.map((item) => (
              <li key={item.name}>
                <a href={item.path} className="text-sm hover:text-primary">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* My Account Section */}
        <div className="text-center sm:text-left">
          <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-4">My Account</h4>
          <ul className="space-y-2">
            {accountLinks.map((item) => (
              <li key={item.name}>
                <a href={item.path} className="text-sm hover:text-primary">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* App Download Section */}
        <div className="text-center sm:text-left">
          <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Download Our App</h4>
          <div className="flex flex-col gap-3 justify-center sm:justify-start">
            <a href="#">
              <img src={GooglePlay} alt="Google Play" className="w-28 md:w-32" />
            </a>
            <a href="#">
              <img src={ApplePlay} alt="App Store" className="w-28 md:w-32" />
            </a>
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
              &copy; 2024 Sambhaar.com. All Rights Reserved. | Powered by Maverico.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;