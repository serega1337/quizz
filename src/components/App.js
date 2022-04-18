import {useState} from "react"
import IntroPage from "./IntroPage"
import Quizz from "./Quizz"
import "../styles/index.scss"

function App() {
    const [startQuizz, setstartQuizz] = useState(true)

    return startQuizz ? (
        <IntroPage startQuizz={() => setstartQuizz(false)} />
    ) : (
        <Quizz />
    )
}

export default App
