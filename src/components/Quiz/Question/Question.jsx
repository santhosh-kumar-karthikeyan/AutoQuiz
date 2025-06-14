import "./Question.css";

function Question(props) {
    const question = props.question;
    const optionList = question.options.map(option => <li><input type="checkbox" />{option}</li>);
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