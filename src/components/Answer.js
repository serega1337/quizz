function Answer({answer, selectAnswer, id, selected, q, result, disabled}) {
    return (
        <button
            className={`answer${(selected && " answer-selected") || ""}${
                result &&
                (result === "correct" ? " answer-correct" : " answer-incorrect")
            }`}
            disabled={disabled}
            onClick={() => selectAnswer(id, q)}>
            {answer}
        </button>
    )
}

export default Answer
