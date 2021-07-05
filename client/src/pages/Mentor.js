import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import logo from "./Images/cyf_logo.jpeg";


const Mentor = (props) => {

const [updateCompetency, setUpdateCompetency] = useState({lesson: "", obj_id: 0, competencyId: 0, user:{}});
const [competency , setCompetency] = useState([]);
const handleChange = (event) => {

    //     // const { Student, value } = event.target;
    //     // setValues({
    //     //   ...values,
    //     //   [Student]: value,
    //     // })
  };
  useEffect(() => {
    fetch('api/competency')
    .then((result) => result.json())
    .then((competency) => {
        setCompetency(competency);
        console.log(competency)
        fetch('api/studentsPage')
        .then((result) => result.json())
        .then((lessons) => {
            // console.log(lessons);
            setLessons(lessons)
        })
    })
    
}, [])
  
  return (
    <>      
    <div className="header">
        <div className="logo-image">
          <img className="image" src={logo} alt="cyf_logo" />
        </div>
        <h2>Mentor Overview</h2>
      </div>
      <div className="Mentor-Name">
        <h2>{props.user.userName}</h2>
        <div className="Mlogout">
          <Link className="mentor-logout-link" to="/">
            Log out
          </Link>
        </div>
      </div>
      <div>
        <h2 className="dropdown"> Select Student</h2>
      </div>
      <div className="main-dropdown">
        <select className="Stulabel" name="Student" onChange={handleChange}>
          {/* {Student.map((s, index)=>{
            <option  key = {index} value={index}>{s}</option>;
          })} */}
          <option className="option">Select Student</option>
          <option value="student1">Student 1</option>
          <option value="student2">Student 2</option>
        </select>
      </div>
      <div className="mentor-sentence">
        <label className="Objtitle" for="fname">
          <h2>New Objectives</h2>
        </label>
        <p>
          <h3>
            As a Mentor you have the opportunity to add new objectives for each
            subject. Please note, you cannot amend this once the course has
            begun.
          </h3>
        </p>
      </div>
      <div>
        <form action="/action_page.php" method="post">
          <br></br>
          <input
            type="text"
            id="NewObj"
            className="new-obj"
            name="fname"
            placeholder="Insert new objectives here"
          ></input>
          <input
            className="submitbutn"
            type="submit"
            formtarget="_blank"
            value="Submit to subject"
          ></input>
          <input
            className="deletebutn"
            type="submit"
            formtarget="_blank"
            value="Delete"
          ></input>
        </form>
      </div>

      <div className="skills-btn-container">
        {Object.keys(lessons).map((lesson, index) => (
          <button className="skills-btn"  key = {index}><a href={"#" + lesson} >{lesson}</a></button>
        ))}
      </div>
      {Object.keys(lessons).map((lesson, index) => (
        <div className="skill-section" id={lesson}  key = {index}>
          <h2>{lesson}</h2>
          {lessons[lesson].map((obj, index) =>(
            <div className="competency-level"  key = {index}>
              <p className="obj">{obj.objectives}</p>
                            <div className="comp-btn">
                                {competency.map((comp) => (
                                    
                                    <button> key={comp.competency}</button>
                                ))}
                            </div>
            </div>
          ))}
          
        </div>
      ))}

      <Footer />
    </>
  );
};
export default Mentor;
