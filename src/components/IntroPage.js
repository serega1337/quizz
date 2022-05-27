function IntroPage({startQuizz, amountOfQuestions, setAmountOfQuestions}) {
    function handleChange(e) {
        let val = e.target.value
        // if (val <= 50 && val > 0) setAmountOfQuestions(val)
        setAmountOfQuestions(val)
    }
    return (
        <section className="intro-page">
            <h1>Quizzical</h1>
            <h3 className="intro-page__title">
                <h3>Number of Questions :</h3>
                <input
                    value={amountOfQuestions}
                    className="intro-page__input"
                    inputmode="numeric"
                    onChange={e => handleChange(e)}
                    min="1"
                    max="50"
                />
            </h3>

            <button className="intro-page__button" onClick={() => startQuizz()}>
                Start quizz
            </button>
        </section>
    )
}

export default IntroPage
