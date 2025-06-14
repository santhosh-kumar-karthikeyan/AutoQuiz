import './TopicForm.css';
import { useState,useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import getQuiz from "../../../api/getQuiz.js";
import Quiz from "../Quiz/Quiz";

function TopicForm() {
    const [topics, setTopics] = useState([]);
    const topicRef = useRef("");
    const [multiChoice, setMultiChoice] = useState(5);
    const [quiz,setQuiz] = useState([]);
    function addTopic() {
        const newTopic = topicRef.current.value;
        if(!newTopic || topics.find(topic => topic == newTopic))
            return;
        console.log(topics);
        setTopics(prevTopics => [...prevTopics,newTopic]);
    }
    function removeTopic(topic) {
        setTopics(topics.filter(currTopic => currTopic !== topic));
    }
    function removeAllTopics() {
        setTopics([]);
    }
    async function submitQuiz(formData) {
        const numQuestions = formData.get("numQuestions");
        const multiChoice = formData.get("multiChoice");
        console.log(numQuestions);
        console.log(multiChoice);
        console.log(topics);
        setQuiz( await getQuiz(topics,numQuestions,multiChoice));
    }
    const topicList = topics.map(topic => <li>{topic}<button onClick={() => removeTopic(topic)} type="button" aria-label='remove topic'>x</button></li>);
    return (
        <main id="whole-main">
            <form action={addTopic} id="topicForm">
                <h3>Add topics to generate a quiz below</h3>
                <main>
                    <input type="text" name="topic" placeholder="e.g React hooks" ref={topicRef}/>
                    <button >+ Add topic</button>
                </main>
                {topics.length !==0 && <><h3>Topics Selected:</h3><ul>{topicList}</ul></> }
                {
                    topics.length >0 ?
                    <button onClick={removeAllTopics}>
                        <FontAwesomeIcon icon={faDeleteLeft}/> clear
                    </button>:
                    <p>Enter a topic to continue</p>
                }
            </form>
            {topics.length > 0 &&
            <form action={submitQuiz} id="questionForm">
                <label>Total number of questions</label>
                <select name="numQuestions" defaultValue="" onChange={(e) => {setMultiChoice(e.target.value)}}>
                    <option value="" disabled>--Select the # of questions--</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
                <label htmlFor="mutliChoice">Number of multiple choice questions</label>
                <input name="multiChoice" id="multiChoice" type="number" defaultValue={5} max={multiChoice} min={0} step={1} />
                <button>Generate Quiz</button>
            </form>}
            {
                quiz.length > 0 && <Quiz quiz={quiz}/>
            }
        </main>
    )
}

export default TopicForm;