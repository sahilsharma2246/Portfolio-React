/* eslint-disable eqeqeq */

import { useEffect, useState } from "react";
import firedb from "../Firebase";
import "./Skills.css";


function Skills() {


  const [skills, setSkills] = useState({});



  useEffect(() => {


    firedb.child("Skills").on("value", (snapshot)=>{


      if(snapshot.val() != null){

        setSkills(snapshot.val());

      }
      else{

        setSkills({});

      }


    });



    return () => {

      firedb.child("Skills").off();

    };


  }, []);





  return (


    <section className="skills-section">


      <div className="container">


        <h1 className="section-title">
          My Skills
        </h1>



        <p className="section-subtitle">
          Technologies and tools I work with
        </p>





        <div className="skills-container">


          {

            Object.keys(skills).map((id)=>{


              return (

                <div 
                  className="skill-box"
                  key={id}
                >


                  <h3>

                    {skills[id].name}

                  </h3>


                </div>

              )


            })

          }


        </div>



      </div>


    </section>


  );

}


export default Skills;