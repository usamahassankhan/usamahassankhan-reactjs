import React, { useState ,useEffect} from "react";
import data from "./../questions.json";
import ProgressBar from 'react-bootstrap/ProgressBar'
import 'bootstrap/dist/css/bootstrap.min.css';
// import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import './index.css'
 
const Mcqs = () => {
  const [correctanswer, setCorrectanswer] = useState(0);
  const [state, setState] = useState(0);
  const [result, setResult] = useState();
  const [answer, setanswer] = useState();
  const [ratingstate, setRatingstate] = useState();
  const now = 60;
// const progressInstance = <ProgressBar now={now} label={`${now}%`} />;
  console.log("asdad", result);
  console.log("cor", correctanswer);
  console.log(state);
  console.log("val", answer);
  console.log("coreect",correctanswer/data.length)
  console.log("all true",((data.length-state)/data.length)+(correctanswer/data.length))
  const evaluation = (e) => {
    setanswer(e.target.outerText);
    if (e.target.outerText === data[state]?.correct_answer) {
      setResult("correct");
      setCorrectanswer(correctanswer + 1);
    } else {
      setResult("sorry");
    }
  };
  const increment=()=>{
      setState(state+1)
      setResult("")
  }
  useEffect(() => {
     
   
        if(data[state]?.difficulty==="easy"){
            setRatingstate(1)
        }
        else if(data[state]?.difficulty==="mediaum"){
          setRatingstate(2)
      }
      else if(data[state]?.difficulty==="hard"){
          setRatingstate(3)
      }
      else{
          setRatingstate(false)
      }
  
    
  }, [ratingstate])


if(state<20){

  return (
    <>
      {
        <>

        <ProgressBar  now={(state+1)*5} label={`${now}%`}  srOnly />
    
          <h1>Question {state+1}/20</h1>
          <p>{data[state]?.category}</p>
          <Box component="fieldset" mb={3} borderColor="transparent">
      
        <Rating name="read-only" value={(data[state]?.difficulty==="easy"?1:data[state]?.difficulty==="medium"?2:3)} readOnly />
      </Box>
          <p>{data[state]?.question}</p>
          <div className="button-div">
            {
              data[state]?.incorrect_answers.map((a) => {
                return (
                  <>
                    <button onClick={evaluation}>{a}</button>
                  </>
                );
              })
              //    <button></button>
            }
            <button onClick={evaluation}>{data[state]?.correct_answer}</button>
          </div>
        </>
      }
     <button onClick={increment}>Next Question</button>
      <p>{result}</p>


      <ProgressBar >
  <ProgressBar variant="dark"now={(((data.length-state)/data.length)-(correctanswer/data.length))*100}   key={1} />
  <ProgressBar variant="secondary"  now={(correctanswer/data.length)*100}  label={`score${(correctanswer/data.length)*100}%`} key={2} />
  <ProgressBar variant="bg dark" now={(((data.length-state)/data.length)+(correctanswer/data.length))*100} label={`max score${(((data.length-state)/data.length)+(correctanswer/data.length))*100}%`} key={3} />
</ProgressBar>
      
    </>

  )}
  else{
      return(
       <p>
           no result
       </p>
      )
  }

};

export default Mcqs;
