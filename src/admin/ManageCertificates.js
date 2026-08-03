/* eslint-disable eqeqeq */

import React, { useEffect, useState } from "react";
import firedb from "../Firebase";
import "./ManageCertificates.css";


function ManageCertificates() {


  const initialState = {

    title:"",
    issuer:"",
    image:"",
    link:""

  };


  const [certificate,setCertificate] = useState(initialState);

  const [certificates,setCertificates] = useState({});

  const [editId,setEditId] = useState("");






  useEffect(()=>{

    loadCertificates();

  },[]);







  const loadCertificates = ()=>{


    firedb.child("Certificates").on("value",(snapshot)=>{


      if(snapshot.val()!=null){

        setCertificates(snapshot.val());

      }
      else{

        setCertificates({});

      }


    });


  };







  const handleChange=(e)=>{


    setCertificate({

      ...certificate,

      [e.target.name]:e.target.value

    });


  };








  const saveCertificate=()=>{


    if(certificate.title===""){

      alert("Enter Certificate Name");

      return;

    }





    if(editId){


      firedb
      .child(`Certificates/${editId}`)
      .set(certificate,(err)=>{


        if(err){

          alert(err);

        }
        else{

          alert("Certificate Updated Successfully");

          setCertificate(initialState);

          setEditId("");

        }


      });



    }

    else{


      firedb
      .child("Certificates")
      .push(certificate,(err)=>{


        if(err){

          alert(err);

        }
        else{

          alert("Certificate Added Successfully");

          setCertificate(initialState);

        }


      });


    }


  };








  const editCertificate=(id)=>{


    setCertificate({

      ...certificates[id]

    });


    setEditId(id);



    window.scrollTo({

      top:0,

      behavior:"smooth"

    });


  };







  const deleteCertificate=(id)=>{


    firedb
    .child(`Certificates/${id}`)
    .remove((err)=>{


      if(err){

        alert(err);

      }
      else{

        alert("Certificate Deleted");

      }


    });


  };






  return (


    <div className="manage-certificates">


      <h2>
        Manage Certificates
      </h2>





      <div className="certificate-form">


        <input

          type="text"

          name="title"

          placeholder="Certificate Title"

          value={certificate.title}

          onChange={handleChange}

        />



        <input

          type="text"

          name="issuer"

          placeholder="Issued By"

          value={certificate.issuer}

          onChange={handleChange}

        />



        <input

          type="text"

          name="image"

          placeholder="Certificate Image URL"

          value={certificate.image}

          onChange={handleChange}

        />



        <input

          type="text"

          name="link"

          placeholder="Certificate Link"

          value={certificate.link}

          onChange={handleChange}

        />





        <button onClick={saveCertificate}>

          {
            editId 
            ? "Update Certificate" 
            : "Add Certificate"
          }

        </button>



      </div>








      <div className="certificate-list">


        {

          Object.keys(certificates).map((id)=>(


            <div 
              className="certificate-card"
              key={id}
            >



              <h3>
                {certificates[id].title}
              </h3>



              <p>
                {certificates[id].issuer}
              </p>





              <div className="certificate-actions">


                <button

                  className="edit-btn"

                  onClick={()=>editCertificate(id)}

                >

                  Edit

                </button>





                <button

                  className="delete-btn"

                  onClick={()=>deleteCertificate(id)}

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


export default ManageCertificates;