/* eslint-disable eqeqeq */

import { useEffect, useState } from "react";
import firedb from "../Firebase";
import "./Contact.css";


function Contact() {


  const [profile,setProfile] = useState({});



  const [form,setForm] = useState({

    name:"",
    email:"",
    subject:"",
    message:""

  });





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







  const handleChange=(e)=>{


    setForm({

      ...form,

      [e.target.name]:e.target.value

    });


  };








  const handleSubmit=(e)=>{


    e.preventDefault();




    firedb
    .child("Messages")
    .push(form,(err)=>{


      if(err){

        alert(err);

      }
      else{


        alert("Message Sent Successfully");


        setForm({

          name:"",
          email:"",
          subject:"",
          message:""

        });


      }


    });


  };







  return (


    <section className="contact">


      <div className="container">





        <div className="section-title">


          <h2>
            Contact Me
          </h2>


          <p>
            Let's discuss your next project.
          </p>


        </div>







        <div className="contact-container">






          <div className="contact-info">


            <h3>
              Get In Touch
            </h3>



            <p>

              Feel free to contact me for freelance work,
              internships or collaboration.

            </p>






            <div className="info">

              <strong>
                Email
              </strong>


              <span>
                {profile.email}
              </span>


            </div>







            <div className="info">

              <strong>
                Phone
              </strong>


              <span>
                {profile.phone}
              </span>


            </div>







            <div className="info">

              <strong>
                Location
              </strong>


              <span>
                {profile.location}
              </span>


            </div>






          </div>









          <form

          className="contact-form"

          onSubmit={handleSubmit}

          >






          <input

          type="text"

          name="name"

          placeholder="Your Name"

          value={form.name}

          onChange={handleChange}

          required

          />







          <input

          type="email"

          name="email"

          placeholder="Your Email"

          value={form.email}

          onChange={handleChange}

          required

          />







          <input

          type="text"

          name="subject"

          placeholder="Subject"

          value={form.subject}

          onChange={handleChange}

          required

          />








          <textarea

          name="message"

          rows="6"

          placeholder="Your Message"

          value={form.message}

          onChange={handleChange}

          required

          ></textarea>







          <button

          type="submit"

          className="btn"

          >

          Send Message

          </button>






          </form>







        </div>





      </div>


    </section>


  );

}


export default Contact;