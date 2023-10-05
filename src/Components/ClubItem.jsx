import React from 'react';
import { useNavigate } from 'react-router-dom';
import SweetAlert2 from 'sweetalert2';

export default function ClubItem({club}) {
  let mytoken = localStorage.getItem('loginToken');
  let user_id = localStorage.getItem('user_id');
  
  const navigate = useNavigate(); 

  async function handleJoinClick(clubID) {

    if (user_id === null) {
      SweetAlert2.fire({
        title: "Login Required",
        text: "You need to login to join a club.",
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

    const values = { 
      club_id: clubID, 
      user_id: user_id,
    };

    try {
      let resp = await fetch('http://localhost:5555/joinclub', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${mytoken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values, null, 2),
      });

      if (resp.ok) {
        let re = await resp.json();
        console.log(re);
        setTimeout(() => {
          SweetAlert2.fire({
            title: 'Success!',
            text: 'Join club is successful, welcome to story circle',
            icon: 'success',
            confirmButtonText: 'Welcome',
            confirmButtonColor: '#f1cc17',
          });
          navigate(`/clubs/${clubID}`); // Navigate to the specific club
        }, 2000);
      } else {
        let errorData = await resp.json();
        if (resp.status === 500 || resp.status === 401) {
          SweetAlert2.fire({
            title: 'Error!',
            text: 'Join failed try again later.',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#f1cc17',
          });
        } else {
          SweetAlert2.fire({
            title: 'Error!',
            text: errorData.message,
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#f1cc17',
          });
        }
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }
  return (
    <>
      <div className="clubContainer" onClick={() => navigate(`/clubs/${club.id}`)}>
        <div className='iconDiv'>
          <i class="fa-solid fa-users" style={{ fontSize: '20px' }}></i>
        </div>
        <div className='clubTextDiv'>
          <h2>{club.name}</h2>
          <h2> <i class="fa-solid fa-location-dot"></i>   {club.location}</h2>
        </div>
        <div className='joinButtonDiv'>
          <button onClick={() => handleJoinClick(club.id)}>Join</button>
        </div>
      </div>
    </>
  )
}
