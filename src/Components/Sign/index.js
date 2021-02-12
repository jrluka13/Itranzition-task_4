import React, { useState } from "react";
import "./style.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
export const Sign = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const registerHandler = async () => {
    const authData = {
      email: mail,
      password: password,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post(
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDn28xLcqICghX4qgTbHLgrDtVFS1LqIwQ",
        authData
      );
      console.log(response.data);
      postData();


    } catch (e) {
      console.log(e);
    }


  };

  const postData = ()=>{
    const data = {
      mail:mail,
      password:password,
      name:name,
      dateOfSign: new Date(),
      dateOFLastLogin:'',
      status:'unblock',
      isLogin:false
    }
    axios.post('https://webapp-9da92-default-rtdb.firebaseio.com/users.json',data)
    .then(response=>{
      console.log(response)
      document.location.href = "http://localhost:3000/";
    })
    .catch(error => console.log(error))
  }

  const submitHandler = event => {
    event.preventDefault()
  }

  return (
    <div className="divSign divAuth border p-5 d-flex justify-content-center align-items-center">
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <h2 className="text-center">Registry</h2>
          <label htmlFor="exampleInputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName"
            aria-describedby="emailHelp"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
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
        <div className="d-flex flex-row justify-content-center">
          <button
            onClick={registerHandler}
            className="btn btn-primary btn-lg">
            Sign up
          </button>
        </div>
        <NavLink
          to="/"
          className="d-flex flex-row justify-content-center mt-4"
          style={{ cursor: "pointer" }}
        >
          sign in
        </NavLink>
      </form>
    </div>
  );
};
