(function (w) {

    let quiz = w.q;

    let data = quiz.getData(quiz.url)
        .then((data) => {
            console.log(data);
        })


})(window);
