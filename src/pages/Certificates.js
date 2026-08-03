/* eslint-disable eqeqeq */

import { useEffect, useState } from "react";
import firedb from "../Firebase";
import "./Certificates.css";


function Certificates() {


  const [certificates, setCertificates] = useState({});



  useEffect(() => {


    firedb.child("Certificates").on("value", (snapshot)=>{


      if(snapshot.val()!=null){

        setCertificates(snapshot.val());

      }
      else{

        setCertificates({});

      }


    });



    return ()=>{

      firedb.child("Certificates").off();

    };


  }, []);






  return (


    <section className="certificates-section">


      <div className="container">


        <h1 className="section-title">

          My Certificates

        </h1>



        <p className="section-subtitle">

          Certifications and achievements that showcase my skills

        </p>






        <div className="certificates-container">


        {

          Object.keys(certificates).map((id)=>(


            <div

              className="certificate-card"

              key={id}

            >



              <img

                src={certificates[id].image}

                alt={certificates[id].title}

              />




              <div className="certificate-content">


                <h2>

                  {certificates[id].title}

                </h2>




                <p>

                  Issued by: {certificates[id].issuer}

                </p>





                <a

                  href={certificates[id].link}

                  target="_blank"

                  rel="noreferrer"

                  className="certificate-btn"

                >

                  View Certificate

                </a>



              </div>



            </div>


          ))

        }


        </div>



      </div>


    </section>


  );

}


export default Certificates;