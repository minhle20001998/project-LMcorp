function main() {
    generateTable();
    addCustomer();
}
main();
async function fetchData(url, body) {
    const defaultParams = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },

    }
    defaultParams.body = JSON.stringify(body);
    const myResponse = await fetch(url, defaultParams);
    const myJson = await myResponse.json();

    return myJson
}
async function generateTable() {
    console.log('generate');
    let url = "http://localhost:3000/client/all";
    let body = {
        need: "getAll"
    };
    const clients = await fetchData(url, body);
    console.log(clients);
    const table = document.querySelector(".table");
    clients.forEach(element => {
        const row = generateRow(element);
        table.appendChild(row);
    })
}
function generateRow(data) {
    const table_row = document.createElement('tr');
    table_row.classList.add('t_row');
    table_row.setAttribute('id', `row_${data["CustomerID"]}`);
    for (const key in data) {

        let keyData = data[key];

        const table_data = generateData(keyData);
        table_row.appendChild(table_data);
    }
    const table_action = generateAction(data["CustomerID"]);
    table_row.appendChild(table_action);
    return table_row;
}
function generateData(data) {
    const table_data = document.createElement('td');
    table_data.textContent = data;

    return table_data
}
function generateAction(ID) {
    const table_data = document.createElement('td');
    const edit_button = document.createElement('button');
    const delete_button = document.createElement('button');
    //
    edit_button.addEventListener('click', handleEdit);
    delete_button.addEventListener('click', () => {
        if (confirm("Bạn chắc chắn muốn xóa ? Dữ liệu bị xóa sẽ ko thể được phục hồi")) {
            deleteCustomer(ID);
        }
    })
    //
    table_data.classList.add('action');
    edit_button.classList.add('edit_button');
    edit_button.setAttribute('id', `${ID}_edit`);
    delete_button.classList.add('delete_button');
    delete_button.setAttribute('id', `${ID}_delete`);
    //
    edit_button.innerHTML = '<i class="fas fa-edit"></i>';
    delete_button.innerHTML = '<i class="far fa-trash-alt"></i>';
    table_data.appendChild(edit_button);
    table_data.appendChild(delete_button);
    return table_data;
}

function handleEdit(event) {
    const currentTarget = event.currentTarget;
    const idTarget = currentTarget.getAttribute('id');
    console.log(idTarget);
    openEdit("edit", idTarget);
}
function openEdit(purpose, idName) {
    const edit_form = document.querySelector('.edit_form');
    const edit_table = document.querySelector('.edit_table');
    const edit_header = document.querySelector('.edit_header');
    const title = edit_header.querySelector('p');
    const div_save = createSaveButton();
    edit_table.appendChild(div_save);
    const saveButton = div_save.querySelector('button');
    const closeButton = createCloseButton();
    edit_header.appendChild(closeButton);
    saveButton.textContent = 'Save';
    const close_button = edit_header.querySelector('button');
    close_button.addEventListener('click', () => {
        edit_form.style.display = 'none';
        div_save.remove();
        close_button.remove();
    });
    if (purpose == "edit" && idName != "") {
        title.textContent = 'Edit Customer';
        const id = getIDFromName(idName);
        const idTextBox = edit_form.querySelector('.ID_input');
        idTextBox.value = id;
        autoInput(id);
        saveButton.addEventListener('click', () => {
            editCustomer(id);
        }, { once: true });
        edit_form.style.display = 'flex';
    }
    else if (purpose == "add") {
        console.log("open edit");
        title.textContent = 'Add Customer';
        autoInput("clear");
        edit_form.style.display = 'flex';
        saveButton.addEventListener('click', () => {
            handleAddButton();
        }, { once: true })
    }
}
function getIDFromName(ID) {
    const cutID = ID.replace("_edit", "");
    return cutID;
}
function createSaveButton() {
    const div_save = document.createElement('div');
    div_save.classList.add('save');
    const saveButton = document.createElement('button');
    saveButton.classList.add('save_button');
    div_save.appendChild(saveButton);
    return div_save;
}
function createCloseButton() {
    console.log("create");
    const closeButton = document.createElement('button');
    closeButton.classList.add("close");
    closeButton.innerHTML = ' <i class="far fa-times-circle"></i>';
    return closeButton;
}
function autoInput(ID) {
    console.log(ID);
    const editTable = document.querySelector('.edit_form');
    if (ID != "clear") {
        const trow = document.querySelector(`#row_${ID}`);
        const keys = trow.querySelectorAll('td');
        editTable.querySelector(".name_input").value = keys[1].textContent;
        editTable.querySelector(".phone_input").value = keys[2].textContent;
        editTable.querySelector(".email_input").value = keys[3].textContent;
        editTable.querySelector(".address_input").value = keys[4].textContent;
    }
    else if (ID == "clear") {
        editTable.querySelector(".name_input").value = "";
        editTable.querySelector(".phone_input").value = "";
        editTable.querySelector(".email_input").value = "";
        editTable.querySelector(".address_input").value = "";
        editTable.querySelector(".ID_input").value = "Tự động tăng";
    }
}
async function editCustomer(id) {
    url = "http://localhost:3000/client/edit";
    const editTable = document.querySelector('.edit_form');
    const name = editTable.querySelector(".name_input").value;
    const phone = editTable.querySelector(".phone_input").value;
    const email = editTable.querySelector(".email_input").value;
    const address = editTable.querySelector(".address_input").value;
    if (validateInput(name, phone, email, address)) {
        console.log("validated");
        const body = {};
        body.id = id;
        body.name = name;
        body.phone = phone;
        body.email = email;
        body.address = address;
        editTable.style.display = 'none';
        const data = await fetchData(url, body);
        if (data.status == 'success') {
            const save_button = document.querySelector('.save');
            const delete_button = document.querySelector('.close');
            save_button.remove();
            delete_button.remove();
            removeEventListener();
            reloadTable();
        }
    } else {
        const saveButton = editTable.querySelector('.save_button');
        saveButton.addEventListener('click', () => {
            editCustomer(id);
        }, { once: true });
    }
}

function removeEventListener() {
    const edit_button = document.querySelector('.edit_button');
    if (edit_button != null) {
        edit_button.removeEventListener('click', handleEdit);
    }
}

function reloadTable() {
    const table = document.querySelectorAll('.t_row');
    table.forEach(element => {
        element.remove();
    })
    generateTable();
}
function validateInput(name, phone, email, address) {
    let check = false;
    if (name != null && name != "" && isNameValid(name)&& name.length < 30) {
        check = true;
    } else {
        displayInvalid('Tên');
        return false;
    }
    if (phone != null && phone != "" && isPhoneValid(phone)&& phone.length < 15) {
        check = true;
    } else {
        displayInvalid('Số điện thoại');
        return false;
    }
    if (email != null && email != "" && isEmailValid(email)&& email.length < 50) {
        check = true;
    } else {
        displayInvalid('Email');
        return false;
    }
    if (address != null && address != ""&& address.length < 100) {
        check = true;
    } else {
        displayInvalid('Địa chỉ');
        return false;
    }
    return check;

}
function removeAscent(str) {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}
function isNameValid(name) {
    const re = /^((?=[a-z \']).)+$/i // regex here
    return re.test(removeAscent(name))
}

function isPhoneValid(phone) {
    const re = /^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/g;
    return re.test(phone);
}

function isEmailValid(email) {
    const re = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
    return re.test(email);
}
function displayInvalid(str) {
    const invalid_div = document.querySelector('.invalid');
    const message = invalid_div.querySelector('p');
    message.textContent = `* Sai cú pháp tại ${str}`;
    invalid_div.style.display = 'block';
}
function addCustomer() {
    const add_button = document.querySelector(".add_btn");
    add_button.addEventListener('click', () => {
        openEdit('add', "");
    });
}
async function handleAddButton() {
    url = "http://localhost:3000/client/add";
    const editTable = document.querySelector('.edit_form');
    const name = editTable.querySelector(".name_input").value;
    const phone = editTable.querySelector(".phone_input").value;
    const email = editTable.querySelector(".email_input").value;
    const address = editTable.querySelector(".address_input").value;
    if (validateInput(name, phone, email, address)) {
        console.log("validated");
        const body = {};
        body.name = name;
        body.phone = phone;
        body.email = email;
        body.address = address;
        editTable.style.display = 'none';
        console.log(body);
        const data = await fetchData(url, body);
        console.log(data);
        if (data.status == 'success') {
            const save_button = document.querySelector('.save');
            const delete_button = document.querySelector('.close');
            save_button.remove();
            delete_button.remove();
            removeEventListener();
            reloadTable();
        }
    } else {
        const saveButton = editTable.querySelector('.save_button');
        saveButton.addEventListener('click', () => {
            handleAddButton();
        }, { once: true });
    }
}

async function deleteCustomer(ID) {
    url = "http://localhost:3000/client/delete";
    body = {
        id: `${ID}`
    };
    const data = await fetchData(url, body);
    if (data.status == "success") {
        reloadTable();
    }
}