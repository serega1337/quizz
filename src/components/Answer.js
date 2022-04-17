function Answer({answer, selectAnswer, id, selected, q, result, disabled}) {
    return (
        <button
            disabled={disabled}
            className={`answer${selected ? " answer-selected" : ""}${
                result === ""
                    ? ""
                    : result === "correct"
                    ? " answer-correct"
                    : " answer-incorrect"
            }`}
            onClick={e => selectAnswer(e, id, q)}>
            {answer}
        </button>
    )
}

export default Answer
