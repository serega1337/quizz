import Answer from "./Answer"

const b64_to_utf8 = str => decodeURIComponent(escape(window.atob(str)))

function Question({question, answers, selectAnswer, q, disabled}) {
    return (
        <div className="question">
            <h2>{b64_to_utf8(question)}</h2>
            <div className="answers">
                {answers.map(({selected, answer, id, result}) => (
                    <Answer
                        selectAnswer={selectAnswer}
                        selected={selected}
                        answer={b64_to_utf8(answer)}
                        key={id}
                        q={q}
                        id={id}
                        result={result}
                        disabled={disabled}
                    />
                ))}
            </div>
        </div>
    )
}

export default Question
