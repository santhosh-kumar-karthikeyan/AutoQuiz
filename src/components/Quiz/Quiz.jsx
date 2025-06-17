import "./Quiz.css"
import Question from "./Question/Question";
import { useState } from "react";

function Quiz(props) {
    const quiz = props.quiz;
    const [answers, setAnswers] = useState(Array(quiz.length).fill(null).map(() => [-1]));
    const [score, setScore] = useState(Array(quiz.length).fill(-1));
    const [totalScore, setTotalScore] = useState(-1);
    const scorePerQuestion = 100 / quiz.length;

    const questions = quiz.map(question => <li key={question.qId}><Question question={question} setAnswers={setAnswers} score={score[question.qId]} totalScore={totalScore} /></li>);
    function validateAnswers() {
        setTotalScore(0);
        let sum = 0;
        for (const question of quiz) {
            let currScore = 0;
            if (question.type === "mcq" && JSON.stringify(question.answerIndex) === JSON.stringify(answers[question.qId])) {
                currScore = scorePerQuestion;
            }
            if (question.type === "msq") {
                const actualAnswers = question.answerIndex.sort();
                const userAnswers = answers[question.qId].sort();
                const scorePerOption = scorePerQuestion / actualAnswers.length;
                for (const ans of actualAnswers) {
                    if (userAnswers.includes(ans))
                        currScore += scorePerOption;
                }
            }
            console.log(`
                Type of question is: ${question.type}.
                User answered: ${answers[question.qId]}.
                Actual answers: ${question.answerIndex}
                Score is: ${currScore}
                `);
            
            setScore(oldScore => oldScore.map((ele, idx) => idx === question.qId ? currScore : ele));
            sum += currScore;
        }
        setTotalScore(sum);
    }
    return (
        <form action={validateAnswers}>
            {questions}
            {
                totalScore < 0 ?
                    <button>Submit Answers</button> :
                    <h4>Your score is: {totalScore}</h4>
            }
        </form >)
}

export default Quiz;