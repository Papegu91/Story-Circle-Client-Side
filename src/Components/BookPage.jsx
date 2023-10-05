import React, { useEffect, useState } from 'react';
import '../Css/BookPage.css';
import { useParams, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from "formik";

export default function BookPage() {
  const book_id = useParams(); 
  const navigate = useNavigate();
  const [book, setBook] = useState({});
  const [fetchEr, setFetchEr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageErrors] = useState(null);

  let mytoken = localStorage.getItem('loginToken');
  let user_id = localStorage.getItem('user_id');  

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:5555/books/${book_id.index}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${mytoken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Kindly check your network and reload again.');
        } else if (res.status === 500 || res.status === 404 || res.status === 401) {
          return res.json().then(data => {
            throw new Error(data.message);
          });
        }
        return res.json();
      })
      .then((data) => {
        setBook(data);
      })
      .catch((error) => {
        setFetchEr(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [book_id, mytoken]);

  const formSchema = yup.object().shape({
    comment: yup.string().required('Comment is required'),
    rating: yup
      .number()
      .required('Rating is required')
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating must be at most 5'),
  });
  

  const formik = useFormik({
    initialValues: {
      comment: '',
      rating: '',
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {

      if (user_id === null) {
        SweetAlert2.fire({
          title: "Login Required",
          text: "You need to login to leave a comment on a book.",
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
        user_id: user_id,
        book_id: book_id,
      };

      try {
        let resp = await fetch("http://localhost:5555/bookcomments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(valuesToSend, null, 2),
        });

        if (resp.ok) {
          window.location.reload(); // Reload the page on success
        } else {
          let errorData = await resp.json();
          if (resp.status === 500 || resp.status === 401) {
            // Internal Server Error - Database error
            setMessageErrors("Error in server");
          } else {
            setMessageErrors(errorData.message);
          }
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    },
  });

  function getStars(rating) {
    const maxRating = 5;
    const blackStar = "★";
    const emptyStar = "☆";

    if (rating < 1 || rating > maxRating) {
        throw new Error("Rating should be between 1 and 5.");
    }

    const fullStars = blackStar.repeat(Math.floor(rating));
    const remainingStars = emptyStar.repeat(maxRating - Math.floor(rating));

    return fullStars + remainingStars;
}

  return (
<>
    {loading ? (
      <div>Loading...</div>
    ) : fetchEr ? (
      <div className="error-message">{fetchEr.message}</div>
    ) : (
      <div className='main-book-div'>
        <div className='image-title-div-books'>
          <h1>{book.title}</h1>
        </div>
        <div className='book-info-div'>
          <h2 style={{ fontSize:'45px' }}>   {book.author}</h2>
          <p style={{ fontSize:'18px' }}>{book.description}</p>
        </div>
        <div className='book-comments-div'>
          <div className='comments-holder'>
            <div className='title-div'>
              <h1>Comments</h1>
            </div>
            <div className='comments-holder'>
              {book.comments && (
                book.comments.map(comment => (
                  <div key={comment.id}>
                    <p>User: {comment.username}</p>
                    <p>Comment: {comment.comment}</p>
                    <p>Rating: {getStars(comment.rating)}</p>
                  </div>
                ))
              )}
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="input-container">
                <label htmlFor="comment">Comment</label>
                <br />
                <input
                  id="comment"
                  name="comment"
                  onChange={formik.handleChange}
                  value={formik.values.comment}
                />
                <label htmlFor="rating">Rating</label>
                <br />
                <input
                  id="rating"
                  name="rating"
                  type='number'
                  min={1}
                  max={5}
                  onChange={formik.handleChange}
                  value={formik.values.rating}
                />
                <button type="submit">Add comment</button>
              </div>
              {formik.touched.comment && formik.errors.comment ? (
                <div style={{ color: 'red' }}>{formik.errors.comment}</div>
              ) : null}
              {formik.touched.rating && formik.errors.rating ? (
                <div style={{ color: 'red' }}>{formik.errors.rating}</div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    )}
  </>
);

}