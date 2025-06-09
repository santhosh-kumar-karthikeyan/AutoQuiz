import './TopicForm.css';

function TopicForm() {
    let topics = ["Web dev", "React"];
    function handleSubmit(event) {
        event.preventDefault();
        console.log("Submitted");
    }
    const topicList = topics.map(topic => <li>{topic}<button type="button" aria-label='remove topic'>x</button></li>);
    return (
        <form onSubmit={handleSubmit} >
            <p>Add topics to generate a quiz below</p>
            <main>
                <input type="text" name="topic" placeholder="e.g React hooks" />
                <button type="submit" >+ Add topic</button>
            </main>
            {topics.length !==0 && <ul>{topicList}</ul> }
        </form>
    )
}

export default TopicForm;