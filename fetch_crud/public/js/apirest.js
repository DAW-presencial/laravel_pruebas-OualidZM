document.addEventListener('DOMContentLoaded',() =>{
    get_Deportistas()
})

function RenderTable(deportista){
    let tabHeader = `
    <a href="/api/v1/deportistas"><button class="btn btn-outline-secondary mt-4 mx-4">See JSON</button></a>
    <h1 class="text-center">Deportista List</h1>
    <table class="table table-striped table-dark  table-bordered p-2 mt-5">
        <thead>
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th><button onclick="createLayoutDeportista()" class="btn btn-success">Add Deportista</button></th>
            </tr>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Phone</th>
                <th>Age</th>
                <th>Show</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        <tbody>`
            deportista.forEach(e => {
                    tabHeader +=
                    `
            <tr>
                <th>${e.id}</th>
                <th>${e.name}</th>
                <th>${e.surname}</th>
                <th>${e.phone}</th>

                <th>${e.age}</th>
                <th><button class="btn btn-primary" onclick="showDeportista(${e.id})">Show</buttons> </th>
                <th><button class="btn btn-warning" onclick="editDeportista(${e.id})">Edit</buttons> </th>
                <th><button class="btn btn-danger" onclick="deleteDeportista(${e.id})">Delete</buttons> </th>
            </tr>`
            
    })
    return tabHeader + '</tbody></table>'
    
}

function get_Deportistas(){
    fetch('http://127.0.0.1:8000/api/v1/deportistas')
    .then(res => res.json())
    .then(data => {
        document.getElementById('parent').innerHTML = RenderTable(data)
    })
}


function createLayoutDeportista() {
    // alert("layout create")
    let layoutCreate = `
    <div>
        <button onclick="returnBack()"  class="float-end btn btn-danger">Back</button>
    </div>
    <h2 class="text-center ">Add new Deportista</h2>

    <form  class="d-flex justify-content-around align-items-center mt-5 flex-column h-100" >
        <label  for="name">Name:</label>
        <input   type="text" name="name" id="create_name" placeholder="Name">

        <label for="surname">Surname:</label>
        <input  type="text" name="surname" id="create_surname" placeholder="Surname">

        <label for="surname">Phone:</label>
        <input  type="text" name="phone" id="create_phone" placeholder="Phone">

        <label for="age">Age:</label>
        <input  type="text" name="age" id="create_age" placeholder="Age">

        <input  type="submit" onclick="addDeportista()" class="btn btn-success" value="Add Deportista">
    </form>
    `
    document.getElementById('parent').innerHTML = layoutCreate
}

function returnBack () {
    return window.location.href =  window.location.href.split("?")[0]
}

function addDeportista(){
    let nameValue = document.getElementById('create_name').value
    let surnameValue = document.getElementById('create_surname').value
    let phoneValue = document.getElementById('create_phone').value
    let ageValue = document.getElementById('create_age').value
    let new_deportista = {
        name: nameValue,
        surname: surnameValue,
        phone: phoneValue,
        age: ageValue
        }
            fetch('api/v1/deportistas', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(new_deportista),
              })
        returnBack()
}


function showDeportista() {
    // document.getElementById('parent').innerHTML = "work fine"
}


function editDeportista(idd) {
    fetch(`http://127.0.0.1:8000/api/v1/deportistas/${idd}`,{
        method: 'GET'
    })
    .then(res => res.json())
    .then(deportista => {
        layoutEdit = `
        <div>
            <button onclick="returnBack()" class="float-end btn btn-danger">Back</button>
        </div>
        <h1 class="text-center">Edit Contant</h1>
        <form class=" d-flex  justify-content-around h-100 align-items-center flex-column mt-5" >
            <label for="name">New Name:</label>
            <input  type="text" name="name" id="edit_name" placeholder="New Name" value="${deportista.name}">
    
            <label for="surname">New Surname:</label>
            <input  type="text" name="surname" id="edit_surname" placeholder="New Surname" value="${deportista.surname}">
    
            <label for="surname">New Phone:</label>
            <input  type="text" name="surname" id="edit_phone" placeholder="New Surname" value="${deportista.phone}">

            <label for="age">New Age:</label>
            <input  type="text" name="age" id="edit_age" placeholder="New Age" value="${deportista.age}">
            <input type="submit" class="btn btn-success" onclick="update_Deportista(${idd})" value="Update Deportista">
        </form>
        `
        document.getElementById('parent').innerHTML = layoutEdit

    })
}

function update_Deportista(id){
    let nameValue = document.getElementById('edit_name').value
    let surnameValue = document.getElementById('edit_surname').value
    let phoneValue = document.getElementById('edit_phone').value

    let ageValue = document.getElementById('edit_age').value
    let update_deportista = {
        name: nameValue,
        surname: surnameValue,
        phone: phoneValue,
        age: ageValue
        }

    fetch(`api/v1/deportistas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(update_deportista),
        })
    returnBack()
}

function deleteDeportista(id) {
    fetch(`api/v1/deportistas/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: null,
      })
    returnBack()
}
