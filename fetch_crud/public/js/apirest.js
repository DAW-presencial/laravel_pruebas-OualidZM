document.addEventListener('DOMContentLoaded',() =>{
    get_Contacts()
})

function RenderTable(contacts){
    let tabHeader = `
    <a href="/api/v3/contactoss"><button class="btn btn-outline-secondary mt-4 mx-4">See JSON</button></a>
    <h1 class="text-center">Contact List</h1>
    <table class="table table-striped table-dark  table-bordered p-2 mt-5">
        <thead>
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th><button onclick="createLayoutContact()" class="btn btn-success">Add Contact</button></th>
            </tr>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Age</th>
                <th>Show</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        <tbody>`
                contacts[0].forEach(e => {
                    tabHeader +=
                    `
            <tr>
                <th>${e.id}</th>
                <th>${e.name}</th>
                <th>${e.surname}</th>
                <th>${e.age}</th>
                <th><button class="btn btn-primary" onclick="showContact(${e.id})">Show</buttons> </th>
                <th><button class="btn btn-warning" onclick="editContact(${e.id})">Edit</buttons> </th>
                <th><button class="btn btn-danger" onclick="deleteContact(${e.id})">Delete</buttons> </th>
            </tr>`
            
    })
    return tabHeader + '</tbody></table>'
    
}

function get_Contacts(){
    fetch('http://127.0.0.1:8000/api/v3/contactoss')
    .then(res => res.json())
    .then(data => {
        document.getElementById('parent').innerHTML = RenderTable(data)
    })
}


function createLayoutContact() {
    // alert("layout create")
    let layoutCreate = `
    <div>
        <button onclick="returnBack()"  class="float-end btn btn-danger">Back</button>
    </div>
    <h2 class="text-center ">Add new Contact</h2>

    <form  class="d-flex justify-content-around align-items-center mt-5 flex-column h-100" >
        <label  for="name">Name:</label>
        <input   type="text" name="name" id="create_name" placeholder="Name">
        <label for="surname">Surname:</label>
        <input  type="text" name="surname" id="create_surname" placeholder="Surname">
        <label for="age">Age:</label>
        <input  type="text" name="age" id="create_age" placeholder="Age">
        <input  type="submit" onclick="addContact()" class="btn btn-success" value="Add Contact">
    </form>
    `
    document.getElementById('parent').innerHTML = layoutCreate
}

function returnBack () {
    return window.location.href =  window.location.href.split("?")[0]
}

function addContact(){
    let nameValue = document.getElementById('create_name').value
    let surnameValue = document.getElementById('create_surname').value
    let ageValue = document.getElementById('create_age').value
    let new_contact = {
        name: nameValue,
        surname: surnameValue,
        age: ageValue
        }
            fetch('api/v3/contactoss', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(new_contact),
              })
        returnBack()
}


function showContact() {
    // document.getElementById('parent').innerHTML = "work fine"
}


function editContact(idd) {
    fetch(`http://127.0.0.1:8000/api/v3/contactoss/${idd}`,{
        method: 'GET'
    })
    .then(res => res.json())
    .then(contact => {
        contact.forEach(e =>{
        layoutEdit = `
        <div>
            <button onclick="returnBack()" class="float-end btn btn-danger">Back</button>
        </div>
        <h1 class="text-center">Edit Contant</h1>
        <form class=" d-flex  justify-content-around h-100 align-items-center flex-column mt-5" >
            <label for="name">New Name:</label>
            <input  type="text" name="name" id="edit_name" placeholder="New Name" value="${e.name}">
    
            <label for="surname">New Surname:</label>
            <input  type="text" name="surname" id="edit_surname" placeholder="New Surname" value="${e.surname}">
    
            <label for="age">New Age:</label>
            <input  type="text" name="age" id="edit_age" placeholder="New Age" value="${e.age}">
            <input type="submit" class="btn btn-success" onclick="update_Contact(${idd})" value="Update Contact">
        </form>
        `
        })
        document.getElementById('parent').innerHTML = layoutEdit

    })
}

function update_Contact(id){
    let nameValue = document.getElementById('edit_name').value
    let surnameValue = document.getElementById('edit_surname').value
    let ageValue = document.getElementById('edit_age').value
    let new_contact = {
        name: nameValue,
        surname: surnameValue,
        age: ageValue
        }

    fetch(`api/v3/contactoss/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(new_contact),
        })
    returnBack()
}

function deleteContact(id) {
    fetch(`api/v3/contactoss/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: null,
      })
    returnBack()
}
