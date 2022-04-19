import {useState, useEffect} from "react"
import LoadingSpinner from "./LoadingSpinner"
import Question from "./Question"

function Quizz({amountOfQuestions}) {
    const [loading, setLoading] = useState(false)
    const [questions, setQuestions] = useState([])
    const [resultScreen, setResultScreen] = useState(false)
    const [correctAnswers, setCorrectAnswers] = useState(0)

    useEffect(() => {
        getQuestions()
    }, [])

    const API_URL = amount =>
        `https://opentdb.com/api.php?type=multiple&encode=base64&amount=${amount}`

    async function getQuestions() {
        setLoading(true)
        try {
            const response = await fetch(API_URL(amountOfQuestions))
            const data = await response.json()
            createQuestions(data?.results)
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

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
                ].map((ans, i) => ({
                    ...ans,
                    selected: false,
                    id: ans.answer + i,
                    result: ""
                }))

                ;(function swapAnswer() {
                    const idx = (Math.random() * answers.length) >> 0
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

    function selectAnswer(answerId, qId) {
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

    if (loading) return <LoadingSpinner />

    const questionArray = questions.map(({question, answers}, idx) => (
        <Question
            question={question}
            answers={answers}
            key={idx}
            q={idx}
            selectAnswer={selectAnswer}
            disabled={resultScreen}
        />
    ))

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
