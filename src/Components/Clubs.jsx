import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Clubs.css';
import ClubItem from './ClubItem';
import SweetAlert2 from "sweetalert2"


export default function Clubs() {
  const navigate = useNavigate(); 
  const [clubs, setClubs] = useState([]);
  const [fetchEr, setFetchEr] = useState(null);
  const [loading, setLoading] = useState(false);

  let mytoken = localStorage.getItem('loginToken')

  useEffect(() => {
    setLoading(true);

    fetch('https://storycircleserver.onrender.com/clubs', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${mytoken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Kindly check your network and reload again.');
        } else if(res.status == 500 || res.status == 404 || res.status == 401 ){
          let errorData = res.json();
          setFetchEr(errorData.error)
        }
        return res.json();
      })
      .then((data) => {
        setClubs(data);
      })
      .catch((error) => {
        setFetchEr(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className='text-div'>
        <button
          className='create-club-button'
          onClick={() => navigate('/create-club')}
        >
          Create your club
        </button>
        <h1>Find a book club near you.</h1>
      </div>
      <div className='club-items-holder'>
        {loading ? (
                  <h1>Loading ...</h1>
        ) : fetchEr ? (
          // Render error message if fetchEr is set
          <div className="error-message">{fetchEr.message}</div> // Apply error message class
          ) : (
          clubs.map((club) => {
            return <ClubItem club={club} key={club.id} />;
          })
        )}
      </div>
    </>
  );
}
