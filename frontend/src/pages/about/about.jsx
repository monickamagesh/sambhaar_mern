import React, { useEffect, useRef, useState } from "react";
import { Typography, Box, Grid } from "@mui/material";
import Logo1 from "../../assets/about/sambhaar.png";
import Logo2 from "../../assets/about/meela-logo-300x224-1.png";
import Logo3 from "../../assets/about/Gbuba-Logo-1536x535-1-1024x357.png";
import ecoimg1 from "../../assets/about/eco.png";
import ecoimg2 from "../../assets/about/biodegradable.png";
import ecoimg3 from "../../assets/about/eco-fuel.png";
import ecoimg4 from "../../assets/about/electric-vehicle.png";
import Grocery from "../../assets/GroceryBag.jpg";
import "./../../App.css";
import { Link } from "react-router-dom";

const AboutContent = () => {
  const aboutSectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  // Check if the section is in view
  useEffect(() => {
    const handleScroll = () => {
      if (aboutSectionRef.current) {
        const rect = aboutSectionRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setInView(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="flex w-full justify-center bg-slate-200 py-20 md:min-h-[250px] lg:min-h-[288px]">
        <div className="relative flex w-full flex-col items-center justify-center">
          <h1 className="text-brand-dark text-center text-xl font-bold md:text-2xl lg:text-3xl 2xl:text-[40px]">
            <span className="font-manrope mb-3 block font-bold md:mb-4 lg:mb-5 2xl:mb-7">
              About Us
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
                  About Us
                </li>
              </>
            </ul>
          </div>
        </div>
      </div>
      <div className="aboutpage">
        <Box
          className="about-1"
          display="flex"
          flexDirection="column"
          alignItems="center"
          mt={3}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "cursive",
              color: "#faa41f",
              fontWeight: 600,
              fontSize: "30px",
              textAlign: "center",
            }}
          >
            Sambhaar envisions evolving into India’s Favorite Grocer.
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
              color: "#c74227",
              fontWeight: 800,
              fontSize: "28px",
              mt: 2,
              textAlign: "center",
            }}
          >
            About for Sambhaar.
          </Typography>
        </Box>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            {/* Image Section */}
            <img src={Grocery} alt="groceryimage" />
          </Grid>

          <Grid item xs={12} md={6}>
            {/* Text Section */}
            <Box sx={{ padding: "0 70px", marginTop: "1.5%" }}>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                <b>“Sambhaar</b> – Kirana ka Raja” is a brand that will
                encompass a vaster audience nationwide and provide a premium
                experience. <b>Sambhaar</b> – Kirana ka Raja shall be an online
                platform and shall cater to a wide customer base. A
                well-interactive and effective website is ready with both iOS &
                Android apps to serve all ages.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={3} ref={aboutSectionRef}>
          <Grid item xs={12}>
            {/* All Content Combined */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                overflowX: "hidden",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateX(0)" : "translateX(100px)",
                transition: "all 0.6s ease-out",
                padding: "0 20px",
              }}
            >
              <Typography variant="body1">
                <b>“MEELA’S by Sambhaar”</b> is a brand that shall concentrate
                more on providing South Indian Specialty Foods and groceries.
                MEELA’S shall ensure to cater to the South Indian public and to
                those who love south Indian food and grocery. All speciality
                foods and groceries from Tamilnadu, Kerala, Karnataka, Andhra &
                Telangana are handpicked by ensuring high standards of Quality.
              </Typography>
              <Typography variant="body1">
                “MEELA’S by Sambhaar” shall be available both offline and
                online. “MEELA’S by Sambhaar” plans to open a chain of premium
                stores in selected cities and to start “MEELA’S by Sambhaar ”
                has opened its first store in Palava City, Thane. Within a short
                span “MEELA’S by Gbappa” has become the favourite grocer of the
                people of Palava City, Thane and has also been presented with
                the Indian Achievers Award for the Promising Startup 2021.
              </Typography>
              <Typography variant="body1">
                “MEELA’S by Gbappa” shall also be available online under Gbappa
                – Kirana ka Raja, @ www.sambhaar.com
              </Typography>
              <Typography variant="body1">
                Gbappa, Meela’s, Cocosure, Nuttyspicy, Gbuba, Snakjak,
                Sharbathigold , Sambhaar.com is a Registered Trademark & Owned
                by Maverico Technologies Pvt Ltd.
              </Typography>
              <Typography variant="body1">
                Gbappa Projects & Services opc Pvt Ltd is a subsidy of Maverico
                Technologies Pvt Ltd.
              </Typography>
              <Typography variant="body1">
                Customer service is at heart and quality our commitment. Since
                our humble beginning, we have refined and developed our brand on
                the wants and needs of our loyal customers. From sourcing
                products and getting them delivered to the customer’s doorstep,
                we want our customers to have total confidence when ordering
                with us. We provide quality products at affordable prices.
              </Typography>
              <Typography variant="body1">
                We at Sambhaar strive to become India’s Favourite and best price
                online and offline superstore. Sambhaar uses its in-house
                technology platform to manage a network of over 1,500 farmers
                and wholesale distributors that enables Gbappa to provide
                Quality products at an affordable price, mostly from
                manufacturers to customers directly. We deliver at your doorstep
                within hours. You save not only time but also money with our
                best prices and offers.
              </Typography>

              <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                Sambhaar, Kirana ka Raja and MEELA’S by Sambhaar despite being
                premium brands, it’s affordable, it is a significant saving for
                its customers with quality and quantity being the top priority.
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                The Founders Elayaraja Duraisamy & Sidharrth Rajah joined hands
                with multiple farm producers to give this grocery business a
                giant leap and branded this grocery business under the name and
                style “Sambhaar – Kirana ka Raja “ and MEELA’S by Sambhaar”.
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                “MEELA’S by Sambhaar” retail stores in the country with a
                beautiful layout, very clean shelves and customer service to
                match. Shopping at the store will be an experience the customer
                will want to continue month after month.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ padding: "0 20px" }}>
          <Grid item xs={12}>
            {/* Title Section */}
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                color: "#c74227",
                fontWeight: 800,
                textAlign: "center",
                marginTop: "2.5%",
              }}
            >
              Who We Are
            </Typography>
          </Grid>

          <Grid item xs={12}>
            {/* Paragraph Content */}
            <Box sx={{ padding: "0 20px", marginTop: "1%" }}>
              <Typography variant="body1" sx={{ paddingTop: "1%" }}>
                Sambhaar and MEELA’S are the brainchild of Sidharrth Rajah, who
                decided to start these brands in Mumbai, the business capital of
                India, intending to provide quality products to the common man
                at an affordable price. Our products go through multiple quality
                assessments, ensuring that only the best reach the end-users.
              </Typography>

              <Typography variant="body1" sx={{ marginTop: "1%" }}>
                Sambhaar aims to manufacture, pack, and distribute selected
                quality products under the following brand names.
              </Typography>

              <Box
                component="ul"
                sx={{ paddingTop: "1%", paddingLeft: "20px" }}
              >
                <li>
                  <b>GBUBA</b> - Kirana ka Ajuba - Indian Grocery
                </li>
                <li>
                  <b>MEELA’S SNAKJAK</b> – South Indian Specialty Snacks &
                  Sweets
                </li>
                <li>
                  <b>MEELA’S COCOSURE</b> – Traditional Cold Pressed Coconut Oil
                </li>
                <li>
                  <b>MEELA’S NUTTYSPICY</b> – Premium Dry fruits, Nuts and
                  Spices
                </li>
                <li>
                  <b>SHARBATIGOLD</b> – Atta and Flours
                </li>
              </Box>

              {/* Second paragraph with image section */}
              <Typography variant="body1" sx={{ marginTop: "1%" }}>
                Based on the research and survey, Sidharrth Rajah has formulated
                and registered the above brands under Maverico Technologies Pvt
                Ltd, and the products under these brand names shall be on
                shelves very soon.
              </Typography>

              {/* Image Section */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  gap: "20px",
                  marginTop: "1%",
                }}
              >
                <img
                  src={Logo1}
                  alt="Logo1"
                  style={{ maxWidth: "300px", height: "auto" }}
                />
                <img
                  src={Logo2}
                  alt="Logo2"
                  style={{ maxWidth: "300px", height: "auto" }}
                />
                <img
                  src={Logo3}
                  alt="Logo3"
                  style={{ maxWidth: "300px", height: "auto" }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <div className="about-8">
          <div className="records">
            <div className="record-item">
              <h2>2</h2>
              <p>Store in world</p>
            </div>
            <div className="record-item">
              <h2>10</h2>
              <p>Fresh farm</p>
            </div>
            <div className="record-item">
              <h2>25+</h2>
              <p>Our partner</p>
            </div>
            <div className="record-item">
              <h2>5k+</h2>
              <p>Favorite customer</p>
            </div>
            <div className="record-item">
              <h2>Upto 10%</h2>
              <p>Online Discount</p>
            </div>
          </div>
        </div>
        <div className="about-5">
          <h1>Why choose us</h1>
          <p>
            We are always committed to offering quality products at an
            affordable price, and customer satisfaction is our priority. Our
            commitment extends to our employees in making them learn, grow and
            prosper personally and professionally. We Value being
            community-minded and environmentally conscious.
          </p>
        </div>
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {/* Vision Section */}
            <Grid item>
              <Box
                sx={{
                  boxShadow: "0 4px 8px rgba(199, 66, 39)",
                  padding: "15px",
                  borderRadius: "20px",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    color: "#faa41f",
                    textAlign: "center",
                  }}
                >
                  Our Vision
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ textAlign: "justify", marginTop: "1rem" }}
                >
                  Sambhaar.com is here to make grocery shopping for Indian
                  households financially savvy and convenient. We have a wide
                  assortment of items mainly produced in India. As trendsetters
                  in retail, we deliver from our store to your doorstep on the
                  same day of placing an order, avoiding the troubles of dealing
                  with intermediaries. With our warm and friendly service, we
                  make sure to remind you of the next door shop experience.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ textAlign: "justify", marginTop: "1rem" }}
                >
                  Maverico’s first pilot local project has gained the trust of
                  its clients, and our loyal clients have certified us as their
                  most favourite grocery store. The offline grocery stores today
                  have a shopping experience that’s fulfilling for our customers
                  who look for quality products at prices that are the best in
                  town. The beautiful and helpful salespeople at the store make
                  the shopping experience worthwhile.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ textAlign: "justify", marginTop: "1rem" }}
                >
                  Sambhaar.com online store is one of the best when it comes to
                  online grocery shopping. It’s time to do the grocery shopping
                  from the comfort of your home. It could be a single day's
                  requirement or a month's provision list, Sambhaar.com does it
                  with care and delivers at the earliest. The experience about
                  the product and the timely delivery has endeared us to the
                  customers, and they vouch for the quality of the products.
                  With some of the best discounts and getting them delivered in
                  the shortest possible time, Sambhaar is here to revolutionise
                  the entire online and offline grocery shopping experience.
                  www.sambhaar.com
                </Typography>
              </Box>
            </Grid>

            {/* Mission Section */}
            <Grid item>
              <Box
                sx={{
                  boxShadow: "0 4px 8px rgba(199, 66, 39)",
                  padding: "15px",
                  borderRadius: "20px",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    color: "#faa41f",
                    textAlign: "center",
                  }}
                >
                  Our Mission
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ textAlign: "justify", marginTop: "1rem" }}
                >
                  In phase one, we aim to open a minimum of ten premium stores
                  including three super warehouse sale points in India. Our
                  vision is to create an online network of grocery retail
                  spanning throughout India with all the household items, sorted
                  according to your needs; this would make grocery shopping
                  extremely easy. With a Sambhaar Super Warehouse or MEELA’S
                  store within every 30 kms, Indian households would have their
                  grocery shopping solved. Sambhaar is also devising a
                  franchisee program to ensure Sambhaar Super Warehouse and
                  MEELA’S stores are available to the people in all major cities
                  and townships across India.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <h1 className="gogreen">Go Green With Us</h1>
        <div className="about-7">
          <div className="eco1">
            <div className="ecoimg">
              <img
                src={ecoimg1}
                alt={"ecoimg1"}
                style={{ width: "80px", height: "80px" }}
              />
            </div>
            <p>hello</p>
          </div>
          <div className="eco2">
            <div className="ecoimg">
              <img
                src={ecoimg2}
                alt={"ecoimg1"}
                style={{ width: "80px", height: "80px" }}
              />
            </div>
            <p>
              <span>Our Super Quick Turnaround</span>
              <br />
              Quality is retained throughout the process
            </p>
          </div>
          <div className="eco3">
            <div className="ecoimg">
              <img
                src={ecoimg3}
                alt={"ecoimg1"}
                style={{ width: "80px", height: "80px" }}
              />
            </div>
            <p>
              <span>No Pesticides</span> <br />
              Use completely organic
            </p>
          </div>
          <div className="eco4">
            <div className="ecoimg">
              <img
                src={ecoimg4}
                alt={"ecoimg1"}
                style={{ width: "80px", height: "80px" }}
              />
            </div>
            <p>
              <span>Fastest & Free Shipping</span>
              <br />
              The best quality when reaching the consumer
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutContent;
