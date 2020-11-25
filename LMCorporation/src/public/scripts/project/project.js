function main() {
    generateTable();
    clientNameDropBox();
    addProject();
}
main();


async function clientNameDropBox() {
    let url = "http://localhost:3000/client/all";
    //fetch data
    const clients = await fetchData(url, {
        need: "name"
    });
    console.log(clients);
    //add data to drop box
    const selectDiv = document.querySelector("#customers");
    clients.forEach(element => {
        const option = document.createElement("option");
        const cName = element.name;
        const cID = element.customerID;
        option.value = cName + "_" + cID;
        option.textContent = cName;
        selectDiv.appendChild(option);
    })
}

async function generateTable() {
    console.log('generate');
    let url = "http://localhost:3000/project/all";
    let body = {
        need: "getAll"
    };
    const projects = await fetchData(url, body);
    projects.sort((a, b) => {
        return a.ProjectID - b.ProjectID;
    })
    const table = document.querySelector(".table");
    projects.forEach(element => {
        const row = generateRow(element);
        table.appendChild(row);
    })
}
function generateRow(data) {
    const table_row = document.createElement('tr');
    table_row.classList.add('t_row');
    table_row.setAttribute('id', `row_${data["ProjectID"]}`);
    for (const key in data) {

        let keyData = data[key];
        if (key == "price") {
            keyData = "$ " + data[key];
        }

        if (key == "employees") {
            let stringEmloyee = "";
            data[key].forEach(element => {
                const employee = element.name + "-" + element.EmployeeID;
                stringEmloyee += employee + ", ";
                console.log(stringEmloyee);
            })
            keyData = stringEmloyee.substring(0, stringEmloyee.length - 2);
        }
        if (key == "deadline") {
            dateRaw = new Date(data[key]);

            year = dateRaw.getFullYear();
            month = dateRaw.getMonth() + 1;
            date = dateRaw.getDate();
            if (date < 10) {
                date = '0' + date;
            } if (month < 10) {
                month = '0' + month;
            }

            keyData = String(date) + " / " + String(month) + " / " + String(year);
        }
        const table_data = generateData(keyData);
        table_row.appendChild(table_data);
    }
    const table_action = generateAction(data["ProjectID"]);
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
    const e_add_button = document.createElement('button');
    const e_remove_button = document.createElement('button');
    const delete_button = document.createElement('button');
    //
    edit_button.addEventListener('click', handleEdit);
    delete_button.addEventListener('click', () => {
        if (confirm("Bạn chắc chắn muốn xóa ? Dữ liệu bị xóa sẽ ko thể được phục hồi")) {
            deleteProject(ID);
        }
    })
    e_add_button.addEventListener('click', handleAddEmployee);
    e_remove_button.addEventListener('click', handleRemoveEmployee);
    //
    table_data.classList.add('action');
    edit_button.classList.add('edit_button');
    edit_button.setAttribute('id', `${ID}_edit`);
    delete_button.classList.add('delete_button');
    delete_button.setAttribute('id', `${ID}_delete`);
    e_add_button.setAttribute('id', `${ID}_add`);
    e_add_button.classList.add('add_e_button');
    e_remove_button.setAttribute(`id`, `${ID}_remove`)
    e_remove_button.classList.add('remove_e_button');

    //
    edit_button.innerHTML = '<i class="fas fa-edit"></i>';
    delete_button.innerHTML = '<i class="far fa-trash-alt"></i>';
    e_add_button.innerHTML = '<i class="fas fa-user-plus"></i>';
    e_remove_button.innerHTML = `<i class="fas fa-user-minus"></i>`;

    table_data.appendChild(edit_button);
    table_data.appendChild(e_add_button);
    table_data.appendChild(e_remove_button);
    table_data.appendChild(delete_button);
    return table_data;
}
function handleEdit(event) {
    const currentTarget = event.currentTarget;
    const idTarget = currentTarget.getAttribute('id');
    console.log("---------" + idTarget);
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
        title.textContent = 'Edit Project';
        const id = getIDFromName(idName);
        const idTextBox = edit_form.querySelector('.ID_input');
        idTextBox.value = id;
        autoInput(id);
        saveButton.addEventListener('click', () => {
            editProject(id);
        }, { once: true });
        edit_form.style.display = 'flex';
    }
    else if (purpose == "add") {
        console.log("open edit");
        title.textContent = 'Add Project';
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
        editTable.querySelector(".nameP_input").value = keys[1].textContent;
        editTable.querySelector(".price_input").value = keys[3].textContent.replace(/ /g, '');

    }
    else if (ID == "clear") {
        editTable.querySelector(".nameP_input").value = "";
        editTable.querySelector(".price_input").value = "";
        editTable.querySelector(".ID_input").value = "Tự động tăng";
    }
}
//fetch done => delete button
async function editProject(id) {
    url = "http://localhost:3000/project/edit";
    const editTable = document.querySelector('.edit_form');
    const nameP = editTable.querySelector(".nameP_input").value;
    const nameC = editTable.querySelector("#customers").value;
    const price = editTable.querySelector(".price_input").value;
    const deadline = editTable.querySelector(".deadline_input").value;
    if (validateInput(nameP, nameC, price, deadline)) {
        console.log("validated");
        const body = {};
        body.purpose = 'add project'
        body.id = id;
        body.title = nameP;
        body.CustomerID = nameC.substring(nameC.indexOf("_") + 1, nameC.length);
        body.price = price;
        body.deadline = deadline;
        editTable.style.display = 'none';
        console.log(body);
        const data = await fetchData(url, body);
        if (data.status == 'success') {
            const save_button = editTable.querySelector('.save');
            const delete_button = editTable.querySelector('.close');
            save_button.remove();
            delete_button.remove();
            removeEventListener();
            reloadTable();
        }
    } else {
        const saveButton = editTable.querySelector('.save_button');
        saveButton.addEventListener('click', () => {
            editProject(id);
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
function validateInput(nameP, nameC, price, deadline) {
    let check = false;
    if (nameP != null && nameP != "" && nameP < 100) {
        check = true;
    } else {
        displayInvalid('Tên dự án');
        return false;
    }
    if (price != null && price != "" && isPriceValid(price) && price.toString().length < 10) {
        check = true;
    } else {
        displayInvalid('Giá tiền');
        return false;
    }
    if (deadline != null && deadline != "") {
        check = true;
    } else {
        displayInvalid('Thời hạn');
        return false;
    }
    if (nameC != null && nameC != "" && nameC.length < 30) {
        check = true;
    } else {
        displayInvalid('Tên khách hàng');
        return false;
    }
    return check;

}

function isPriceValid(price) {
    const re = /^\$?\d+(,\d{3})*(\.\d*)?$/g;
    return re.test(price);
}
function displayInvalid(str) {
    const invalid_div = document.querySelector('.invalid');
    const message = invalid_div.querySelector('p');
    message.textContent = `* Sai cú pháp tại ${str}`;
    invalid_div.style.display = 'block';
}

function addProject() {
    const add_button = document.querySelector(".add_btn");
    add_button.addEventListener('click', () => {
        openEdit('add', "");
    });
}
async function handleAddButton() {
    url = "http://localhost:3000/project/add";
    const editTable = document.querySelector('.edit_form');
    const nameP = editTable.querySelector(".nameP_input").value;
    const nameC = editTable.querySelector("#customers").value;
    const price = editTable.querySelector(".price_input").value;
    const deadline = editTable.querySelector(".deadline_input").value;
    if (validateInput(nameP, nameC, price, deadline)) {
        console.log("validated");
        const body = {};
        body.title = nameP;
        body.CustomerID = nameC.substring(nameC.indexOf("_") + 1, nameC.length);
        body.price = price;
        body.deadline = deadline;
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
            handleAddButton();
        }, { once: true });
    }
}

async function deleteProject(ID) {
    url = "http://localhost:3000/project/delete";
    body = {
        id: `${ID}`
    };
    const data = await fetchData(url, body);
    if (data.status == "success") {
        reloadTable();
    }
}
