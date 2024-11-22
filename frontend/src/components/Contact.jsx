import React from "react";
import ContactFormpage from "./ContactForm";
import { Link } from "react-router-dom";
import contactimg from "../assets/contact-illustration.png";
// Import React Icons
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaLinkedin, FaPinterest, FaGlobe } from "react-icons/fa";

const Contactpage = () => {
  return (
    <>
      <div className="flex w-full justify-center bg-slate-200 py-20 md:min-h-[250px] lg:min-h-[288px]">
        <div className="relative flex w-full flex-col items-center justify-center">
          <h1 className="text-brand-dark text-center text-xl font-bold md:text-2xl lg:text-3xl 2xl:text-[40px]">
            <span className="font-manrope mb-3 block font-bold md:mb-4 lg:mb-5 2xl:mb-7">
              Contact Us
            </span>
          </h1>
          <div className="flex items-center">
            <ul className="flex w-full items-center overflow-hidden">
              <li className="px-2.5 text-sm text-heading transition duration-200 ease-in hover:text-accent ltr:first:pl-0 ltr:last:pr-0 rtl:first:pr-0 rtl:last:pl-0">
                <Link to="/" className="inline-flex items-center">
                  Home
                </Link>
              </li>
              <>
                <li className="mt-[1px] text-base text-muted"></li>
                <li className="px-2.5 text-sm text-body transition duration-200 ease-in ltr:first:pl-0 ltr:last:pr-0 rtl:first:pr-0 rtl:last:pl-0">
                  Contact Us
                </li>
              </>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-100">
        <div
          className="mx-auto flex w-full max-w-7xl flex-col px-5 py-10 pb-20 md:flex-row md:pb-10 xl:py-14 xl:px-8 xl:pb-14 2xl:px-14"
          style={{ gap: "40px" }}
        >
          {/* Sidebar */}
          <div
            className="order-2 w-full shrink-0 rounded-lg bg-light p-5 md:order-1 md:w-72 lg:w-96"
            style={{ backgroundColor: "white" }}
          >
            <div className="mb-8 flex w-full items-center justify-center overflow-hidden">
              <img src={contactimg} alt="Contact" className="h-auto w-full" />
            </div>

            <div className="mb-8 flex flex-col">
              <span className="mb-3 font-semibold text-heading">Address</span>
              <span className="text-sm text-body">
                <Link title={"address"} target="_blank" href={""}>
                  India | Qatar | UAE
                </Link>
              </span>
            </div>

            <div className="mb-8 flex flex-col">
              <span className="mb-3 font-semibold text-heading">Phone</span>
              <span className="text-sm text-body">
                +91 818181 7556 <br />+91 818181 7558
              </span>
            </div>

            <div className="mb-8 flex flex-col">
              <span className="mb-3 font-semibold text-heading">
                Email Address
              </span>
              <span className="text-sm text-body">support@sambhaar.com</span>
            </div>

            <div className="mb-8 flex flex-col">
              <span className="mb-4 font-semibold text-heading">Follow Us</span>
              <div className="flex items-center justify-start gap-4">
                {/* Social Media Icons */}
                <Link
                  to="https://instagram.com"
                  target="_blank"
                  title="Instagram"
                  className="text-muted transition-colors duration-300 focus:outline-none hover:text-[#EA580C]"
                >
                  <FaInstagram size={20} />
                </Link>
                <Link
                  to="https://facebook.com"
                  target="_blank"
                  title="Facebook"
                  className="text-muted transition-colors duration-300 focus:outline-none hover:text-[#EA580C]"
                >
                  <FaFacebookF size={20} />
                </Link>
                <Link
                  to="https://twitter.com"
                  target="_blank"
                  title="Twitter"
                  className="text-muted transition-colors duration-300 focus:outline-none hover:text-[#EA580C]"
                >
                  <FaTwitter size={20} />
                </Link>
                <Link
                  to="https://youtube.com"
                  target="_blank"
                  title="YouTube"
                  className="text-muted transition-colors duration-300 focus:outline-none hover:text-[#EA580C]"
                >
                  <FaYoutube size={20} />
                </Link>
                <Link
                  to="https://linkedin.com"
                  target="_blank"
                  title="LinkedIn"
                  className="text-muted transition-colors duration-300 focus:outline-none hover:text-[#EA580C]"
                >
                  <FaLinkedin size={20} />
                </Link>
                <Link
                  to="https://pinterest.com"
                  target="_blank"
                  title="Pinterest"
                  className="text-muted transition-colors duration-300 focus:outline-none hover:text-[#EA580C]"
                >
                  <FaPinterest size={20} />
                </Link>
                <Link
                  to="/"
                  target="_blank"
                  title="Website"
                  className="text-muted transition-colors duration-300 focus:outline-none hover:text-[#EA580C]"
                >
                  <FaGlobe size={20} />
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className="order-1 mb-8 w-full rounded-lg bg-light p-5 md:order-2 md:mb-0 md:p-8 ltr:md:ml-7 rtl:md:mr-7 ltr:lg:ml-9 rtl:lg:mr-9"
            style={{ backgroundColor: "white" }}
          >
            <h1
              className="mb-7 font-body text-xl font-bold text-heading md:text-2xl"
              style={{ display: "flex", justifyContent: "center"}}
            >
              How can we improve your experience?
            </h1>
            <ContactFormpage />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contactpage;