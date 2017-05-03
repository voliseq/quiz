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
                _current = -1,
                _user_answers = [],
                _correct_answers = quiz.correctAnswers(q_data),
                _finished = false;

            let stopTimer = (timer) => {
                clearInterval(timer);
            };

            let startTimer = (time) => {
                q_timer = setInterval(() => {
                    time--;
                    ui_timer.innerHTML = time;

                    if (time <= 0) {
                        clearInterval(q_timer);
                        end();
                    }

                }, 1000)
            };

            let changeText = (element, text) => {
                element.innerText = text;
            };

            let addAnswers = (e) => {
                let answer = e.target.getAttribute('data-answer-id') || e.target.parentNode.getAttribute('data-answer-id');
                _user_answers[_current] = parseInt(answer);
                quiz.removeClassArr(ui_answers, "selected");
                quiz.addClass(e.target, "selected");
            }

            let changeQuestion = (direction, number) => { // 0 - previous 1 - next
                if (number != undefined) {
                    _current = number;
                }
                else if (direction && _current < _questions.length - 1) {
                    _current++;
                }
                else if (!direction && _current > 0) {
                    _current--;
                }
                else {
                    return;
                }
                let q_answers = _questions[_current].answers;

                ui_answers.map((answer, index) => {
                    changeText(ui_answers[index], q_answers[index].answer);
                });

                changeText(ui_question_text, _questions[_current].question);
                quiz.removeClassArr(ui_answers, "selected");
                quiz.removeClassArr(ui_answers, "selected--wrong");
                if (_user_answers[_current] != null) {
                    let cls = _user_answers[_current] == _correct_answers[_current] ? "selected" : "selected--wrong";
                    quiz.addClass(ui_answers[_user_answers[_current]], cls);
                }
                if(_finished){
                    quiz.removeClassArr(ui_answers, "correct");
                    quiz.addClass(ui_answers[_correct_answers[_current]], "correct");
                }



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
                startTimer(3);
            };

            let end = () => {
                _finished = true;
                stopTimer(q_timer);
                changeQuestion(0, 0);
            };

            return {
                start: start,
                end: end
            }

        };

        return {
            getInstance: () => {
                if (!instance) {
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
            let feedback = document.getElementById('feedback');

            start_btn.addEventListener('click', (e) => {
                    qs.start();
                    e.target.style.display = 'none';
                }
            );

            end_btn.addEventListener('click', (e) => {
                    qs.end();
                    feedback.style.display = "block";
                }
            );
        }).catch(error => {
    })


})(window);
