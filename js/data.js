(function (w) {

    let q = {url: "https://cdn.rawgit.com/kdzwinel/cd08d08002995675f10d065985257416/raw/811ad96a0567648ff858b4f14d0096ba241f28ef/quiz-data.json"};
    q.getData = (url) => {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onload = () => {
                if (xhr.status == 200) {
                    resolve(xhr.response);
                }
                else {
                    reject(xhr.statusText);
                }
            }
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
        })
    };

    w.q = w.q || q;

})(window);

