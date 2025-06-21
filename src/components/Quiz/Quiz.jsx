import "./Quiz.css";
import Question from "./Question/Question";
import { useState } from "react";

function Quiz(props) {
  const quiz = props.quiz;
  const [answers, setAnswers] = useState(
    Array(quiz.length)
      .fill(null)
      .map(() => [-1])
  );
  const [score, setScore] = useState(Array(quiz.length).fill(-1));
  const [totalScore, setTotalScore] = useState(-1);
  const scorePerQuestion = 100 / quiz.length;

  const questions = quiz.map((question) => (
    <li key={question.qId}>
      <Question
        question={question}
        setAnswers={setAnswers}
        score={score[question.qId]}
        totalScore={totalScore}
        correctAnswers={question.answerIndex}
      />
    </li>
  ));
  function validateAnswers() {
    setTotalScore(0);
    let sum = 0;
    for (const question of quiz) {
      let currScore = 0;
      if (
        question.type === "mcq" &&
        JSON.stringify(question.answerIndex) ===
          JSON.stringify(answers[question.qId])
      ) {
        currScore = scorePerQuestion;
      }
      if (question.type === "msq") {
        const actualAnswers = question.answerIndex.sort();
        const userAnswers = answers[question.qId].sort();
        const scorePerOption = scorePerQuestion / actualAnswers.length;
        for (const ans of actualAnswers) {
          if (userAnswers.includes(ans)) currScore += scorePerOption;
        }
      }
      console.log(`
                Type of question is: ${question.type}.
                User answered: ${answers[question.qId]}.
                Actual answers: ${question.answerIndex}
                Score is: ${currScore}
                `);

      setScore((oldScore) =>
        oldScore.map((ele, idx) => (idx === question.qId ? currScore : ele))
      );
      sum += currScore;
    }
    setTotalScore(sum);
  }
  return (
    <form action={validateAnswers}>
      <h4>
        Quiz on topic{props.topics.length > 1 && "s"}:{" "}
        <strong>{props.topics.join(", ")}</strong>
      </h4>
      <div className="close" onClick={() => props.setQuiz([])}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M11 0.7H13V23.3H11z"
            transform="rotate(-45.001 12 12)"
          ></path>
          <path
            d="M0.7 11H23.3V13H0.7z"
            transform="rotate(-45.001 12 12)"
          ></path>
        </svg>
      </div>
      <ol>{questions}</ol>
      {totalScore < 0 ? (
        <button>Submit Answers</button>
      ) : (
        <>
          <fieldset className="legend">
            <legend>Legend</legend>
            <div className="legend-item correct-option">
              <span className="legend-color"></span> Selected Correct Answer
            </div>
            <div className="legend-item wrong-option">
              <span className="legend-color"></span> Selected Wrong Answer
            </div>
            <div className="legend-item missed-correct">
              <span className="legend-color"></span> Missed Correct Answer
            </div>
          </fieldset>
          <h4>Your score is: {Math.round(totalScore * 100) / 100}</h4>
        </>
      )}
    </form>
  );
}

export default Quiz;
