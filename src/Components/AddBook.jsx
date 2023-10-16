import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useFormik } from "formik";
import '../Css/AddBook.css'
import SweetAlert2 from "sweetalert2"
import Spinner from "./Spinner"
import * as yup from 'yup'

export default function AddBook() {

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  
  let mytoken = localStorage.getItem('loginToken');
  let user_id = localStorage.getItem('user_id');  

  const formSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    author: yup.string().required('Author is required'),
    description: yup.string().required('Description is required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      description: '',
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {

      if (user_id === null) {
        SweetAlert2.fire({
          title: "Login Required",
          text: "You need to login to add a book.",
          icon: "warning",
          showConfirmButton: false,
          timer: 4000, 
        });

        // Redirect to login page after 4 seconds
        setTimeout(() => {
          navigate("/login");
        }, 4000);
        return; // Return early, do not submit form
      }
      
      let valuesToSend = {
        ...values,
        creator_id: parseInt(user_id),
      };
      
      try {
        let resp = await fetch("https://storycircleserver.onrender.com/books", {
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
              text: "Successfully added book",
              icon: "success",
              confirmButtonText: "Nice",
              confirmButtonColor: "#f1cc17",
            });
            navigate("/books")
          }, 2000);
        } else {
          let errorData = await resp.json();
          if (resp.status === 500) {
            // Internal Server Error - Database error
            setErrors("Internal server error. Please try again later.");
          } else if(resp.status == 400){
            setErrors("Book already exists.")
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
      <div className="">
        <div className="main-add-book-div">
          <div className="addBookDiv">
            <h1>Add a book to the site</h1>
            <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
              {/*Title*/}
              <label htmlFor="title">Book title</label>
              <br />
              <input
                id="title"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
              />
              {formik.touched.title && formik.errors.title ? (
                <div style={{ color: 'red' }}>{formik.errors.title}</div>
              ) : null}
              <br />
  
              {/* Author */}
              <label htmlFor="author">Author</label>
              <br />
              <input
                id="author"
                name="author"
                onChange={formik.handleChange}
                value={formik.values.author}
              />
              {formik.touched.author && formik.errors.author ? (
                <div style={{ color: 'red' }}>{formik.errors.author}</div>
              ) : null}
              <br />
  
              {/* Description*/}
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
                <button type="submit">Add Book</button>
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