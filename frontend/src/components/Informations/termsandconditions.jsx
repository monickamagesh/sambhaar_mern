import React from "react";
import { Link } from "react-router-dom";

const TermsandConditions = () => {
  return (
    <>
      <div className="flex w-full justify-center bg-slate-200 py-20 md:min-h-[250px] lg:min-h-[288px]">
        <div className="relative flex w-full flex-col items-center justify-center">
          <h1 className="text-brand-dark text-center text-xl font-bold md:text-2xl lg:text-3xl 2xl:text-[40px]">
            <span className="font-manrope mb-3 block font-bold md:mb-4 lg:mb-5 2xl:mb-7">
              Terms & Conditions
            </span>
          </h1>
          <div className="flex items-center">
            <ul className="flex w-full items-center overflow-hidden">
              <li className="px-2.5 text-sm text-heading transition duration-200 ease-in hover:text-accent ltr:first:pl-0 ltr:last:pr-0 rtl:first:pr-0 rtl:last:pl-0">
                <Link href={""} className="inline-flex items-center">
                  {/* <HomeIconNew className="ltr:mr-1.5 rtl:ml-1.5" /> */}
                  Home
                </Link>
              </li>
              <>
                <li className="mt-[1px] text-base text-muted">
                  {/* <ArrowNext className="h-4 w-4" /> */}
                </li>
                <li className="px-2.5 text-sm text-body transition duration-200 ease-in ltr:first:pl-0 ltr:last:pr-0 rtl:first:pr-0 rtl:last:pl-0">
                  Terms & Conditions
                </li>
              </>
            </ul>
          </div>
        </div>
      </div>
      <div className="TermsandConditions">
        <p>
          This page states the Terms and Conditions under which you (User) may
          use this platform (“sambhaar.com”). Please read this page carefully.
          If you do not accept the Terms and Conditions stated here, we would
          request you to exit this site. The business, any of its business
          divisions and / or its subsidiaries, associate companies or
          subsidiaries to subsidiaries or such other investment companies (in
          India or abroad) reserve their respective rights to revise these Terms
          and Conditions at any time by updating this posting. You should visit
          this page periodically to re-appraise yourself of the Terms and
          Conditions, because they are binding on all users of this platform.
        </p>
        <br />
        <div>
          <h2 className="mb-4 text-lg font-bold text-heading md:text-xl lg:text-2.5xl">
            Use of Content
          </h2>
          <p>
            All logos, brands, marks headings, labels, names, signatures,
            numerals, shapes, or any combinations thereof, appearing in this
            site, except as otherwise noted, are properties either owned, or
            used under license, by the business and / or its associate entities
            who feature on this platform. The use of these properties or any
            other content on this site, except as provided in these terms and
            conditions or in the site content, is strictly prohibited.
          </p>
          <br />
          <p>
            You may not sell or modify the content of this platform or
            reproduce, display, publicly perform, distribute, or otherwise use
            the materials in any way for any public or commercial purpose
            without the respective organisation’s or entity’s written
            permission.
          </p>
          <br />
        </div>
        <div>
          <h2 className="mb-4 text-lg font-bold text-heading md:text-xl lg:text-2.5xl mt-10">
            Delivery, delivery fee, handling fee, and delivery time
          </h2>
          <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
            <li>
              We will provide Next Day delivery from the date of order (Order
              Day is 0.01am to 11.59pm).
            </li>
            <br />
            <li>
              We will deliver the products to the address you provide on the
              platform. You are responsible for providing a complete and correct
              delivery address, along with any necessary delivery instructions.
              We are not responsible for any delays in delivery caused by
              incorrect or incomplete addresses provided by you.
            </li>
            <br />
            <li>
              Our delivery agents will call on your registered phone number
              while delivering one-time orders. If you ask us to leave a
              delivery unattended at your address, you release us from any
              liability that may arise from the products being left unattended
              for any length of time. This includes risks such as theft,
              tampering, contamination, and changes in temperature for chilled
              or frozen items.
            </li>
            <br />
            <li>
              We charge a very minimal handling fee of ₹50 per delivery only
              when you order is less than the amount of ‘₹500’ for products.
              This is regardless of the number of products we deliver per
              delivery.
            </li>
            <br />
            <li>
              We do not charge any delivery fee for subscriptions (recurring
              orders). For ‘one-time’ orders below ₹500 in value, we charge a
              minimal delivery fee of ₹50. For orders above ₹99 in value, we
              offer free delivery. The Users will be informed about all the
              charges, fees, and costs (including, delivery fee) that may be
              levied on the purchase of the Products on the Platform at the
              checkout page during a transaction. The Company does not
              manipulate the price of any Products and/or Services offered on
              the Platform.
            </li>
            <br />
            <li>
              If you choose to pay for your order with “Cash on Delivery (CoD),”
              the delivery agents have the right to refuse delivery if you do
              not make the full payment. In such cases, we will treat the order
              as cancelled, and we will not be responsible for any losses or
              damages that may result from the non-delivery. We reserve the
              right to charge you for the delivery fee for such a cancelled
              order and recover the same at our discretion towards the cost
              incurred on such delivery attempt.
            </li>
          </ul>
          <br />
        </div>
        <div>
          <h2 className="mb-4 text-lg font-bold text-heading md:text-xl lg:text-2.5xl mt-10">
            Wallet
          </h2>
          <p>
            The Company provides a Wallet facility as the payment option for
            subscription orders to its Users, which can be used for availing
            Services on the Platform. You hereby consent that your use of Wallet
            is subject to the geographical and other usage restrictions as may
            be made Website applicable from time to time and shall also be
            subject to the additional terms and conditions.
          </p>
          <br />
        </div>
      </div>
    </>
  );
};

export default TermsandConditions;
