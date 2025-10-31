import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import styles from "../Navbar/navbar.module.css";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* ✅ Use lowercase alt text for better test matching */}
      <img
        src={logo}
        alt="logo"
        className={styles.img}
        onClick={() => navigate("/")}
      />
    </div>
  );
};

export default Logo;
