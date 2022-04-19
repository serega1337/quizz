import {useState} from "react"
import IntroPage from "./IntroPage"
import Quizz from "./Quizz"
import "../styles/index.scss"

function App() {
    const [startQuizz, setstartQuizz] = useState(true)
    const [amountOfQuestions, setAmountOfQuestions] = useState(5)

    return startQuizz ? (
        <IntroPage
            startQuizz={() => setstartQuizz(false)}
            amountOfQuestions={amountOfQuestions}
            setAmountOfQuestions={setAmountOfQuestions}
        />
    ) : (
        <Quizz amountOfQuestions={amountOfQuestions} />
    )
}

export default App
