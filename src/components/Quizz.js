import {useState, useEffect} from "react"
import Question from "./Question"
const API_URL =
    "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple"

function Quizz(props) {
    const [answers, setAnswers] = useState({})
    const [loading, setLoading] = useState(false)
    const [questions, setQuestions] = useState([])

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
        console.log(questions)
        const newQuestions = questions.map(
            ({correct_answer, incorrect_answers, question}, questionIdx) => {
                const answers = [
                    ...incorrect_answers.map(answer => ({
                        answer,
                        correct: false
                    })),
                    {answer: correct_answer, correct: true}
                ].map((ans, i) => {
                    return {...ans, selected: false, id: ans.answer + i}
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
        console.log(newQuestions)
        setQuestions(newQuestions)
    }

    function selectAnswer(e, answerId, qId) {
        setQuestions(prevState => {
            console.log(prevState)
            return prevState.map(q =>
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
        })
    }
    const array = questions.map(({question, answers}, idx) => {
        console.log("KEY, INDEX = ", idx)
        return (
            <Question
                question={question.replace(/&quot;/g, '"')}
                answers={answers}
                key={idx}
                q={idx}
                selectAnswer={selectAnswer}
            />
        )
    })

    if (loading) return <p>loadingloadingloadingloadingloadingloadingloading</p>

    return (
        <section className="quizz">
            <section className="questions">{array}</section>
        </section>
    )
}

export default Quizz
