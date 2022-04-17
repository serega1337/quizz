import {useState, useEffect} from "react"
import Question from "./Question"
const API_URL =
    "https://opentdb.com/api.php?amount=10&category=31&category=24&type=multiple"
// "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple"
// "https://opentdb.com/api.php?amount=10&category=31&type=multiple"

function Quizz() {
    const [loading, setLoading] = useState(false)
    const [questions, setQuestions] = useState([])
    const [resultScreen, setResultScreen] = useState(false)
    const [correctAnswers, setCorrectAnswers] = useState(0)

    async function getQuestions() {
        setLoading(true)
        try {
            const response = await fetch(API_URL)
            const data = await response.json()
            createQuestions(data?.results)
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }
    useEffect(() => {
        getQuestions()
    }, [])

    function createQuestions(questions) {
        setCorrectAnswers(0)
        const newQuestions = questions.map(
            ({correct_answer, incorrect_answers, question}, questionIdx) => {
                const answers = [
                    ...incorrect_answers.map(answer => ({
                        answer,
                        correct: false
                    })),
                    {answer: correct_answer, correct: true}
                ].map((ans, i) => {
                    return {
                        ...ans,
                        selected: false,
                        id: ans.answer + i,
                        result: ""
                    }
                })
                ;(function swapAnswer() {
                    const idx = Math.floor(Math.random() * 4)
                    const lastIdx = answers.length - 1
                    ;[answers[idx], answers[lastIdx]] = [
                        answers[lastIdx],
                        answers[idx]
                    ]
                })()
                return {
                    answers,
                    question,
                    idx: questionIdx
                }
            }
        )
        setQuestions(newQuestions)
    }

    function selectAnswer(e, answerId, qId) {
        setQuestions(prevState =>
            prevState.map(q =>
                q.idx !== qId
                    ? q
                    : {
                          ...q,
                          answers: q.answers.map(a =>
                              a.id !== answerId
                                  ? {...a, selected: false}
                                  : {...a, selected: !a.selected}
                          )
                      }
            )
        )
    }

    const questionArray = questions.map(({question, answers}, idx) => (
        <Question
            question={question.replace(/&quot;/g, '"')}
            answers={answers}
            key={idx}
            q={idx}
            selectAnswer={selectAnswer}
            disabled={resultScreen}
        />
    ))

    function getResults() {
        setQuestions(prevState =>
            prevState.map(q => ({
                ...q,
                answers: q.answers.map(ans => {
                    if (ans.correct) {
                        if (ans.selected) setCorrectAnswers(prev => prev + 1)
                        return {...ans, result: "correct"}
                    }
                    if (ans.selected) {
                        return {...ans, result: "incorrect"}
                    }
                    return ans
                })
            }))
        )
        setResultScreen(true)
    }

    function playAgain() {
        getQuestions()
        setResultScreen(false)
    }

    if (loading) return <div className="loading-spinner"></div>

    return (
        <section className="quizz">
            <div>
                <section className="questions">{questionArray}</section>
                <div className="quizz__results">
                    {resultScreen ? (
                        <>
                            <p>
                                You scored {correctAnswers}/{questions.length}{" "}
                                correct answers
                            </p>
                            <button
                                onClick={playAgain}
                                className="quizz__button">
                                Play again
                            </button>
                        </>
                    ) : (
                        <button onClick={getResults} className="quizz__button">
                            Check answers
                        </button>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Quizz
