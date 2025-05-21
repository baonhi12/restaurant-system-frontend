import React, { useState, useRef, useEffect } from 'react';
import '../../../assets/css/MenuCircularSlider.css';
import menu_bg_1 from '../../../assets/images/menu_bg_1.png';
import menu_bg_2 from '../../../assets/images/menu_bg_2.png';
import menu_bg_3 from '../../../assets/images/menu_bg_3.png';
import menu_bg_4 from '../../../assets/images/menu_bg_4.png';
import menu_bg_5 from '../../../assets/images/menu_bg_5.png';
import menu_bg_6 from '../../../assets/images/menu_bg_6.png';
import menu_bg_7 from '../../../assets/images/menu_bg_7.png';
import menu_bg_8 from '../../../assets/images/menu_bg_8.png';
import menu_bg_9 from '../../../assets/images/menu_bg_9.png';

const rotationValues = [-84, -63, -42, -21, 0, 21, 42, 63, 84];

const colors = [
  'radial-gradient(#9EC6F3, #BDDDE4)',
  'radial-gradient(#CD5656, #DA6C6C)',
  'radial-gradient(#CDC1FF, #CB9DF0)',
  'radial-gradient(#FFB26F, #FFB38E)',
  'radial-gradient(#C0C78C, #A6B37D)',
  'radial-gradient(#F0A8D0, #F7B5CA)',
  'radial-gradient(#C9DABF, #9CA986)',
  'radial-gradient(#804674, #A86464)',
  'radial-gradient(#AB886D, #AB886D)',
];

const images = [menu_bg_1, menu_bg_2, menu_bg_3, menu_bg_4, menu_bg_5, menu_bg_6, menu_bg_7, menu_bg_8, menu_bg_9];

const sections = [
  { title: 'Classic Pizzas', desc: 'Timeless flavors like Margherita, Pepperoni, and Hawaiian made with our house-made tomato sauce and 100% mozzarella cheese.' },
  { title: 'Signature Creations', desc: 'Our chef’s special recipes: from BBQ Chicken Delight to Truffle Mushroom Magic—each pizza is a masterpiece of bold flavors.' },
  { title: 'Gourmet Pizzas', desc: 'Elevate your pizza experience with our gourmet options: Lobster & Truffle, Fig & Prosciutto, and more.' },
  { title: 'Vegan & Vegetarian', desc: 'Delicious plant-based pizzas loaded with fresh veggies, vegan cheese, and house-made sauces.' },
  { title: 'Gluten-Free Options', desc: 'Enjoy our gluten-free crusts without compromising on taste. Perfect for those with dietary restrictions.' },
  { title: 'Build Your Own', desc: 'Create your own masterpiece with a variety of crusts, sauces, cheeses, and toppings to choose from.' },
  { title: 'Seasonal Specials', desc: 'Try our limited-time seasonal pizzas that celebrate the flavors of each season.' },
  { title: 'Kids Menu', desc: 'Kid-friendly pizzas with fun shapes and toppings that kids will love.' },
  { title: 'Pizza Rolls', desc: 'Our signature pizza rolls are a fun twist on traditional pizza, perfect for dipping and sharing.' }
];

function MenuTopSection() {
  const [activeIndex, setActiveIndex] = useState(4);
  const sliderRef = useRef(null);
  const imageRef = useRef(null);
  const indicatorRef = useRef(null);
  const intervalRef = useRef(null);

  const applyStyles = (index) => {
    const deg = rotationValues[index];
    if (sliderRef.current && imageRef.current && indicatorRef.current) {
      sliderRef.current.style.background = colors[index];
      imageRef.current.style.backgroundImage = `url(${images[index]})`;
      imageRef.current.style.transform = `rotate(${deg}deg)`;
      indicatorRef.current.style.transform = `translate(-50%, -50%) rotate(${deg}deg)`;
    }
  };

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  // update on index change
  useEffect(() => {
    applyStyles(activeIndex);
  }, [activeIndex]);

  // auto-rotate: 2->3->...->8->1->2...
  useEffect(() => {
    if (imageRef.current && indicatorRef.current) {
      imageRef.current.style.transition = 'transform 0.5s ease';
      indicatorRef.current.style.transition = 'transform 0.5s ease';
    }
    intervalRef.current = setInterval(() => {
      setActiveIndex(prev => (prev < sections.length - 1 ? prev + 1 : 1));
    }, 10000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section className="menu-top-section-circular-slider-section" ref={sliderRef}>
      <div className="menu-top-section-circular-slider-container">
        {sections.map((sec, i) => (
          <div
            key={i}
            className="menu-top-section-circular-slider-text-center"
            style={{ display: activeIndex === i ? 'block' : 'none' }}
          >
            <h2>{sec.title}</h2>
            <p>{sec.desc}</p>
          </div>
        ))}

        <div className="menu-top-section-circular-slider-roll">
          <div className="menu-top-section-circular-slider-roll-indicator" ref={indicatorRef}></div>
          <div className="menu-top-section-circular-slider-roll-menu">
            {sections.map((_, i) => (
              <div key={i} onClick={() => handleClick(i)}>
                <span>Pizza {i + 1}</span>
              </div>
            ))}
          </div>
          <div className="menu-top-section-circular-slider-roll-img" ref={imageRef}></div>
        </div>
      </div>
    </section>
  );
}

export default MenuTopSection;
