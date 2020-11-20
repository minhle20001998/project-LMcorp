function main() {
    generateTable();
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
    // edit_button.addEventListener('click', handleEdit);
    delete_button.addEventListener('click', () => {
        if (confirm("Bạn chắc chắn muốn xóa ? Dữ liệu bị xóa sẽ ko thể được phục hồi")) {
            deleteEmployee(ID);
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
