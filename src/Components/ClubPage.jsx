import React, { useEffect, useState } from 'react';
import '../Css/ClubPage.css';
import { useParams, useNavigate } from 'react-router-dom';
import BookItem from './BookItem';
import * as yup from 'yup';
import { useFormik } from "formik";
import SweetAlert2 from "sweetalert2"

export default function ClubPage() {
  const club_id  = useParams();
  const navigate = useNavigate();
  const [club, setClub] = useState({});
  const [fetchEr, setFetchEr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageErrors] = useState(null);

  let mytoken = localStorage.getItem('loginToken');
  let user_id = localStorage.getItem('user_id');
  
  useEffect(() => {
    setLoading(true);

    fetch(`https://storycircleserver.onrender.com/clubs/${club_id.index}`, {
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
        setClub(data);
      })
      .catch((error) => {
        setFetchEr(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [club_id, mytoken]);

  const formSchema = yup.object().shape({
    message: yup.string().required('Message is required'),
  });

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {

      if (user_id === null) {
        SweetAlert2.fire({
          title: "Login Required",
          text: "You need to login to send messages within a club.",
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
        sender_id: parseInt(user_id),
        club_id: parseInt(club_id.index),
      };
      console.log( JSON.stringify(valuesToSend, null, 2))

      try {
        let resp = await fetch("https://storycircleserver.onrender.com/messages", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${mytoken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(valuesToSend, null, 2),
        });

        if (resp.ok) {
          formik.resetForm();
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

  return (
<>
    {loading ? (
      <div>Loading...</div>
    ) : fetchEr ? (
      <div className="error-message">{fetchEr.message}</div>
    ) : (
      <div className='main-club-div'>
        <div className='image-title-div'>
          <h1>{club.name}</h1>
        </div>
        <div className='club-info-div'>
          <h2> <i class="fa-solid fa-location-dot"></i>  {club.location}</h2>
          <p>{club.description}</p>
          <h1>Club Founder:</h1>
          {club.creator && (
            <p>{club.creator.first_name} {club.creator.last_name}</p>
          )}
          <h1>Club Members :</h1>
          {club.members && (
            <ul>
              {club.members.map(member => (
                <li key={member.id}>{member.username}</li>
              ))}
            </ul>
          )}
        </div>
        <div className='current-book-div'>
          <h1>Current book :</h1>
          {club.current_book && (
            <BookItem book={club.current_book} />
          )}
        </div>
        <div className='previous-books-div'>
          <h1>Previously read books : </h1>
          {club.previous_books && (
            club.previous_books.map(prevBook => (
              <div key={prevBook.book.id}>
                <BookItem book={prevBook.book} />
              </div>
            ))
          )}
        </div>
        <div className='club-messages-div'>
          <div className='messages-holder'>
            <div className='title-div'>
              <h1>{club.name} Message Channel</h1>
            </div>
            <div className='messages-holder'>
              {club.messages && (
                club.messages.map(message => (
                  <div key={message.id}>
                    <p>Sender: {message.sender}</p>
                    <p>Message: {message.message}</p>
                    <p>Created At: {message.created_at}</p>
                  </div>
                ))
              )}
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="input-container">
                <input
                  id="message"
                  name="message"
                  onChange={formik.handleChange}
                  value={formik.values.message}
                />
                <button type="submit">Send Message</button>
              </div>
              {formik.touched.message && formik.errors.message ? (
                <div style={{ color: 'red' }}>{formik.errors.message}</div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    )}
  </>
);

}
