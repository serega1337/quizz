function Answer({answer, selectAnswer, id, selected, q}) {
    return (
        <button
            className={`answer ${selected ? "answer-selected" : ""}`}
            onClick={e => selectAnswer(e, id, q)}>
            {answer}
        </button>
    )
}

export default Answer
