import Answer from "./Answer"

function Question({question, answers, selectAnswer, q}) {
    console.log(answers)
    return (
        <div className="question">
            <h2>{question}</h2>
            <div className="answers">
                {answers &&
                    answers.map(ans => {
                        console.log(ans, ans.key, ans.answer)
                        return (
                            <Answer
                                selectAnswer={selectAnswer}
                                selected={ans.selected}
                                answer={ans.answer}
                                key={ans.id}
                                q={q}
                                id={ans.id}
                            />
                        )
                    })}
            </div>
        </div>
    )
}

export default Question
