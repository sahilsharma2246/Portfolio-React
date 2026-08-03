/* eslint-disable eqeqeq */

import { useEffect, useState } from "react";
import firedb from "../Firebase";
import "./Projects.css";


function Projects() {


  const [projects, setProjects] = useState({});



  useEffect(() => {


    firedb.child("Projects").on("value", (snapshot)=>{


      if(snapshot.val()!=null){

        setProjects(snapshot.val());

      }
      else{

        setProjects({});

      }


    });



    return ()=>{

      firedb.child("Projects").off();

    };


  }, []);





  return (


    <section className="projects-section">


      <div className="container">


        <h1 className="section-title">
          My Projects
        </h1>


        <p className="section-subtitle">
          Some of my recent work and applications
        </p>





        <div className="projects-container">


        {

          Object.keys(projects).map((id)=>(


            <div 
              className="project-card"
              key={id}
            >



              <img

                src={projects[id].image}

                alt={projects[id].title}

              />




              <div className="project-content">


                <h2>
                  {projects[id].title}
                </h2>




                <p>
                  {projects[id].description}
                </p>





                <span className="tech">

                  {projects[id].tech}

                </span>






                <div className="project-links">


                  <a

                    href={projects[id].live}

                    target="_blank"

                    rel="noreferrer"

                  >

                    Live Demo

                  </a>





                  <a

                    href={projects[id].github}

                    target="_blank"

                    rel="noreferrer"

                  >

                    Source Code

                  </a>



                </div>



              </div>




            </div>


          ))


        }


        </div>


      </div>


    </section>


  );

}


export default Projects;