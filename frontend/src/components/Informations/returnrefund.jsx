import React from "react";
import { Link } from "react-router-dom";

const ReturnandRefund = () => {
  return (
    <>
      <div className="privacy-banner relative flex w-full justify-center bg-slate-200 p-6 md:min-h-[250px] lg:min-h-[288px]">
        <div className="relative flex w-full flex-col items-center justify-center text-center">
          <h1 className="text-black text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl 2xl:text-[40px]">
            <span className="font-manrope mb-3 block font-bold md:mb-4 lg:mb-5 2xl:mb-7">
              Returns, Cancellations, and Refunds
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
              <li className="px-2.5 text-sm text-black">
                Returns, Cancellations, and Refunds
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="TermsandConditions">
        <div>
          <h2 className="mb-4 text-lg font-bold text-heading md:text-xl lg:text-2.5xl mt-10">
            Returns, Cancellations, and Refunds
          </h2>
          <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
            <li>
              If you didn’t receive a product or it is damaged, please get in
              touch with our customer support team on the same day of delivery
              through the website contact us feature or by calling us at 818181
              7556 /7558. We are committed to your satisfaction and will gladly
              replace or refund any products that do not meet your expectations.
            </li>
            <br />
            <li>
              We will send you an automated notification on our Website to
              confirm the delivery. If you receive a delivery confirmation but
              have not received your product, please contact our customer care
              team by phone at 818181 7556 /7558 contact us.
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
              IT IS HEREBY CLARIFIED THAT NO EXCHANGE OR RETURNS SHALL BE
              ACCEPTED IF THE PRODUCT PACKAGING IS OPENED OR PRODUCT IS USED /
              CONSUMED EITHER IN PART OR OTHERWISE.
            </li>
            <br />
            <li>
              Customer can cancel the order anytime up to the cut-off time of
              the slot for which you have placed an order through the Website.
              Upon cancellation of orders we will refund any payments already
              made by you for the order.
            </li>
            <br />
            <li>
              Customer can cancel the order within 2-3hr after placing the
              order.
            </li>
            <br />
            <li>
              Upon cancellation of orders we will refund any payments already
              made by you for the order within 3-4 working days.
            </li>
            <br />
            <li>
              Once the product is delivered, if any damage/return request from
              customer we will replace the product with 2 working days (No Money
              refund is available post delivery).
            </li>
          </ul>
          <br />
        </div>
        <div>
          <h2 className="mb-4 text-lg font-bold text-heading md:text-xl lg:text-2.5xl mt-10">
            Security Rules
          </h2>
          <p>
            Users are prohibited from violating or attempting to violate the
            security of the platform, including, without limitation,
          </p>
          <br />
          <ol style={{ listStyleType: "numeric", paddingLeft: "20px" }}>
            <li>
              Accessing data not intended for such user or logging into a server
              or account which the user is not authorised to access,
            </li>
            <br />
            <li>
              Attempting to probe, scan or test the vulnerability of a system or
              network or to breach security or authentication measures without
              proper authorisation,
            </li>
            <br />
            <li>
              Attempting to interfere with service to any user, host or network,
              including, without limitation, via means of submitting a virus or
              “Trojan horse” to the platform, overloading, “flooding”, “mail
              bombing” or “crashing”,
            </li>
            <br />
            <li>
              Sending unsolicited electronic mail, including promotions and/or
              advertising of products or services. Violations of system or
              network security may result in civil or criminal liability. The
              business and / or its associate entities will have the right to
              investigate occurrences that they suspect as involving such
              violations and will have the right to involve, and cooperate with,
              law enforcement authorities in prosecuting users who are involved
              in such violations.
            </li>
          </ol>
          <br />
        </div>
        <div>
          <h2 className="mb-4 text-lg font-bold text-heading md:text-xl lg:text-2.5xl mt-10">
            General Rules
          </h2>
          <p>
            Users may not use the platform in order to transmit, distribute,
            store or destroy material (a) that could constitute or encourage
            conduct that would be considered a criminal offence or violate any
            applicable law or regulation, (b) in a manner that will infringe the
            copyright, trademark, trade secret or other intellectual property
            rights of others or violate the privacy or publicity of other
            personal rights of others, or (c) that is libellous, defamatory,
            pornographic, profane, obscene, threatening, abusive or hateful.
          </p>
          <br />
        </div>
        <div>
          <h2 className="mb-4 text-lg font-bold text-heading md:text-xl lg:text-2.5xl mt-10">
            Indemnity
          </h2>
          <p>
            The User unilaterally agree to indemnify and hold harmless, without
            objection, the Company, its officers, directors, employees and
            agents from and against any claims, actions and/or demands and/or
            liabilities and/or losses and/or damages whatsoever arising from or
            resulting from their use of sambhaar.com or their breach of the
            terms.
          </p>
          <br />
        </div>
        <div>
          <h2 className="mb-4 text-lg font-bold text-heading md:text-xl lg:text-2.5xl mt-10">
            Liability
          </h2>
          <p>
            User agrees that neither Company nor its group companies, directors,
            officers or employee shall be liable for any direct, or/and indirect
            or/and incidental or/and special or/and consequential or/and
            exemplary damages, resulting from the use or/and the inability to
            use the service or/and for cost of procurement of substitute goods
            or/and services or resulting from any goods or/and data or/and
            information or/and services purchased or/and obtained or/and
            messages received or/and transactions entered into through or/and
            from the service or/and resulting from unauthorized access to or/and
            alteration of user’s transmissions or/and data or/and arising from
            any other matter relating to the service, including but not limited
            to, damages for loss of profits or/and use or/and data or other
            intangible, even if Company has been advised of the possibility of
            such damages.
          </p>
          <br />
          <p>
            User further agrees that Company shall not be liable for any damages
            arising from interruption, suspension or termination of service,
            including but not limited to direct / or an indirect or / and
            incidental or/and special consequential or/and exemplary damages,
            whether such interruption or/and suspension or/and termination was
            justified or not, negligent or intentional, inadvertent or
            advertent.
          </p>
          <br />
          <p>
            User agrees that Company shall not be responsible or liable to user,
            or anyone, for the statements or conduct of any third party of the
            service. In sum, in no event shall Company’s total liability to the
            User for all damages or/and losses or/and causes of action exceed
            the amount paid by the User to Company, if any, that is related to
            the cause of action.
          </p>
        </div>
        <div>
          <h2 className="mb-4 text-lg font-bold text-heading md:text-xl lg:text-2.5xl mt-10">
            Shipping Policy
          </h2>
          <p>
            We offer delivery services within specific areas, with delivery time
            frames subject to availability. We provide delivery notifications
            for your convenience. If you encounter any delivery issues, please
            contact our customer support team. Upon delivery, please ensure
            someone is available to receive and inspect the order. We reserve
            the right to modify this policy. For more information, contact our
            customer support team.
          </p>
          <br />
        </div>
        <div>
          <h2 className="mb-4 text-lg font-bold text-heading md:text-xl lg:text-2.5xl mt-10">
            Disclaimer of Consequential Damages
          </h2>
          <p>
            In no event shall Company or any parties, organizations or entities
            associated with the corporate brand name us or otherwise, mentioned
            at this platform be liable for any damages whatsoever (including,
            without limitations, incidental and consequential damages, lost
            profits, or damage to computer hardware or loss of data information
            or business interruption) resulting from the use or inability to use
            the platform and the platform material, whether based on warranty,
            contract, tort, or any other legal theory, and whether or not, such
            organization or entities were advised of the possibility of such
            damages
          </p>
          <br />
        </div>
      </div>
    </>
  );
};

export default ReturnandRefund;
