function sendMsg(){
    fetch("http://localhost:3000", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // 📌 Content-Type 설정 필수
        },
        body: JSON.stringify({
            text: document.getElementById("text").value
        }),
    })
        .then(response => response.json())
        .then(res => {
            console.log(res.data.text)
        })
        .catch(error => {
            console.log("Error:", error);
        });

    document.getElementById("text").value = "";
}
