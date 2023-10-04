import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useFormik } from "formik";
import '../Css/SignUp.css'
import SweetAlert2 from "sweetalert2"
import Spinner from "../Components/Spinner"
import * as yup from 'yup'

export default function SignUp() {

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const formSchema = yup.object().shape({
    first_name: yup.string().required('First Name is required'),
    last_name: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
    profile_pic: yup.string().url('Invalid URL'),
  });

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      profile_pic: null,
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {

      if (values.profile_pic === '') {
        values.profile_pic = null;
      }

      try {
        let resp = await fetch("http://localhost:5555/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values, null , 2),
        });
  
        if (resp.ok) {
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
            SweetAlert2.fire({
              title: "Success!",
              text: "Registration is successful, please log in to continue",
              icon: "success",
              confirmButtonText: "Nice",
              confirmButtonColor: "#f1cc17",
            });
            navigate("/login")
          }, 2000);
        } else {
          let errorData = await resp.json();
          if (resp.status === 500) {
            // Internal Server Error - Database error
            setErrors("Internal server error. Please try again later.");
          } else if(resp.status == 400){
            setErrors("Username or email already exists.")
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
    <div className="signUpDiv">
      <h1>Sign Up </h1>
      <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        {/* First Name */}
        <label htmlFor="first_name">First Name</label>
        <br />
        <input
          id="first_name"
          name="first_name"
          onChange={formik.handleChange}
          value={formik.values.first_name}
          required
        />
        {formik.touched.first_name && formik.errors.first_name? (
          <div style={{ color: 'red' }}>{formik.errors.first_name}</div>
        ) : null}
        <br />

        {/* Last Name */}
        <label htmlFor="last_name">Last Name</label>
        <br />
        <input
          id="last_name"
          name="last_name"
          onChange={formik.handleChange}
          value={formik.values.last_name}
        />
        {formik.touched.last_name && formik.errors.last_name ? (
          <div style={{ color: 'red' }}>{formik.errors.last_name}</div>
        ) : null}
        <br />

        {/* Email */}
        <label htmlFor="email">Email Address</label>
        <br />
        <input
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div style={{ color: 'red' }}>{formik.errors.email}</div>
        ) : null}
        <br />

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

        {/* Profile Picture URL */}
        <label htmlFor="profile_pic">Profile Picture URL</label>
        <br />
        <input
          id="profile_pic"
          name="profile_pic"
          onChange={formik.handleChange}
          value={formik.values.profile_pic}
        />
        {formik.touched.profile_pic && formik.errors.profile_pic ? (
          <div style={{ color: 'red' }}>{formik.errors.profile_pic}</div>
        ) : null}
        <br />

        {isLoading ? (
          <Spinner />
        ) : (
          <button type="submit">Sign Up</button>
        )}
      </form>
      {Object.keys(errors).length > 0 && (
        <p style={{ color: "red" }}>{errors}</p>
      )}
          <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}
