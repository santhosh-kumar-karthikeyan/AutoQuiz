import './TopicForm.css';
import { useState,useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'; // For free Solid style

function TopicForm() {
    const [topics, setTopics] = useState([]);
    const topicRef = useRef("");
    const [multiChoice, setMultiChoice] = useState(5);
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
        console.log(topics)
    }
    function submitQuiz() {
        console.log("Form submitted");
    }
    const topicList = topics.map(topic => <li>{topic}<button onClick={() => removeTopic(topic)} type="button" aria-label='remove topic'>x</button></li>);
    return (
        <>
            <form action={addTopic} >
                <p>Add topics to generate a quiz below</p>
                <main>
                    <input type="text" name="topic" placeholder="e.g React hooks" ref={topicRef}/>
                    <button >+ Add topic</button>
                </main>
                {
                    topics.length >0 ?
                    <button onClick={removeAllTopics}>
                        <FontAwesomeIcon icon={faDeleteLeft}/> clear
                    </button>:
                    <p>Enter a topic to continue</p>
                }
                {topics.length !==0 && <><h3>Topics Selected:</h3><ul>{topicList}</ul></> }
            </form>
            {topics.length > 0 && <form action={submitQuiz}>
                <h4>Select the total number of questions you want</h4>
                <select name="numQuestions" defaultValue="" onChange={(e) => {setMultiChoice(e.target.value)}}>
                    <option value="" disabled>--Select the # of questions--</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
                <h4>Select the number of multiple choice questions</h4>
                <section>
                    <p>0</p>
                    <input type="range" name="numMultipleChoice" max={multiChoice} min={0} step={1} defaultValue={Math.floor(multiChoice / 2)}/>
                    <p>{multiChoice}</p>
                </section>
                <button>Generate Quiz</button>
            </form>}
        </>
    )
}

export default TopicForm;