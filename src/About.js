import React from "react";
import Navbar from "./Navbar";
const About = () => {
  return (
    <div className="about-page">
      <Navbar />
      <h1 className="heading1">About</h1>
      <section className=" about-section">
        <article className=" about-container">
          <img id="about-img" src="./images/about.jpg" alt="" />
        </article>
        <article className=" about-container">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias
          quibusdam deserunt quia, reprehenderit libero assumenda obcaecati nisi
          repudiandae saepe tempora tempore. Atque natus libero earum
          accusantium unde, nulla voluptatum ab deserunt, recusandae repellat,
          aperiam consequuntur eveniet a vitae. Architecto cumque nemo placeat
          dolores debitis minus dolor quis nam, necessitatibus deserunt dolorem
          magnam voluptates vitae? Non, rerum consequuntur cupiditate cum
          tempora nihil recusandae accusamus sunt, quasi nam aspernatur
          reiciendis sapiente unde dignissimos ad laboriosam repellat. Et,
          facere dolor eveniet itaque repellendus dolorem obcaecati
          reprehenderit excepturi odio, repellat quam quae harum quas quos
          molestiae ducimus voluptate perspiciatis saepe quasi fugiat ad sequi.
        </article>
      </section>
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <span className="text-muted">© 2021 Company, Inc</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default About;
