import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

const faqData = [
  {
    question: "How do I register?",
    answer:
      "You can register by clicking on the “Register” link at the top right corner of the homepage. Please provide the information in the form that appears. You can review the terms and conditions, provide your payment details and submit the registration information.",
  },
  {
    question: "Are there any registration charges??",
    answer: "No. Registration on Gbappa.com is free..",
  },
  {
    question: "Do I have to register to shop on Sambhaar.com necessarily??",
    answer:
      "You can surf and add products to the trolley without registration but only registered shoppers will check out and place orders. Registered members have to be logged in when checking out the trolley; they will be prompted to do so if they are not logged in.",
  },
  {
    question: "Can I have multiple registrations?",
    answer:
      "Each email address and contact phone number can only be associated with one gbappa account.",
  },
  {
    question: "Can I add more than one delivery address to an account?",
    answer:
      "Yes, you can add multiple delivery addresses to your Gbappa account. However, remember that all items placed in a single order can only be delivered to one address; if you want different products delivered to a different address, you need to place them as separate orders.",
  },
  {
    question:
      "Can I have multiple accounts for family members with different mobile number and email address but the same or common delivery address?",
    answer:
      "A maximum of four family members can have the same address provided the email address and phone number associated with the accounts are unique.",
  },
  {
    question: "What is My Account?",
    answer:
      "My Account is the section you reach after you log in at sambhaar.com. My Account allows you to track your active orders, and see your order history and update your contact details and preferences.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "You need to enter your email address on the login page and click on forgot password. An email with a reset password will be sent to your email address. With this, you can change your password.",
  },
  {
    question: "Can I add more than one delivery address to an account?",
    answer:
      "Yes, you can add multiple delivery addresses to your Gbappa account. However, remember that all items placed in a single order can only be delivered to one address; if you want different products delivered to a different address, you need to place them as separate orders.",
  },
  {
    question: "Is it safe to use my credit/ debit card on sambhaar.com?",
    answer:
      "Yes, it is safe to use your card on sambhaar.com. A recent directive from RBI makes it mandatory to have an additional authentication pass code verified by VISA (VBV) or MSC, Master Card which has to be entered by online shoppers while paying online using visa or master credit card making online shopping safer.",
  },
  {
    question: "What is the meaning of cash on delivery?",
    answer:
      "Cash on delivery means that you can pay for your order at the time of delivery of your products at your doorstep.",
  },
  {
    question: "When will I receive my order?",
    answer:
      "Once you have selected your products and clicking checkout, you will be prompted to choose a delivery slot. Your order will be delivered to you on the day, and the address selected by you.",
  },
  {
    question: "How are the fruits and vegetables packaged?",
    answer:
      "Fresh fruits and vegetables are hands picked, hand cleaned and hand packed in food-grade pouches. The leafy items are covered with cling. We ensure hygienic and careful handling of all our products.",
  },
  {
    question: "How are the fruits and vegetables weighed?",
    answer:
      "Every fruit and vegetable varies a little in size and weight. While you shop, we show an estimated weight and price for everything priced by kilogram. At the time of delivery, we weigh each item to determine the final price. This could vary by a maximum of 100grams weight, depending on the article. In case the weight of the product is lesser than what you ordered, you will pay less accordingly.",
  },
  {
    question: "How will the delivery be done?",
    answer:
      "We have a dedicated team of well-trained delivery executives ensuring timely and accurate delivery to our customers following all the guidelines for proper hygiene to protect against COVID 19.",
  },
  {
    question: "How do I change the delivery address?",
    answer:
      "You can change your delivery address on our website once you log into your account. Click on “My Account” at the top right-hand corner and go to the “Update My Profile” section to change your delivery address.",
  },
  {
    question: "How much are the delivery charges?",
    answer:
      "No delivery charges for minimum orders of Rs.300/- and above for Grocery and Rs.150/- for Vegetables & Fruits. Any orders below the minimum order amount shall attract delivery charges depending on the delivery location. No delivery charges for Smart Coins customers.",
  },
  {
    question: "Do you deliver in my area?",
    answer:
      "You will be able to check if we deliver by checking the pin codes available at the top centre of our website.",
  },
  {
    question: "Will someone inform me if my delivery gets delayed?",
    answer:
      "In case of any delay, our customer support team shall update accordingly.",
  },
  {
    question: "What is the minimum order for delivery?",
    answer: "Rs.150/- for fresh vegetables & fruits and Rs.300/- for grocery.",
  },
];

export default function FAQ() {
  return (
    <>
      {/* FAQ Header Section */}
      <div className="flex w-full justify-center bg-slate-200 py-20 md:min-h-[250px] lg:min-h-[288px]">
        <div className="relative flex w-full flex-col items-center justify-center">
          <h1 className="text-brand-dark text-center text-xl font-bold md:text-2xl lg:text-3xl 2xl:text-[40px]">
            <span className="font-manrope mb-3 block font-bold md:mb-4 lg:mb-5 2xl:mb-7">
              Frequently Asked Questions
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
                  FAQs
                </li>
              </>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ Content Section */}
      <div className="faqs">
        <div className="faqtop">
          <div className="topcontent">
            <p>
              Kindly check the FAQ below. If your query is not mentioned, then
              please contact us at:
            </p>
            <p>Email: support@sambhaar.com | Call: 81818 19637</p>
          </div>
        </div>

        {/* Dynamic Accordion Section */}
        <div className="space-y-6 py-8 px-4">
          {faqData.map((faq, index) => (
            <Accordion key={index} sx={{ minHeight: "80px" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography className="font-medium" sx={{ fontWeight: 800, fontSize: '18px'}}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
        <div className="faqtop">
          <div className="bottomcontent">
            <p>
              Fruits and Vegetables are natural products that come in different
              shapes, sizes and colour. While we have strict control over the
              average sizes and weights, there is always scope for weight to
              vary from your ordered quantity. As a process, we make sure that
              in all conditions, only a maximum of 100grams can go extra and
              hence you will be charged pro-rata for the additional quantity.
            </p>
            <br />
            <p>
              If you have any complaints or suggestions, please write to us at
              support@sambhaar.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
