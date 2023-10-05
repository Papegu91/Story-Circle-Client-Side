import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useFormik } from "formik";
import '../Css/LogIn.css'
import SweetAlert2 from "sweetalert2"
import Spinner from "../Components/Spinner"
import * as yup from 'yup'

export default function LogIn() {

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const formSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {

      try {
        let resp = await fetch("http://localhost:5555/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values, null , 2),
        });
  
        if (resp.ok) {
          let re = await resp.json();
          localStorage.setItem("loginToken", re.access_token) // sets token to local storage
          localStorage.setItem("user_id", re.user_id)
          console.log(re)  
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
            SweetAlert2.fire({
              title: "Success!",
              text: "Log In is successful, welcome to story circle",
              icon: "success",
              confirmButtonText: "Nice",
              confirmButtonColor: "#f1cc17",
            });
            navigate("/clubs")
          }, 2000);
        } else {
          let errorData = await resp.json();
          if (resp.status === 500 || resp.status === 401 ) {
            // Internal Server Error - Database error
            setErrors("Invalid username or password.");
          } else {
            setErrors(errorData.message);
          }
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    },
  });

  return (
    <>
      <div className="logInBackgroundDiv">
        <div className="logInDiv">
          <h1>Log In</h1>
          <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
            {/* Username */}
            <label htmlFor="username">Username</label>
            <br />
            <input
              id="username"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div style={{ color: 'red' }}>{formik.errors.username}</div>
            ) : null}
            <br />
  
            {/* Password */}
            <label htmlFor="password">Password</label>
            <br />
            <input
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: 'red' }}>{formik.errors.password}</div>
            ) : null}
            <br />
  
            {isLoading ? (
              <Spinner />
            ) : (
              <button type="submit">Log In</button>
            )}
          </form>
          {Object.keys(errors).length > 0 && (
            <p style={{ color: "red" }}>{errors}</p>
          )}
          <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
        </div>
      </div>
    </>
  );  
}