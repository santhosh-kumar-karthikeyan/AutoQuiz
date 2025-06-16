import "./Question.css";

function Question(props) {
    const question = props.question;
    const optionList = question.options.map(option => {
        return (
        <li>
                {question.type === "mcq" ?
                    <input type="radio" /> :
                    <input type="checkbox" />
                } {option} 
        </li>
        )
    });
    return (
        <main>
            <small>{question.qId + 1}</small> <p>{question.question}</p>
            <ul>
                {optionList}
            </ul>
        </main>
    )
}

export default Question;