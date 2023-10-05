import React from 'react'
import '../Css/AboutPage.css'
import Footer from "./Footer";

export default function AboutPage() {

  const communityContent = [
    {
      src: "https://tinyurl.com/2xxbfbf6",
      title: "Parent-Child Book Club",
      description:
        "Discover new friends, new perspectives, and a deeper love for books. Elevate your reading journey with us.",
    },
    {
      src: "https://tinyurl.com/yk7udql6",
      title: "General Book Club",
      description:
        "Explore diverse genres and engage in thought-provoking discussions in our passionate reader community.",
    },
    {
      src: "https://tinyurl.com/ytcqh4md",
      title: "Author-Specific Book Club",
      description:
        "Unite with readers worldwide, encourage diverse literary exploration, and foster meaningful connections through the love of literature.",
    },
  ];

  const testimonials = [
    {
      src: "https://tinyurl.com/ystxfs5z",
      testimonial:
        "I had a fantastic experience with this book club. The discussions are engaging, and I've met wonderful people who share my love for reading.",
    },
    {
      src: "https://tinyurl.com/yux7ecza",
      testimonial:
        "Joining this book club was the best decision I made. The diverse selection of books and the sense of community are amazing!",
    },
    {
      src: "https://tinyurl.com/yw8ona2o",
      testimonial:
        "This book club offers a unique opportunity to explore various genres and engage in insightful discussions. I've grown as a reader and made great friends.",
    },
    {
      src: "https://tinyurl.com/yp6uzzsu",
      testimonial:
        "The book club's diverse community has enriched my reading experience. The selection of books is outstanding, and the discussions are thought-provoking.",
    },
    {
      src: "https://tinyurl.com/yu34gbbg",
      testimonial:
        "I've been a part of many book clubs, but this one stands out. It's not just about reading; it's about forming connections and expanding horizons.",
    },
    {
      src: "https://tinyurl.com/ystxfs5z",
      testimonial:
        "The book club has provided me with an incredible platform to explore new books and meet like-minded individuals. It's been a rewarding experience.",
    },
  ];

  return (
    <>
    <div>
      <div className="container">
        <h2 className="title">Why Choose Us?</h2>
        <p className="description">
          With Over a Decade of Expertise, an Array of Book Club Offerings,
          Unbeatable Value, and Tailored Reading Experiences
        </p>
        <div className="content-container">
          <div className="content">
            <img
              src="https://www.tourmyindia.com/imgnew/experience.svg"
              alt="not found"
              width={80}
            />
            <p className="content-description">
              Choose our book club for an enriching literary experience like no
              other. Join a passionate community of readers, explore diverse
              genres, and engage in thought-provoking discussions. Discover new
              friends, new perspectives, and a deeper love for books. Elevate
              your reading journey with us.
            </p>
          </div>
          <div className="content">
            <img
              src="https://www.tourmyindia.com/imgnew/positive-customer-feedback.svg"
              alt="not found"
              width={80}
            />
            <p className="description">
              Fostering a vibrant community of readers, our mission is to
              inspire, connect, and enrich lives through the joy of books.
            </p>
          </div>
          <div className="content">
            <img
              src="https://www.tourmyindia.com/imgnew/recognition-tour-01.svg"
              alt="not found"
              width={80}
            />
            <p className="content-description">
              Our vision is to create a thriving book club that unites readers
              worldwide, encourages diverse literary exploration, and fosters
              meaningful connections through the love of literature.
            </p>
          </div>
        </div>
      </div>
      <div className="container">
        <h2 className="title">Discover Your Community.</h2>
        <div className="content-container">
          {communityContent.map((item, index) => (
            <div key={index} className="content">
              <img
                src={item.src}
                alt="not found"
                key={item.index}
                loading="lazy"
                width={350}
              />
              <p className="content-description">{item.description}</p>
              <h2 className="title">{item.title}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="container">
        <h2 className="title">Testimonials</h2>
        <div className="content-container testimonials-container">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial">
              <p className="testimonial-text">{testimonial.testimonial}</p>
              <img
                src={testimonial.src}
                alt="User"
                width={80}
                className="testimonial-image"
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>                
    </>
    )
}

