const API = "http://43.204.214.112:30080/tasks";
loadTasks();

async function loadTasks() {

    const response = await fetch(API);

    const tasks = await response.json();

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(task => {

        taskList.innerHTML += `
        <div class="task">

            <span class="${task.completed ? 'completed' : ''}">
                ${task.title}
            </span>

            <div class="actions">

                <button onclick="toggleTask(${task.id}, ${task.completed})">
                    ${task.completed ? 'Undo' : 'Done'}
                </button>

                <button onclick="deleteTask(${task.id})">
                    Delete
                </button>

            </div>

        </div>
        `;
    });
}

async function addTask() {

    const input = document.getElementById("taskInput");

    const title = input.value.trim();

    if(title === "") return;

    await fetch(API, {
        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            title:title,
            completed:false
        })
    });

    input.value="";

    loadTasks();
}

async function toggleTask(id, completed) {

    const response = await fetch(API);

    const tasks = await response.json();

    const task = tasks.find(t => t.id === id);

    await fetch(`${API}/${id}`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            title:task.title,
            completed:!completed
        })
    });

    loadTasks();
}

async function deleteTask(id){

    await fetch(`${API}/${id}`,{
        method:"DELETE"
    });

    loadTasks();
}

document
.getElementById("themeToggle")
.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

});
