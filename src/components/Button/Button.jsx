import navbarStyles from "../Navbar/navbar.module.css";

const Button = ({ text, eventHandler }) => {
  const handleClick = (e) => {
    if (eventHandler?.event === "onClick" && typeof eventHandler.handler === "function") {
      eventHandler.handler(e);
    }
  };

  return (
    <button
      data-testid="feedback-button" // ✅ helps automated tests locate button
      className={navbarStyles.feedback}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;
