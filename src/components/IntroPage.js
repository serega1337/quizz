function IntroPage({startQuizz}) {
    return (
        <section className="intro-page">
            <h1>Quizzical</h1>
            <h3>Some description if needed</h3>
            <button className="button" onClick={e => startQuizz(e)}>
                Start quizz
            </button>
        </section>
    )
}

export default IntroPage
