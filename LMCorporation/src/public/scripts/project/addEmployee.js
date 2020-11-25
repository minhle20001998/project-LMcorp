function handleAddEmployee(event) {
    const currentTarget = event.currentTarget;
    const idTarget = currentTarget.getAttribute('id');
    console.log("---------" + idTarget);
    openAddEmp("add", idTarget);
}
function handleRemoveEmployee(event) {
    const currentTarget = event.currentTarget;
    const idTarget = currentTarget.getAttribute('id');
    console.log("---------" + idTarget);
    openAddEmp("remove", idTarget);
}

function openAddEmp(purpose, idName) {
    const add_form = document.querySelector('.add_form');
    const add_table = document.querySelector('.add_table');
    const add_body = document.querySelector('.add_body');
    const add_header = document.querySelector('.add_header');
    const title = add_body.querySelector('p');
    const div_save = em_createSaveButton();
    add_table.appendChild(div_save);
    const saveButton = div_save.querySelector('button');
    const closeButton = em_createCloseButton();
    add_header.appendChild(closeButton);
    saveButton.textContent = 'Save';

    const close_button = add_header.querySelector('button');
    close_button.addEventListener('click', () => {
        add_form.style.display = 'none';
        div_save.remove();
        close_button.remove();
        removeOptions();
    });
    if (purpose == "add" && idName != "") {
        employeeNameDropBox("all", "");
        title.textContent = 'Chọn 1 nhân viên để thêm vào dự án';
        const id = em_getIDFromName("add", idName);
        saveButton.addEventListener('click', () => {
            EmpProject("add", id);
        }, { once: true });
        add_form.style.display = 'flex';
    }
    if (purpose == "remove") {
        const id = em_getIDFromName("remove", idName);
        console.log("--------v------------");
        console.log(id);
        employeeNameDropBox("only", id);
        title.textContent = 'Chọn 1 nhân viên để loại khỏi dự án';
        saveButton.addEventListener('click', () => {
            EmpProject("remove", id);
        }, { once: true });
        add_form.style.display = 'flex';
    }
}
function em_getIDFromName(type, ID) {
    let cutID = "";
    if (type == "add") {
        cutID = ID.replace("_add", "");
    }
    if (type == "remove") {
        cutID = ID.replace("_remove", "");
    }
    return cutID;
}

function em_createSaveButton() {
    const div_save = document.createElement('div');
    div_save.classList.add('save');
    const saveButton = document.createElement('button');
    saveButton.classList.add('save_button');
    div_save.appendChild(saveButton);
    return div_save;
}

function em_createCloseButton() {
    console.log("create");
    const closeButton = document.createElement('button');
    closeButton.classList.add("close");
    closeButton.innerHTML = ' <i class="far fa-times-circle"></i>';
    return closeButton;
}

async function EmpProject(purpose, id) {
    url = "http://localhost:3000/project/edit";
    const add_form = document.querySelector('.add_form');
    const selectDiv = add_form.querySelector('select');
    const selected_employee = selectDiv.value;
    console.log("------selected-------");
    console.log(selected_employee);
    if (selected_employee != "") {
        const body = {};
        body.id = id;
        if (purpose == "add") {
            body.purpose = "edit add employee";
        }
        else if (purpose == "remove") {
            body.purpose = "edit remove employee";
        }
        body.EmployeeID = selected_employee.substring(selected_employee.indexOf("_") + 1, selected_employee.length);
        console.log(body);
        add_form.style.display = 'none';
        removeOptions();
        const data = await fetchData(url, body);
        console.log("data");
        console.log(data);
        if (data.status == 'success') {
            const e_save_button = add_form.querySelector('.save');
            const e_delete_button = add_form.querySelector('.close');
            e_save_button.remove();
            e_delete_button.remove();
            em_removeEventListener();
            reloadTable();
        }
    }
    else {
        add_form.style.display = 'none';
        removeOptions();
        const e_save_button = add_form.querySelector('.save');
        const e_delete_button = add_form.querySelector('.close');
        e_save_button.remove();
        e_delete_button.remove();
        em_removeEventListener();
        reloadTable();
    }
}



function em_removeEventListener() {
    const add_button = document.querySelector('.add_e_button');
    if (add_button != null) {
        add_button.removeEventListener('click', handleAddEmployee);
    }
}

function reloadTable() {
    const table = document.querySelectorAll('.t_row');
    table.forEach(element => {
        element.remove();
    })
    generateTable();
}

function removeOptions() {
    const add_form = document.querySelector('.add_form');
    const options = add_form.querySelectorAll('option');
    options.forEach(element => {
        element.remove();
    })
}

async function employeeNameDropBox(purpose, id) {
    const url = `http://localhost:3000/employee/all`;
    if (purpose == "all" && id == "") {

        const body = {
            need: "name all"
        }
        const allEmployees = await fetchData(url, body);
        const selectDiv = document.querySelector("#employees");
        allEmployees.forEach(employee => {
            const option = document.createElement("option");
            const eName = employee.name;
            const eID = employee.employeeID;
            option.value = eName + "_" + eID;
            option.textContent = eName;
            selectDiv.appendChild(option);
        })
    }
    if (purpose == "only") {

        const body = {
            id: id,
            need: "name employee pTeam"
        }
        const pTeam_names = await fetchData(url, body);
        console.log("----------------");
        console.log(pTeam_names);
        const selectDiv = document.querySelector("#employees");
        pTeam_names.forEach(employee => {
            const option = document.createElement("option");
            const eName = employee.name;
            const eID = employee.employeeID;
            option.value = eName + "_" + eID;
            option.textContent = eName;
            selectDiv.appendChild(option);
        })

    }

}