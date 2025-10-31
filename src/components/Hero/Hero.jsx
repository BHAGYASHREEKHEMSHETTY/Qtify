import React from "react";
import styles from "./hero.module.css";
import heroImage from "../../assets/hero.svg";

const Hero = () => {
  return (
    <div data-testid="hero-section" className={styles.hero}>
      <div className={styles.heroText}>
        <h1>100 Thousand Songs, ad-free</h1>
        <h1>Over thousands of podcast episodes</h1>
      </div>
      <img src={heroImage} alt="hero" className={styles.heroImage} />
    </div>
  );
};

export default Hero;
