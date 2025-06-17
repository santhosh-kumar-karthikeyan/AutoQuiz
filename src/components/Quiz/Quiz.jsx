import "./Quiz.css"
import Question from "./Question/Question";
import { useState } from "react";

function Quiz(props) {
    const quiz = props.quiz;
    const [answers, setAnswers] = useState(Array(quiz.length).fill(null).map(() => [-1]));
    const questions = quiz.map(question => <li key={question.qId}><Question question={question} setAnswers={setAnswers} /></li>);
    const scorePerQuestion = 100 / quiz.length;
    const [score, setScore] = useState(-1);
    function validateAnswers() {
        let totalScore = 0;
        for (const question of quiz) {
            console.log(quiz);
            console.log(answers);
            console.log(`
                Type of question is: ${question.type}.
                User answered: ${answers[question.qId]}.
                Actual answers: ${question.answerIndex}
                `);
            // if (question.type === "mcq" && question.answerIndex === answers[question.qId])
            //     totalScore += scorePerQuestion;
            // if (question.type === "msq" && question.answerIndex.sort() === answers[question.qId].sort())
            //     totalScore += scorePerQuestion;
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