import {useState} from "react"
import IntroPage from "./IntroPage"
import Quizz from "./Quizz"
import "../styles/index.scss"

function App() {
    const [kek, setKek] = useState(true)

    return (
        <main>
            {kek ? <IntroPage startQuizz={() => setKek(false)} /> : <Quizz />}
        </main>
    )
}

export default App
