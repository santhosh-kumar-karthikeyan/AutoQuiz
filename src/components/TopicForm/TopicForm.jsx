import './TopicForm.css';
import { useState } from 'react';

function TopicForm() {
    const [topics, setTopics] = useState([]);
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newTopic = formData.get("topic").trim();
        if(!newTopic || topics.find(topic => topic == newTopic))
            return;
        console.log(topics);
        setTopics(prevTopics => [...prevTopics,newTopic]);
        event.target.reset();
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
        <form onSubmit={handleSubmit} >
            <p>Add topics to generate a quiz below</p>
            <main>
                <input type="text" name="topic" placeholder="e.g React hooks" />
                <button type="submit" >+ Add topic</button>
            </main>
            <button onClick={removeAllTopics}>clear</button>
            {topics.length !==0 && <ul>{topicList}</ul> }
        </form>
    )
}

export default TopicForm;