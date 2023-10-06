import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useFormik } from "formik";
import '../Css/CreateClub.css'
import SweetAlert2 from "sweetalert2"
import Spinner from "./Spinner"
import * as yup from 'yup'

export default function CreateClub() {

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  
  let mytoken = localStorage.getItem('loginToken');
  let user_id = localStorage.getItem('user_id');  

  const formSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    location: yup.string().required('Location is required'),
    description: yup.string().required('Description is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      location: '',
      description: '',
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {

      if (user_id === null) {
        SweetAlert2.fire({
          title: "Login Required",
          text: "You need to login to create a club.",
          icon: "warning",
          showConfirmButton: false,
          timer: 4000, // Close after 4 seconds
        });

        // Redirect to login page after 4 seconds
        setTimeout(() => {
          navigate("/login");
        }, 4000);
        return; // Return early, do not submit form
      }
      
      let valuesToSend = {
        ...values,
        creator_id: user_id,
      };
      console.log(JSON.stringify(valuesToSend, null, 2))
      try {
        let resp = await fetch("https://storycircleserver.onrender.com/clubs", {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${mytoken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(valuesToSend, null, 2),
        });
  
        if (resp.ok) {
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
            SweetAlert2.fire({
              title: "Success!",
              text: "Successfully added club",
              icon: "success",
              confirmButtonText: "Nice",
              confirmButtonColor: "#f1cc17",
            });
            navigate("/clubs")
          }, 2000);
        } else {
          let errorData = await resp.json();
          if (resp.status === 500) {
            // Internal Server Error - Database error
            setErrors("Internal server error. Please try again later.");
          } else if(resp.status == 400){
            setErrors("Club already exists.")
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
      <div className="createClubBackgroundDiv">
        <div className="main-create-club-div">
          <div className="createClubDiv">
            <h1>Create your own club</h1>
            <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
              {/* Name */}
              <label htmlFor="name">Club Name</label>
              <br />
              <input
                id="name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div style={{ color: 'red' }}>{formik.errors.name}</div>
              ) : null}
              <br />
      
              {/* Location */}
              <label htmlFor="location">Location</label>
              <br />
              <input
                id="location"
                name="location"
                onChange={formik.handleChange}
                value={formik.values.location}
              />
              {formik.touched.location && formik.errors.location ? (
                <div style={{ color: 'red' }}>{formik.errors.location}</div>
              ) : null}
              <br />
      
              {/* Description */}
              <label htmlFor="description">Description</label>
              <br />
              <input
                id="description"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description ? (
                <div style={{ color: 'red' }}>{formik.errors.description}</div>
              ) : null}
              <br />
      
              {isLoading ? (
                <Spinner />
              ) : (
                <button type="submit">Create Club</button>
              )}
            </form>
            {Object.keys(errors).length > 0 && (
              <p style={{ color: "red" }}>{errors}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );  
}