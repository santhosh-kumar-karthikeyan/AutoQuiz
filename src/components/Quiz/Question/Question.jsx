import "./Question.css";

function Question(props) {
    const question = props.question;
    const setAnswers = props.setAnswers;
    function setAnswer(evt) {
        const { value, checked } = evt.currentTarget;
        const selectedValue = +value;

        setAnswers(oldAnswers =>
            oldAnswers.map((ans, index) => {
                if (index !== question.qId) {
                    return ans;
                }

                if (question.type === "msq") {
                    // Deselect: remove the value
                    if (!checked) {
                        const updated = ans.filter(val => val !== selectedValue);
                        console.log(updated.length > 0 ? updated : [-1]);
                        return updated.length > 0 ? updated : [-1]; // or [] if you prefer
                    }

                    // Select: add if not already present
                    if (ans.includes(selectedValue)) {
                        console.log(ans);
                        return ans;
                    }
                    console.log(ans[0] === -1 ? [selectedValue] : [...ans, selectedValue]);
                    return ans[0] === -1 ? [selectedValue] : [...ans, selectedValue];
                }

                // For MCQ: single value selected
                console.log([selectedValue])
                return [selectedValue];
            })
        );
    }
    const optionList = question.options.map((option, idx) => {
        return (
            <li key={idx}>
                {question.type === "mcq" ?
                    <input type="radio" name={`mcq${question.qId}`} onChange={setAnswer} value={idx} /> :
                    <input type="checkbox" onChange={setAnswer} value={idx} />
                } {option}
            </li>
        )
    });
    return (
        <main>
            <small>{question.qId + 1}</small> <p>{question.question}</p><p>{props.totalScore > 0 && ( props.score > 0 ? props.score : 0)}</p>
            <ul>
                {optionList}
            </ul>
        </main>
    )
}

export default Question;