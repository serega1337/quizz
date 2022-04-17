import Answer from "./Answer"

function Question({question, answers, selectAnswer, q, disabled}) {
    return (
        <div className="question">
            <h2>{question}</h2>
            <div className="answers">
                {answers &&
                    answers.map(ans => (
                        <Answer
                            selectAnswer={selectAnswer}
                            selected={ans.selected}
                            answer={ans.answer}
                            key={ans.id}
                            q={q}
                            id={ans.id}
                            result={ans.result}
                            disabled={disabled}
                        />
                    ))}
            </div>
        </div>
    )
}

export default Question
