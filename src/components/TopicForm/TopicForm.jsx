import './TopicForm.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'; // For free Solid style

function TopicForm() {
    const [topics, setTopics] = useState([]);
    function handleSubmit(formData) {
        const newTopic = formData.get("topic").trim();
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
    const topicList = topics.map(topic => <li>{topic}<button onClick={() => removeTopic(topic)} type="button" aria-label='remove topic'>x</button></li>);
    return (
        <form action={handleSubmit} >
            <p>Add topics to generate a quiz below</p>
            <main>
                <input type="text" name="topic" placeholder="e.g React hooks" />
                <button type="submit" >+ Add topic</button>
            </main>
            <button onClick={removeAllTopics}>
                <FontAwesomeIcon icon={faDeleteLeft}/> clear
            </button>
            {topics.length !==0 && <ul>{topicList}</ul> }
        </form>
    )
}

export default TopicForm;