import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import "./App.css";

export default function App() {
  // ************All State that needed In Projects********************************
  const questions = [];
  const [Question, setQuestion] = useState([]);
  const [numberQuestion, setnumberQuestion] = useState();
  const [operator, setoperator] = useState();
  const [value, setvalue] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const [Finalscore, setFinalscore] = useState(0);
  const [timer, setTimer] = useState(20);
  const [stop, setStop] = useState(true);
  // **************State ends here********************************************************

  useEffect(() => {
    if (timer === 0) {

      setCurrentQuestion(currentQuestion + 1);

    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [setStop, timer]);

  useEffect(() => {
    setTimer(20);
  }, [currentQuestion]);


  // **************All events Handler**********************************************
  let textInput = React.createRef();
  const onChangeValue = (event) => {
    setoperator(event.target.value);
  };

  const asset = (e) => {
    setnumberQuestion(e.target.value);
  };
  const onvalue = (event) => {
    setvalue(event.target.value);
  };

  const handleChange = (e) => {
    setAnswer(e.target.value);
  };

  const Nextbutton = () => {
    setTimer(20);

    if (Question[currentQuestion].ans == textInput.current.value) {
      Question[currentQuestion].isRight = true;
      setFinalscore(Finalscore + 1);
    }

    setCurrentQuestion(currentQuestion + 1);
    setAnswer("");
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < Question.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
     
    }

    
    
  };
  // ***********************Events end here********************************

  // ********genrate answers from operator*******************************
  const Answerofquestion = (operator, int1, int2) => {
    switch (operator) {
      case "+":
        return int1 + int2;
        break;
      case "-":
        return int1 - int2;
        break;
      case "*":
        return int1 * int2;
        break;
      case "/":
        return Math.floor(int1 / int2);
        break;
      default:
        break;
    }
  };
  // ********************Ansswers ends here*********************************

  // *************Question Genrator on Start quiz button************************

  // Below piece of code generate Random number for questions
  // i learn this code from https://codepen.io/enigma777/pen/dMwabj

  const minimum = 1;
  const maximum = value;

  const Questiongenrate = () => {

    setTimer(20);
    setStop(true);


    for (let index = 0; index < numberQuestion; index++) {
      const int1 =
        Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      const int2 =
        Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

      let ans = Answerofquestion(operator, int1, int2);

      const que = {
        number1: `${int1} ${operator} ${int2}`,
        ans,
        isRight: false,
      };

      questions.push(que);
    }
    setQuestion(questions);
    setCurrentQuestion(0);
  };

  // **************question Generator end here**********************




  return (
    <div className="app">
      {showScore ? (
        <div className="score-section">
          <table>
            {Question.map((xop) => {
              return (
                <div className="lop" key={xop.number1}>
                  <tr
                    key={xop.number1}
                    style={{ color: xop.isRight === true ? "green" : "red" }}
                  >
                    {xop.number1}={xop.ans}
                    {xop.isRight ? "true" : "false"}
                  </tr>
                </div>
              );
            })}
          </table>
          <h3>
            Your Final Score:{Finalscore}/{Question.length}
          </h3>
        </div>
      ) : (
        <>
          <div className="question">
            select number of question
            <select onChange={asset}>
              <option>--</option>

              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
          <div className="Operator">
            select maths operator
            <select onChange={onChangeValue}>
              <option>--</option>

              <option value="+">+</option>
              <option value="-">-</option>
              <option value="*">*</option>
              <option value="/">/</option>
            </select>
          </div>
          <div className="values">
            select value
            <select onChange={onvalue}>
              <option>--</option>

              <option>10</option>
              <option>11</option>
              <option>12</option>
              <option>13</option>
              <option>14</option>
              <option>15</option>
            </select>
          </div>
          <button
            name="btn"
            onClick={Questiongenrate}
            disabled={
              numberQuestion === undefined ||
              value === undefined ||
              operator === undefined
            }
          >
            start quiz
          </button>
          {Question.length === 0 ? (
            <></>
          ) : (
            <div className="questionss">
              <span>Question {currentQuestion + 1}</span>/{Question.length}
              <h2>{Question && Question[currentQuestion].number1}</h2>
              <div className="input">
                <input
                  type="text"
                  placeholder="Please enter correct value"
                  value={answer}
                  onChange={handleChange}
                  ref={textInput}
                />
              </div>


              <p>Timer {timer}</p>
              <div className="nextbtn">
                <button onClick={Nextbutton}>Next</button>
                <button onClick={Questiongenrate}>reset Quiz</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// I learn How to show Question One By one From this URl https://www.freecodecamp.org/news/how-to-build-a-quiz-app-using-react/
