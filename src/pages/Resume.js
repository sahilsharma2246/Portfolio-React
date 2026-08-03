/* eslint-disable eqeqeq */

import { useEffect, useState } from "react";
import firedb from "../Firebase";
import "./Resume.css";


function Resume() {


  const [profile,setProfile] = useState({});



  useEffect(()=>{


    firedb.child("Profile").on("value",(snapshot)=>{


      if(snapshot.val()!=null){

        setProfile(snapshot.val());

      }


    });



    return ()=>{

      firedb.child("Profile").off();

    };


  },[]);






  return (

    <section className="resume">


      <div className="container">


        <div className="section-title">


          <h2>
            Resume
          </h2>


          <p>
            View or download my latest resume.
          </p>


        </div>







        <div className="resume-content">





          <div className="resume-card">


            <h3>
              {profile.name}
            </h3>





            <h4>
              {profile.title}
            </h4>





            <p>

              {profile.about}

            </p>





            <div className="resume-buttons">



              <a

                href={profile.resume}

                target="_blank"

                rel="noopener noreferrer"

                className="btn"

              >

                View Resume

              </a>






              <a

                href={profile.resume}

                download

                className="btn btn-outline"

              >

                Download Resume

              </a>




            </div>



          </div>








          <div className="resume-preview">


            {

              profile.resume &&

              <iframe

                src={profile.resume}

                title="Resume Preview"

              ></iframe>

            }


          </div>





        </div>



      </div>


    </section>


  );

}


export default Resume;