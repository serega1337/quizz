function IntroPage({startQuizz, amountOfQuestions, setAmountOfQuestions}) {
    return (
        <section className="intro-page">
            <h1>Quizzical</h1>
            <h3>
                Number of Questions :
                <input
                    inputmode="numeric"
                    type="number"
                    value={amountOfQuestions}
                    className="intro-page__input"
                    onChange={e => setAmountOfQuestions(e.target.value)}
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
