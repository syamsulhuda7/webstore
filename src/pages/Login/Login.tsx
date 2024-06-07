import { FormEvent, useEffect, useState } from "react";
import styles from "./login.module.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/Auth/actions.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface AuthData {
  auth: {
    authData: {
      token: string;
      username: string;
      login: boolean;
    };
  };
}

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token: string | null = useSelector(
    (state: AuthData) => state.auth.authData?.token
  );

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://fakestoreapi.com/auth/login`, {
        username,
        password,
      });
      dispatch(
        setAuth({
          token: response.data.token,
          username: username,
          isLogin: true,
        })
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/users`);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.supercontainer}>
      <div className={styles.container}>
        <h1>Login</h1>
        <form onSubmit={login}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username"
            id="username"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            id="password"
          />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
