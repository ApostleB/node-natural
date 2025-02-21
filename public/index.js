function sendMsg(){
    fetch("http://localhost:3000", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // 📌 Content-Type 설정 필수
        },
        body: JSON.stringify({
            text: document.getElementById("text1").value
        }),
    })
        .then(response => response.json())
        .then(res => {
            console.log(res.data.text)
        })
        .catch(error => {
            console.log("Error:", error);
        });

    document.getElementById("text1").value = "";
}

function sendApi(){
    fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // 📌 Content-Type 설정 필수
        },
        body: JSON.stringify({
            text: document.getElementById("text2").value
        }),
    })
        .then(response => response.json())
        .then(res => {
            console.log(res.data.text)
        })
        .catch(error => {
            console.log("Error:", error);
        });

    document.getElementById("text2").value = "";
}

function checkList(){
    const content = document.getElementById("content");
    content.innerHTML = "asdfadsf";

    fetch("http://localhost:3000/admin/api/tuneList", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // 📌 Content-Type 설정 필수
        },
        body: JSON.stringify({
            text: document.getElementById("text2").value
        }),
    })
        .then(response => response.json())
        .then(res => {
            console.log(res.data.text)
        })
        .catch(error => {
            console.log("Error:", error);
    });

}

function fineTune(){
    const content = document.getElementById("content");
    content.innerHTML = "asdfadsf";

    fetch("http://localhost:3000/admin/api/fineTune", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // 📌 Content-Type 설정 필수
        },
        body: JSON.stringify({
            text: document.getElementById("text2").value
        }),
    })
        .then(response => response.json())
        .then(res => {
            console.log(res.data.text)
        })
        .catch(error => {
            console.log("Error:", error);
        });

}
