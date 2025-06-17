import './TopicForm.css';
import sampleQuiz from '../../../samplequiz.json'
import { useState,useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import Quiz from "../Quiz/Quiz";

function TopicForm() {
    const [topics, setTopics] = useState([]);
    const topicRef = useRef("");
    const [multiChoice, setMultiChoice] = useState(5);
    const [quiz,setQuiz] = useState([]);
    const [loading, setLoading] = useState(false);
    function addTopic() {
        const newTopic = topicRef.current.value;
        if(!newTopic || topics.find(topic => topic == newTopic))
            return;
        console.log(topics);
        setTopics(prevTopics => [...prevTopics,newTopic]);
        // setLoading(true);
    }
    function removeTopic(topic) {
        setTopics(topics.filter(currTopic => currTopic !== topic));
    }
    function removeAllTopics() {
        setTopics([]);
        setQuiz([]);
        setLoading(false);
    }
    // async function handleResponse(formData) {
    //     const numQuestions = formData.get("numQuestions");
    //     const multiChoice = formData.get("multiChoice");
    //     try {
    //         const params = new URLSearchParams({
    //             topics: topics.join(","),
    //             numQuestions,
    //             numMCQs: multiChoice,
    //         });
    //         const res = await fetch(`api/getQuiz?${params}`);
    //         const data = await res.json();
    //         if(!data) {
    //             console.log("Data not found");
    //         }
    //         else 
    //             console.log(JSON.stringify(data));
    //         setQuiz(data.quiz);
    //     } catch (err) {
    //         console.error("Quiz generation failed", err);
    //     }
    // }
    // function submitQuiz(formData) {
    //     setLoading(true);
    //     handleResponse(formData).then(() => setLoading(false));
    // }
    function submitQuiz() {
        console.log(sampleQuiz);
        setQuiz(sampleQuiz.quiz);
    }

    const topicList = topics.map((topic, idx) => <li key={idx}>{topic}<button onClick={() => removeTopic(topic)} type="button" aria-label='remove topic'>x</button></li>);
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
                <label htmlFor="mutliChoice">Number of multiple select questions</label>
                <input name="multiChoice" id="multiChoice" type="number" defaultValue={0} max={multiChoice} min={0} step={1} />
                <button>Generate Quiz</button>
            </form>}
            {loading && <p>Generating your quiz... 🧠</p>}
            {
                quiz.length > 0 && <Quiz quiz={quiz}/>
            }
        </main>
    )
}

export default TopicForm;