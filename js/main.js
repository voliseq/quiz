(function (w) {

    let quiz = w.q,
        q_data,
        qs;

    let QuizSingleton = (q_data) => {
        let instance;

        const init = () => {



            let ui_question_text = document.getElementsByClassName("question__text")[0],
                ui_answers = Array.from(document.getElementsByClassName('answer')),
                ui_answers_texts = ui_answers.map(x => x.children[0]),
                prev = document.getElementById('prev'),
                next = document.getElementById('next'),
                ui_timer = document.getElementById("timer"),
                q_timer;


            let _time = q_data.time_seconds,
                _questions = q_data.questions,
                _points = 0,
                _current = -1,
                _user_answers = [],
                _correct_answers = quiz.correctAnswers(q_data);

            let stopTimer = (timer)=> {
                clearInterval(timer);
            };

            let startTimer = (time) => {
                q_timer = setInterval(() => {
                    time--;
                    ui_timer.innerHTML = time;

                    if(time <= 0){
                        clearInterval(q_timer);
                    }

                }, 1000)
            };

            let changeText = (element, text) => {
                element.innerText = text;
            };

            let addAnswers = (e) => {
                let answer = e.target.getAttribute('data-answer-id') || e.target.parentNode.getAttribute('data-answer-id');
                _user_answers[_current] = answer;
                quiz.highlight(e.target, "red");
                console.log(_user_answers);
            }

            let changeQuestion = (direction) => { // 0 - previous 1 - next
                if (direction && _current < _questions.length) {
                    _current++
                }
                else if (!direction && _current > 0) {
                    _current--;
                }
                else {
                    return;
                }
                // change answers text
                let q_answers = _questions[_current].answers;
                ui_answers_texts.map((answer, index) => {
                    changeText(ui_answers_texts[index], q_answers[index].answer);
                });
                // change questions text
                changeText(ui_question_text, _questions[_current].question)
            };

            let attachEvents = () => {
                next.addEventListener("click", () => {
                    changeQuestion(1);
                });
                prev.addEventListener("click", () => {
                    changeQuestion(0)
                });

                ui_answers.map((answer) => {
                    answer.addEventListener("click", (e) => {
                        addAnswers(e);
                    });
                })

            };

            let start = () => {
                ui_timer.innerHTML = _time;
                changeQuestion(1);
                attachEvents();
                startTimer(_time);
            };

            let end = () => {
                stopTimer(q_timer);
            }

            return {
                start: start,
                end: end
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

            let start_btn = document.getElementById('start');
            let end_btn = document.getElementById('end');

            start_btn.addEventListener('click', (e) => {
                    qs.start();
                    e.target.style.display = 'none';
                }
            );

            end_btn.addEventListener('click', (e) => {
                    qs.end();
                }
            );
        }).catch(error => {
    })


})(window);
