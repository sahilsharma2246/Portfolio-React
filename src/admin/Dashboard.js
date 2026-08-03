/* eslint-disable eqeqeq */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import firedb from "../Firebase";
import "./Dashboard.css";


function Dashboard() {


  const [count,setCount] = useState({

    projects:0,

    skills:0,

    certificates:0,

    messages:0,

    profile:0

  });






  useEffect(()=>{


    firedb.child("Projects").on("value",(snapshot)=>{


      setCount(prev=>({

        ...prev,

        projects:snapshot.val()
        ? Object.keys(snapshot.val()).length
        : 0

      }));


    });






    firedb.child("Skills").on("value",(snapshot)=>{


      setCount(prev=>({

        ...prev,

        skills:snapshot.val()
        ? Object.keys(snapshot.val()).length
        : 0

      }));


    });






    firedb.child("Certificates").on("value",(snapshot)=>{


      setCount(prev=>({

        ...prev,

        certificates:snapshot.val()
        ? Object.keys(snapshot.val()).length
        : 0

      }));


    });







    firedb.child("Messages").on("value",(snapshot)=>{


      setCount(prev=>({

        ...prev,

        messages:snapshot.val()
        ? Object.keys(snapshot.val()).length
        : 0

      }));


    });







    firedb.child("Profile").on("value",(snapshot)=>{


      setCount(prev=>({

        ...prev,

        profile:snapshot.val()
        ? 1
        : 0

      }));


    });







    return ()=>{


      firedb.child("Projects").off();

      firedb.child("Skills").off();

      firedb.child("Certificates").off();

      firedb.child("Messages").off();

      firedb.child("Profile").off();


    };



  },[]);









  return (


    <div className="dashboard">



      <h1>
        Welcome Admin 👋
      </h1>



      <p>
        Manage your portfolio from here.
      </p>






      <div className="card-container">






        <div className="dashboard-card">

          <h2>
            Projects
          </h2>

          <h3>
            {count.projects}
          </h3>

          <Link to="/dashboard/projects">
            Manage
          </Link>

        </div>







        <div className="dashboard-card">

          <h2>
            Skills
          </h2>

          <h3>
            {count.skills}
          </h3>


          <Link to="/dashboard/skills">
            Manage
          </Link>


        </div>








        <div className="dashboard-card">

          <h2>
            Certificates
          </h2>


          <h3>
            {count.certificates}
          </h3>


          <Link to="/dashboard/certificates">
            Manage
          </Link>


        </div>








        <div className="dashboard-card">

          <h2>
            Messages
          </h2>


          <h3>
            {count.messages}
          </h3>


          <Link to="/dashboard/messages">
            View
          </Link>


        </div>








        <div className="dashboard-card">


          <h2>
            Profile
          </h2>


          <h3>
            {count.profile}
          </h3>


          <Link to="/dashboard/profile">
            Edit
          </Link>


        </div>





      </div>





    </div>


  );

}


export default Dashboard;