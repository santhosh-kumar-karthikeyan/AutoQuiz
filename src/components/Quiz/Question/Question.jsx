import "./Question.css";

function Question(props) {
    const question = props.question;
    const optionList = question.options.map(option => {
        return (
        <li>
                {question.type === "mcq" ? <input type="radio" /> : <input type="checkbox" />} {option} { question.type}
        </li>
        )
    });
    return (
        <main>
            <small>{question.qId}</small> <p>{question.question}</p>
            <ul>
                {optionList}
            </ul>
        </main>
    )
}

export default Question;