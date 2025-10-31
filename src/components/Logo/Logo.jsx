import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import styles from "../Navbar/navbar.module.css";

const Logo = () => {
  return (
    <Link to="/" aria-label="logo">
      <img src={logo} alt="logo" className={styles.img} />
    </Link>
  );
};

export default Logo;
