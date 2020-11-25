function main() {
    generateTable();
}
main();

async function generateTable() {
    console.log('generate');
    let url = "http://localhost:3000/access/all";
    let body = {
        need: "getAll"
    };
    console.log(body);
    const user_register = await fetchData(url, body);
    console.log(user_register);
    const table = document.querySelector(".table");
    user_register.forEach(element => {
        const row = generateRow(element);
        table.appendChild(row);
    })
}
function generateRow(data) {
    const table_row = document.createElement('tr');
    table_row.classList.add('t_row');
    table_row.setAttribute('id', `row_${data["register_id"]}`);
    for (const key in data) {
        let keyData = data[key];
        const table_data = generateData(keyData);
        table_row.appendChild(table_data);


    }
    const table_action = generateAction(data["register_id"]);
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
    const accept_button = document.createElement('button');
    const denied_button = document.createElement('button');
    //
    accept_button.addEventListener('click', () => {
        accept(ID);
    });
    denied_button.addEventListener('click', () => {
        denied(ID);
    })

    table_data.classList.add('action');
    accept_button.classList.add('accept_button');
    accept_button.setAttribute('id', `${ID}_accept`);
    denied_button.classList.add('denied_button');
    denied_button.setAttribute('id', `${ID}_denied`);
    //
    accept_button.innerHTML = '<i class="fas fa-user-check"></i>';
    denied_button.innerHTML = '<i class="fas fa-user-times"></i>';
    table_data.appendChild(accept_button);
    table_data.appendChild(denied_button);
    return table_data;
}

async function accept(ID) {
    const url = "http://localhost:3000/access/decision";
    const body = {};
    body.decision = "accept";
    body.ID = ID;
    console.log(body);

    const result = await fetchData(url, body);
    if (result.status == "success") {

        reloadTable();
    }
}

async function denied(ID) {
    const url = "http://localhost:3000/access/decision";
    const body = {};
    body.decision = "denied";
    body.ID = ID;
    console.log(body);

    const result = await fetchData(url, body);
    if (result.status == "success") {

        reloadTable();
    }
}

function reloadTable() {
    const table = document.querySelectorAll('.t_row');
    table.forEach(element => {
        element.remove();
    })
    generateTable();
}

