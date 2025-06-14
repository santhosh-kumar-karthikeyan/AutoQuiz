import "./Quiz.css"
import Question from "./Question/Question";

function Quiz(props) {
    const quiz = props.quiz;
    const questions = quiz.map(question => <li><Question question={question} /></li>);
    return (
    <ul>
        {questions}
    </ul>)
}

export default Quiz;