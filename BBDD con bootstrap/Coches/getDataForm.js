const db = firebase.firestore();

const todoForm = document.getElementById('todo_form');
const taskToDo = document.getElementById('task_todo');

let editState = false;
let id = '';

const createTask = (name, url, description) => {
    db.collection('Cars').doc().set({
        name,
        url,
        description
    });
};


//Obtener el id del botón accionado
const getCar = id => db.collection('Cars').doc(id).get();

const getCars = (callback) => db.collection('Cars').onSnapshot(callback);

const deleteCar = id => db.collection('Cars').doc(id).delete();

const updateCar = (id, updatedTask) => db.collection('Cars').doc(id).update(updatedTask);


//Eliminamos la nota seleccionda
window.addEventListener('DOMContentLoaded', async (e) => {
    getTasks((querySnapshot) => {
        taskToDo.innerHTML = '';
        querySnapshot.forEach(doc => {
            const if_url = `<a href="${doc.data().url}">URL de tarea</a>` 
            taskToDo.innerHTML += `
                <div class="card my-2 p-2">
                    <h4>${doc.data().name}</h4>
                    <p>${doc.data().description}</p>
                    ${doc.data().url ? 
                        if_url
                        : ''
                    }
                    <div>
                        <button class="btn btn-secondary btn-edit" data-id="${doc.id}">Editar</button>
                        <button class="btn btn-primary btn-delete" data-id="${doc.id}">Eliminar</button>
                    </div>
                </div>
            `;

            const deleteButtons = document.querySelectorAll('.btn-delete');
            deleteButtons.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    await deleteTask(e.target.dataset.id);
                })
            })

            //Editamos la nota
            //Editamos el nombre de guardar por editar y ponemos en el formulario los datos obtenidos de la nota seleccionda
            const editButtons = document.querySelectorAll('.btn-edit');
            editButtons.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const doc = await getTask(e.target.dataset.id);
                    const task = doc.data();

                    editState = true;
                    id = doc.id;

                    todoForm['todo_name'].value = task.name;
                    todoForm['todo_url'].value = task.url;
                    todoForm['todo_description'].value = task.description;
                    todoForm['btn_todo_form'].innerHTML = 'Editar';
                })
            })
        });
    });
});

/*
todoForm.addEventListener('submit', async e => {
    e.preventDefault();
    const name = todoForm['todo_name'].value;
    const url = todoForm['todo_url'].value;
    const description = todoForm['todo_description'].value;

    if (!editState) {
        await createTask(name, url, description); // Llamo a mi función create
    } else {
        await updateTask(id, {name, url, description});
        editState = false;
        id = '';
        todoForm['btn_todo_form'].innerHTML = 'Guardar';
    }

    todoForm.reset(); // Reseteamos los campos
});

*/



todoForm.addEventListener('submit', async e => {
    e.preventDefault();
    const Brand = todoForm['todo_brand'].value;
    const modelo = todoForm['todo_modelo'].value;
    const description = todoForm['todo_description'].value;


    if (!editState) {
        await createTask(name, url, description); // Llamo a mi función create
    } else {
        await updateTask(id, {name, url, description});
        editState = false;
        id = '';
        todoForm['btn_todo_form'].innerHTML = 'Guardar';
    }

    todoForm.reset(); // Reseteamos los campos
});
