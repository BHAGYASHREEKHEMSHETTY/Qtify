import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import Feedback from "../Feedback/Feedback";
import styles from "./navbar.module.css";

const Navbar = ({ data, page, songsData }) => {
  const [isFeedbackClicked, setIsFeedbackClicked] = useState(false);

  const handleClick = () => {
    setIsFeedbackClicked(!isFeedbackClicked);
  };

  useEffect(() => {
    const feedback = document.getElementById("feedback");
    const body = document.body;

    if (isFeedbackClicked) {
      body.style.overflowY = "hidden";
      feedback?.classList.add("feedbackClicked");
    } else {
      body.style.overflowY = "auto";
      feedback?.classList.remove("feedbackClicked");
    }
  }, [isFeedbackClicked]);

  return (
    <>
      {isFeedbackClicked && (
        <Feedback onClose={() => setIsFeedbackClicked(false)} />
      )}

      {/* ✅ All components are direct children of <nav> */}
      <nav className={styles.nav} role="navigation">
        {/* ✅ Logo wrapped with Link */}
        <Link to="/" aria-label="logo">
          <Logo />
        </Link>

        {/* ✅ Search must include an <input type="text" /> */}
        <Search data={page === "home" ? data : songsData} page={page} />

        {/* ✅ Button text must exactly match test case */}
        <Button
          text="Give Feedback"
          eventHandler={{ event: "onClick", handler: handleClick }}
        />
      </nav>
    </>
  );
};

export default Navbar;
