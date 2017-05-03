(function (w) {

    let quiz = w.q,
        q_data,
        qs;

    let QuizSingleton = (q_data) => {
        let instance;

        const init = () => {



            let _time = q_data.time_seconds,
                _questions = q_data.questions,
                _points = 0,
                _current = 0;

            let ui_question_text = document.getElementsByClassName("question__text")[0],
                ui_answers = Array.from(document.getElementsByClassName('answer')),
                ui_answers_texts = ui_answers.map(x => x.children[0]);

            let changeText = (element, text) => {
                element.innerText = text;
            };


            let changeQuestion = (current, direction) => { // 0 - previous 1 - next
                let q_answers = _questions[current+1].answers;
                ui_answers_texts.map((answer, index) => {
                    changeText(ui_answers_texts[index], q_answers[index].answer);
                })
            };

            nextQuestion(1);



            const ui = () => {

            }

            return{
                time: time,
                questions: questions,
                points: points
            }

        };

        return {
            getInstance: () => {
                if (!instance) {
                    console.log(q_data);
                    instance = init();
                }
                return instance;
            }
        }

    };

    quiz.getData(q.url)
        .then(data => {
            q_data = JSON.parse(data);
            qs = QuizSingleton(q_data).getInstance();
        }).catch(error => {
    })


})(window);
