/* eslint-disable eqeqeq */

import React, { useEffect, useState } from "react";
import firedb from "../Firebase";
import "./Manageprojects.css";


function ManageProjects() {


  const initialState = {

    title:"",
    description:"",
    image:"",
    tech:"",
    github:"",
    live:""

  };


  const [project,setProject] = useState(initialState);

  const [projects,setProjects] = useState({});

  const [editId,setEditId] = useState("");





  useEffect(()=>{

    loadProjects();

  },[]);






  const loadProjects = ()=>{


    firedb.child("Projects").on("value",(snapshot)=>{


      if(snapshot.val()!=null){

        setProjects(snapshot.val());

      }
      else{

        setProjects({});

      }


    });


  };







  const handleChange=(e)=>{


    setProject({

      ...project,

      [e.target.name]:e.target.value

    });


  };







  const saveProject=()=>{


    if(project.title===""){

      alert("Enter Project Title");

      return;

    }




    if(editId){


      // Update Project

      firedb
      .child(`Projects/${editId}`)
      .set(project,(err)=>{


        if(err){

          alert(err);

        }
        else{

          alert("Project Updated Successfully");

          setProject(initialState);

          setEditId("");

        }


      });



    }

    else{


      // Add Project

      firedb
      .child("Projects")
      .push(project,(err)=>{


        if(err){

          alert(err);

        }
        else{

          alert("Project Added Successfully");

          setProject(initialState);

        }


      });


    }



  };







  const editProject=(id)=>{


    setProject({

      ...projects[id]

    });


    setEditId(id);



    window.scrollTo({

      top:0,

      behavior:"smooth"

    });


  };







  const deleteProject=(id)=>{


    firedb
    .child(`Projects/${id}`)
    .remove((err)=>{


      if(err){

        alert(err);

      }
      else{

        alert("Project Deleted");

      }


    });


  };







return (

<div className="manage-projects">


<h2>
  Manage Projects
</h2>




<div className="project-form">



<input
type="text"
name="title"
placeholder="Project Title"
value={project.title}
onChange={handleChange}
/>




<textarea

name="description"

placeholder="Project Description"

value={project.description}

onChange={handleChange}

/>





<input

type="text"

name="image"

placeholder="Project Image URL"

value={project.image}

onChange={handleChange}

/>





<input

type="text"

name="tech"

placeholder="Tech Stack"

value={project.tech}

onChange={handleChange}

/>





<input

type="text"

name="github"

placeholder="Github URL"

value={project.github}

onChange={handleChange}

/>





<input

type="text"

name="live"

placeholder="Live Demo URL"

value={project.live}

onChange={handleChange}

/>





<button onClick={saveProject}>

{
 editId ? "Update Project" : "Add Project"
}

</button>




</div>






<div className="project-list">


{

Object.keys(projects).map((id)=>(


<div 
className="project-card"
key={id}
>


<h3>
{projects[id].title}
</h3>



<div>


<button

className="edit-btn"

onClick={()=>editProject(id)}

>

Edit

</button>




<button

className="delete-btn"

onClick={()=>deleteProject(id)}

>

Delete

</button>


</div>



</div>



))


}



</div>



</div>


);


}


export default ManageProjects;