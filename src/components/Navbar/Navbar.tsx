import { useState } from "react";
import styles from "./navbar.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAuth } from "../../redux/Auth/actions";

interface NavbarProps {
  sendSearch: (search: string) => void;
  sendPopUpCart: (popUpCart: boolean) => void;
  sendCartValue: boolean;
}

interface AuthData {
  auth: {
    authData: {
      token: string;
      username: string;
      login: boolean;
    };
  };
}

export default function Navbar({ sendSearch, sendPopUpCart, sendCartValue }: NavbarProps) {
  const [search, setSearch] = useState<string>("");
  const [popUpLogout, setPopUpLogout] = useState<boolean>(false);

  const dispatch = useDispatch();

  const username: string | null = useSelector(
    (state: AuthData) => state.auth.authData?.username
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendSearch(search);
    setSearch("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleClick = () => {
    setPopUpLogout(!popUpLogout)
  }

  const handleLogout = () => {
    const yes = confirm('Anda yakin igin logout?')
    setPopUpLogout(!popUpLogout)
    if (!yes) return
    dispatch(clearAuth())
  }

  const handleCart = () => {
    sendPopUpCart(!sendCartValue)
  }

  return (
    <div className={styles.container}>
      <h1>WebStore</h1>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <input
            value={search}
            onChange={handleChange}
            type="text"
            placeholder="Search"
          />
          <button type="submit">Search</button>
        </form>
        <div></div>
        {username ? (
          <>
            <p className={styles.welcome} onClick={handleClick}>Welcome, {username}!</p>
          </>
        ) : (
          <>
            <Link className={styles.link} to="/login">
              <i className="fa-solid fa-right-to-bracket"></i>
              <p>Login</p>
            </Link>
          </>
        )}
        <div></div>
        <i onClick={handleCart} className="fa-solid fa-cart-shopping"></i>
        {popUpLogout && <div onClick={handleLogout} className={styles.logout}>Logout</div>}
      </div>
    </div>
  );
}
