import "../styles/index.scss"
import blob1 from "../images/blob1.png"
import blob2 from "../images/blob2.png"

function App() {
    return (
        <main className="intro-page">
            <h1>Quizzical</h1>
            <h3>Some description if needed</h3>
            <img src={blob1} className="blob blob--yellow" />
            <img src={blob2} className="blob blob--blue" />
            <button className="button">Start quiz</button>
        </main>
    )
}

export default App
