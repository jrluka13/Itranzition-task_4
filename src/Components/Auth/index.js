import React, { useEffect, useState } from "react";
import "./style.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
export const Auth = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [dataDb, setDataDB] = useState();

  useEffect(() => {
    axios
      .get("https://webapp-9da92-default-rtdb.firebaseio.com/users.json")
      .then((data) =>
        setDataDB(
          data.data
        )
      );
  }, []);

  const loginHandler = async () => {
    const authData = {
      email: mail,
      password: password,
      returnSecureToken: true,
    };
    try {
        await axios.post(
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDn28xLcqICghX4qgTbHLgrDtVFS1LqIwQ",
        authData
      );
    } catch (e) {
      console.log(e);
    }
    let link = document.getElementById("link");
    for (let key in dataDb) {
      console.log(dataDb[key].mail);
      if (dataDb[key].mail === mail && dataDb[key].password === password) {
        dataDb[key].dateOFLastLogin = new Date();
        dataDb[key].isLogin = true
        link.href = "/main";
        console.log(dataDb[key]);
        axios
          .put(
            `https://webapp-9da92-default-rtdb.firebaseio.com/users/${key}.json`,
            dataDb[key]
          )
          .then((response) => {
            console.log(response);
            document.location.href = "http://localhost:3000/main";
          })
          .catch((err) => {
            console.log(err);
          });

      }
    }

  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="divAuth border p-3 d-flex justify-content-center align-items-center">
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <div className="text-center">
            <h2>Sign in</h2>
          </div>

          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setMail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-flex flex-row justify-content-center ">
          <NavLink
            id="link"
            to=""
            onClick={loginHandler}
            type="submit"
            className="btn btn-primary btn-lg"
          >
            Login
          </NavLink>
        </div>
        <NavLink
          to="/sign"
          className="d-flex flex-row justify-content-center mt-4"
          style={{ cursor: "pointer" }}
        >
          sign up
        </NavLink>
      </form>
    </div>
  );
};
