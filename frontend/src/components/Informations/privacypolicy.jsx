import React from "react";
import { Link } from "react-router-dom";

const Privacypolicy = () => {
  return (
    <>
      {/* Banner Section */}
      <div className="privacy-banner relative flex w-full justify-center bg-slate-200 p-6 md:min-h-[250px] lg:min-h-[288px]">
        <div className="relative flex w-full flex-col items-center justify-center text-center">
          <h1 className="text-black text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl 2xl:text-[40px]">
            <span className="font-manrope mb-3 block font-bold md:mb-4 lg:mb-5 2xl:mb-7">
              Privacy Policy
            </span>
          </h1>
          <div className="flex items-center">
            <ul className="flex w-full items-center flex-wrap justify-center">
              <li className="px-2.5 text-sm text-black transition duration-200 ease-in hover:text-accent">
                <Link to="/" className="inline-flex items-center">
                  Home
                </Link>
              </li>
              <li className="mt-[1px] text-base text-black">
                <i className="ri-arrow-right-s-line"></i>
              </li>
              <li className="px-2.5 text-sm text-black">Privacy Policy</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Privacy Policy Content */}
      <div className="privacypolicy px-6 py-10 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
        {/* Purpose Section */}
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-bold text-heading md:text-xl lg:text-2xl">
            Purpose
          </h2>
          <p className="mb-4">
            We value the belief you place in us. That’s why we insist upon the
            highest standards for secure transactions and customer information
            privacy. Please read the following statement to learn about our
            information gathering and dissemination practices.
          </p>
          <p className="mb-4">
            This Privacy Policy is an electronic record in the form of an
            electronic contract formed under the Information Technology Act,
            2000 and the rules made thereunder and the amended provisions
            pertaining to electronic documents/records in various statutes as
            amended by the Information Technology Act, 2000. This Privacy Policy
            does not require any physical, electronic, or digital signature.
          </p>
          <p className="mb-4">
            Maverico Technologies Pvt Ltd (Sambhaar.Com) is the licensed owner
            of the brand “Maverico Technologies Pvt Ltd” and the website
            sambhaar.com (“The Site / The Service”). The terms of this Privacy
            Policy will be effective upon your acceptance of the same (directly
            or indirectly in electronic form, by clicking on the I accept tab or
            by use of the website or by other means) and will govern the
            relationship between you and us for your use of the app & the
            service “sambhaar.com”.
          </p>
          <p className="mb-4">
            Please read this Privacy Policy carefully. By using the Website, you
            indicate that you understand, agree, and consent to this Privacy
            Policy. If you do not agree with the terms of this Privacy Policy,
            please do not use this app & the associated services.
          </p>
          <p className="mb-4">
            By providing us your Information or by making use of the facilities
            provided by the app & the associated services; You hereby consent to
            the collection, storage, processing, and transfer of any or all of
            Your Personal Information and Non-Personal Information by us as
            specified under this Privacy Policy. You further agree that such
            collection, use, storage, and transfer of Your Information shall not
            cause any loss or wrongful gain to you or any other person.
          </p>
          <p>
            However, the internet is an ever-evolving medium & therefore we
            reserve the right to amend our Privacy Policy from time to time to
            incorporate necessary future changes. Of course, our use of any
            information we gather will always be consistent with the policy
            under which the information was collected, regardless of what the
            new policy may be.
          </p>
        </section>

        {/* Collection of User Information Section */}
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-bold text-heading md:text-xl lg:text-2xl">
            Collection of User Information
          </h2>
          <p className="mb-4">
            To avail certain services on our Websites, users are required to
            provide certain information for the registration process, namely,
            Your name, email address, sex, age, postal code of your residences,
            billing addresses & delivery addresses, credit card, debit card
            details, bank account, mobile wallet information, medical records
            and history, sexual orientation, biometric information, password,
            etc., and/or your occupation, interests, and the like. The
            Information as supplied by the users enables us to improve our sites
            and provide you the most user-friendly experience.
          </p>
          <p className="mb-4">
            All required information is service-dependent, and we may use the
            above-said user information to maintain, protect, and improve its
            services (including advertising services) and for developing new
            services.
          </p>
          <p>
            Such information will not be considered sensitive if it is freely
            available and accessible in the public domain or is furnished under
            the Right to Information Act, 2005, or any other law for the time
            being in force.
          </p>
        </section>

        {/* Cookies Section */}
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-bold text-heading md:text-xl lg:text-2xl">
            Cookies
          </h2>
          <p className="mb-4">
            To improve the responsiveness of the sites for our users, we may use
            “cookies” or similar electronic tools to collect information to
            assign each visitor a unique, random number as a User Identification
            (User ID) to understand the user’s individual interests using the
            Identified Computer. Unless you voluntarily identify yourself
            (through registration, for example), we will have no way of knowing
            who you are, even if we assign a cookie to your computer. The only
            personal information a cookie can contain is information you supply.
            A cookie cannot read data off your hard drive. Our advertisers may
            also assign their cookies to your browser (if you click on their
            ads), a process that we do not control.
          </p>
          <p>
            Our web servers automatically collect limited information about your
            computer’s connection to the Internet, including your IP address
            when you visit our site. (Your IP address is a number that lets
            computers attached to the Internet know where to send you data —
            such as the web pages you view.) Your IP address does not identify
            you personally. We use this information to deliver our web pages to
            you upon request, to tailor our site to the interests of our users,
            to measure traffic within our site, and let advertisers know the
            geographic locations from where our visitors come.
          </p>
        </section>

        {/* Information Sharing Section */}
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-bold text-heading md:text-xl lg:text-2xl">
            Information Sharing
          </h2>
          <p className="mb-4">
            We do not share sensitive personal information with any third party
            without obtaining the prior consent of the user in the following
            limited circumstances when it is requested or required by law or by
            any court or governmental agency or authority to disclose, for the
            purpose of verification of identity, or for the prevention,
            detection, investigation including cyber incidents, or for
            prosecution and punishment of offenses.
          </p>
          <p>
            We propose to share such information within its group companies and
            officers and employees of such group companies for the purpose of
            processing personal information on its behalf.
          </p>
        </section>

        {/* Information Security Section */}
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-bold text-heading md:text-xl lg:text-2xl">
            Information Security
          </h2>
          <p className="mb-4">
            We take appropriate security measures to protect against
            unauthorized access to or unauthorized alteration, disclosure, or
            destruction of data.
          </p>
        </section>

        {/* Grievance Officer Section */}
        <section>
          <h2 className="mb-4 text-lg font-bold text-heading md:text-xl lg:text-2xl">
            Grievance Officer
          </h2>
          <address className="not-italic">
            <p>#144 & 145 Kumaran Kudil,</p>
            <p>Thoraipakkam, Chennai – 500097</p>
            <p>Phone: +91 818181 7556 / 7558</p>
            <p>Email: hello@sambhaar.com</p>
            <p>Time: Monday – Friday (10 AM – 6 PM Indian Standard Time)</p>
          </address>
        </section>
      </div>
    </>
  );
};

export default Privacypolicy;
