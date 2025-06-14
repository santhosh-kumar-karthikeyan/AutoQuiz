import quizLogo from "/autoQuizLogo.png";
import "./Header.css";
function Header() {
    return (
        <header>
            <img src={quizLogo} alt="AutoQuiz logo" />
            <h1>Auto Quiz</h1>
        </header>
    )
}

export default Header;