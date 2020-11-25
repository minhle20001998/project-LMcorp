register();
const uName = document.querySelector("#username");
const pw = document.querySelector("#password");
const email = document.querySelector("#email");
async function register() {
    const submit = document.querySelector("#submit");
    submit.addEventListener('click', registerFetch);

}

async function fetchData(url, body) {
    console.log("fetching");
    const defaultParams = {
        method: "POST",
        headers: {


            "Content-Type": "application/json",
        },

    }
    defaultParams.body = JSON.stringify(body);
    const myResponse = await fetch(url, defaultParams);
    const myJson = await myResponse.json();

    return myJson;
}

async function registerFetch() {
    let url = "http://localhost:3000/register";


    if (await validateRegister(uName.value, email.value, pw.value)) {
        console.log("validated");
        const body = {
            username: uName.value,
            email: email.value,
            password: pw.value
        };
        const myResponse = await fetchData(url, body);
        if (myResponse.status == "success") {
            const wrong_status = document.querySelector("#wrong");
            wrong_status.style.display = "block";
            const correct_p = wrong_status.querySelector("p");
            console.log(correct_p);
            correct_p.style.color = 'rgb(98 ,170, 62)';

            correct_p.textContent = 'Tài khoản đang đợi được duyệt';

        }

    }
    else {
        console.log("valin");
    }
}

function addStatus(err) {
    const wrong_status = document.querySelector("#wrong");
    const wrong_p = wrong_status.querySelector("p");
    wrong_p.textContent = err;
    wrong_status.style.display = "block";

}

async function validateRegister(uName, email, pw) {
    console.log(uName);
    console.log(pw);
    console.log(email);
    let check = false;
    if (uName != null && uName != "" && uName.length < 100 && (await isNameExist(uName) == true)) {

        check = true;
    }
    else if (uName == "") {
        addStatus("* Tên quá ngắn");
        return false;
    }
    else if (uName.length > 100) {
        addStatus('* Tên vượt quá độ dài cho phép');
        return false;
    } else if ((await isNameExist(uName) == false)) {
        console.log("trung ten");
        addStatus('* Tên tài khoản đã tồn tại');
        return false;
    }

    if (email != null && email != "" && email.length < 50 && isEmailValid(email) && (await isEmailExist(email) == true)) {

        check = true;
    }
    else if (email = "") {
        console.log("email ngắn");
        addStatus('* Email quá ngắn');
        return false;
    } else if (email.length > 50) {
        console.log("email dài");
        addStatus('* Email vượt quá độ dài cho phép');
        return false;
    } else if (isEmailValid(email) == 'false') {
        console.log("email sai");
        addStatus('* Email không hợp lệ');
        return false;
    } else if ((await isEmailExist(email) == false)) {
        addStatus('* Email đã tồn tại');
        return false;
    }

    if (pw != "") {
        check = true;
    } else {
        return false;
    }
    return check;
}

async function isNameExist(uName) {
    const url = 'http://localhost:3000/register/check'
    const body = {
        target: "username",
        username: uName
    }
    const check = await fetchData(url, body);
    return check.check;
}

async function isEmailExist(email) {
    const url = 'http://localhost:3000/register/check'
    const body = {
        target: "email",
        email: email
    }
    const check = await fetchData(url, body);
    console.log(check.check);
    return check.check;
}

function isEmailValid(email) {
    const re = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
    return re.test(email);
}




