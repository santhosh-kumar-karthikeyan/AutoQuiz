import { useState } from "react";
import "./Question.css";

function Question(props) {
    const question = props.question;
    const setAnswers = props.setAnswers;
    const [choices, setChoices] = useState([false, false, false, false]);
    function setAnswer(evt, choiceIdx) {
        const { checked } = evt.currentTarget;
        const newChoices = choices.map((choice, idx) => (
            idx === choiceIdx ? checked : choice
        ))
        setChoices(newChoices);
        setAnswers(oldAnswers =>
            oldAnswers.map((ans, idx) => {
                if (idx !== question.qId) return ans;
                if (newChoices.every(choice => choice === false)) return [-1];
                return newChoices.map((choice, idx) => choice ? idx : -1).filter(choice => choice !== -1)
            })
        )
    }
    function getOptionStyle(optionIdx) {
        if (props.totalScore < 0)
            return null;
        if (choices[optionIdx]) {
            return props.correctAnswers.includes(optionIdx) ? "correct-option" : "wrong-option";
        }
        else {
            return props.correctAnswers.includes(optionIdx) ? "missed-correct" : "";
        }
    }
    const optionList = question.options.map((option, idx) => {
        return (
            <li key={idx} className={getOptionStyle(idx)}>
                {question.type === "mcq" ?
                    <input type="radio" name={`mcq${question.qId}`} onChange={(evt) => setAnswer(evt, idx)} value={idx} checked={ choices[idx]} disabled={props.totalScore >= 0} /> :
                    <input type="checkbox" onChange={(evt) => setAnswer(evt, idx)} value={idx} checked={choices[idx] } disabled={props.totalScore >= 0} />
                } {option}
            </li>
        )
    });
    return (
        <main>
            <small>{question.qId + 1}</small> <p>{question.question}</p><p>{props.totalScore >= 0 && (props.score > 0 ? props.score : 0)}</p>
            <ul>
                {optionList}
            </ul>
        </main>
    )
}

export default Question;