import "./Quiz.css"
import Question from "./Question/Question";
import { useState } from "react";

function Quiz(props) {
    const quiz = props.quiz;
    const questions = quiz.map(question => <li><Question question={question} setAnswers={setAnswers}/></li>);
    const [answers, setAnswers] = useState([[]]);
    const scorePerQuestion = 100 / quiz.length;
    const [score, setScore] = useState(-1);
    function validateAnswers() {
        let totalScore = 0;
        for (let question in quiz) {
            if (question.type === "mcq" && question.answerIndex === answers[question.qId])
                totalScore += scorePerQuestion;
            if (question.type === "msq" && question.answerIndex.sort() === answers[question.qId].sort())
                totalScore += scorePerQuestion;
        }
        setScore(totalScore);
    }
    return (
    <form action={validateAnswers}>
        {questions}
            {
            score < 0 ?
                <button>Submit Answers</button> :
                <h4>Your score is: {score}</h4>
            }
    </form >)
}

export default Quiz;