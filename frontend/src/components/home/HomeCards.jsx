import React from "react";
import card1 from "../../assets/card-1.png";

const cards = [
  {
    id: 1,
    image: card1,
    title: "cleaners",
  },
  {
    id: 2,
    image: card1,
    title: "Detergents",
  },
  {
    id: 3,
    image: card1,
    title: "Dish wash",
  },
  {
    id: 4,
    image: card1,
    title: "Hair Care",
  },
  {
    id: 5,
    image: card1,
    title: "Bath | Handwash",
  },
  {
    id: 6,
    image: card1,
    title: "Oral Care",
  },
  {
    id: 7,
    image: card1,
    title: "Subscription",
  },
];
const HomeCards = () => {
  return (
  <section className="section__container hero__container">
      {
        cards.map((card)=>(
          <div key={card.id} className="hero__card">
            <img src={card.image} alt=""/>
            <div className="hero__content">
              <p>{card.trend}</p>
              <h4>{card.title}</h4>
              <a href="#">Discover more</a>
            </div>
          </div>
        ))
      }
  </section>
  );
};

export default HomeCards;
