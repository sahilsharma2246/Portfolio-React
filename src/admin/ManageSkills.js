/* eslint-disable eqeqeq */

import React, { useEffect, useState } from "react";
import firedb from "../Firebase";
import "./ManageSkill.css";


function ManageSkill() {


  const [skill, setSkill] = useState("");

  const [skills, setSkills] = useState({});

  const [editId, setEditId] = useState("");





  useEffect(() => {

    loadSkills();

  }, []);





  const loadSkills = () => {


    firedb.child("Skills").on("value",(snapshot)=>{


      if(snapshot.val()!=null){

        setSkills(snapshot.val());

      }
      else{

        setSkills({});

      }


    });


  };






  const saveSkill = () => {


    if(skill.trim()===""){

      alert("Enter Skill Name");

      return;

    }



    if(editId){


      // Update Skill

      firedb
      .child(`Skills/${editId}`)
      .set(
        {
          name:skill
        },
        (err)=>{


          if(err){

            alert(err);

          }
          else{

            alert("Skill Updated Successfully");

            setSkill("");

            setEditId("");

          }


        }
      );



    }
    else{


      // Add Skill

      firedb
      .child("Skills")
      .push(
        {
          name:skill
        },
        (err)=>{


          if(err){

            alert(err);

          }
          else{

            alert("Skill Added Successfully");

            setSkill("");

          }


        }
      );


    }


  };







  const editSkill=(id)=>{


    setSkill(skills[id].name);

    setEditId(id);


    window.scrollTo({

      top:0,

      behavior:"smooth"

    });


  };







  const deleteSkill=(id)=>{


    firedb
    .child(`Skills/${id}`)
    .remove((err)=>{


      if(err){

        alert(err);

      }
      else{

        alert("Skill Deleted");

      }


    });


  };






return (

<div className="manage-skill">


<h2>
Manage Skills
</h2>




<div className="skill-form">


<input

type="text"

placeholder="Enter Skill"

value={skill}

onChange={(e)=>setSkill(e.target.value)}

/>




<button onClick={saveSkill}>

{
editId ? "Update Skill" : "Add Skill"
}

</button>


</div>







<div className="skill-list">


{

Object.keys(skills).map((id)=>(


<div

className="skill-card"

key={id}

>


<h3>
{skills[id].name}
</h3>



<div className="skill-actions">


<button

className="edit-btn"

onClick={()=>editSkill(id)}

>

Edit

</button>




<button

className="delete-btn"

onClick={()=>deleteSkill(id)}

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


export default ManageSkill;