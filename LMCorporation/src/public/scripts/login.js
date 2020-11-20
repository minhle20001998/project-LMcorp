login();
const name = document.querySelector("#username");
const pw = document.querySelector("#password");
async function login() {
    const submit = document.querySelector("#submit");
    submit.addEventListener('click', fetchData);

}

async function fetchData() {
    let url = "http://localhost:3000/login";
    const defaultParams = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },

    }

    defaultParams.body = JSON.stringify({
        username: name.value,
        password: pw.value
    });
    console.log(defaultParams);
    const myResponse = await fetch(url, defaultParams);
    const myJson = await myResponse.json();
    if (myJson.status == "OK") {
        window.location.href = myJson.redirect;
    }
    else if (myJson.status == "WRONG") {
        addStatus();
    }
}

function addStatus() {
    const wrong_status = document.querySelector("#wrong");
    wrong_status.style.display = "block";

}



