import "./Question.css";

function Question(props) {
    const question = props.question;
    const setAnswers = props.setAnswers;
    function setAnswer(evt) {
        const { value } = evt.currentTarget;
        setAnswers(oldAnswer => (
            oldAnswer.map((ans, index) => index === question.qId ? value : ans)
        ));
    }
    const optionList = question.options.map(option => {
        return (
        <li>
                {question.type === "mcq" ?
                    <input type="radio" name="mcq" onChange={setAnswer} value={option} required/> :
                    <input type="checkbox" onChange={setAnswer} value={option} required/>
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