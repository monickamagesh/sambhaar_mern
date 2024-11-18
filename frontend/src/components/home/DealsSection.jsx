import React from 'react'
import dealsImg from "../../assets/milk-bottle.png"

const DealsSection = () => {
  return (
    <section className='section__container deals__container'>
        <div  className='deals__image '>
            <img src={dealsImg}  alt="" />
        </div>
        <div className='deals__content'>
            <h5>Get Milk at you door</h5>
            <h4>Monthly Subscription</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, illo iusto nemo ut saepe accusantium corporis pariatur fugit magni, odit debitis nobis? Tempore possimus voluptatem laborum consequatur, ex beatae deserunt?a
            </p>
            <div className='deals__countdown flex-wrap'>
                <div className='deals__countdown__card'>
                    <h4>20</h4>
                    <p>Days</p>
                </div>
                <div className='deals__countdown__card'>
                    <h4>20</h4>
                    <p>Hours</p>
                </div>
                <div className='deals__countdown__card'>
                    <h4>40</h4>
                    <p>Mins</p>
                </div>
                <div className='deals__countdown__card'>
                    <h4>10</h4>
                    <p>Secs</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default DealsSection