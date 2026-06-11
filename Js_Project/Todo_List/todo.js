const dueDiv = document.getElementById('due-tasks');
const todayDiv = document.getElementById('today-tasks');
const upcomingDiv = document.getElementById('upcoming-tasks');
const tasksList = JSON.parse(localStorage.getItem('tasks')) || [];

const searchBar = document.getElementById('search-bar');

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasksList));
}

const clearSearchAlert = () => {
    
    const search = document.getElementById('search-bar').value;

    if(search){
        alert('Please clear search bar');
        return true;
    }

    return false;
    
}

function createTodo(description, date, time, divName, index){

    const todoDiv = document.createElement('div');
    
    const dateText = document.createElement('div');
    dateText.innerText = date;
    dateText.classList.add('date')

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('details')

    const descriptionDiv = document.createElement('div');
    descriptionDiv.innerText = description + ' at ' + time;
    descriptionDiv.classList.add('description')

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('buttons')

    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    editButton.classList.add('edit-btn');
    deleteButton.classList.add('delete-btn');

    editButton.innerText = "Edit";
    deleteButton.innerText = "Delete";

    buttonDiv.append(editButton, deleteButton);
    detailsDiv.append(descriptionDiv, buttonDiv);

    todoDiv.append(dateText, detailsDiv);
    divName.append(todoDiv);


    deleteButton.addEventListener('click', () => {
        if(clearSearchAlert()) return;

        tasksList.splice(index, 1);
        saveTasks();
        displayTasks(tasksList);
    })

    editButton.addEventListener('click', () => {

        if(clearSearchAlert()) return;

        const taskDescription = document.getElementById('task-description');
        const taskDate = document.getElementById('task-date');
        const taskTime = document.getElementById('task-time');

        if(taskDescription.value || taskDate.value || taskTime.value){
            alert(`First clear the inputs`);
            return;
        }

        taskDescription.value = description;
        taskDate.value = date;
        taskTime.value = time;

        tasksList.splice(index, 1);
        saveTasks();
        displayTasks(tasksList);
    })
}
const clearTasks = () => {
    dueDiv.innerHTML = '';
    todayDiv.innerHTML = '';
    upcomingDiv.innerHTML = '';
}

const displayTasks = (tasksList) => {
    const today = new Date();
    today.setHours(0,0,0,0);

    const dueTasks = [], todayTasks = [], upcomingTasks = [];

    let i = 0;
    tasksList.forEach((task) => {
        const taskDay= new Date(`${task.taskDate}T${task.taskTime}`);
        taskDay.setHours(0, 0, 0, 0);

        task.index = i;
        i++;

        if(taskDay.getTime() === today.getTime())  
            todayTasks.push(task);
        else if(taskDay.getTime() > today.getTime())
            upcomingTasks.push(task);
        else dueTasks.push(task);
    })
    clearTasks();

    todayTasks.forEach((task) => {
        createTodo(task.taskDescription, task.taskDate, task.taskTime, todayDiv, task.index)
        
    })

    dueTasks.forEach((task) => {
        createTodo(task.taskDescription, task.taskDate, task.taskTime, dueDiv, task.index)
    })

    upcomingTasks.forEach((task) => {
        createTodo(task.taskDescription, task.taskDate, task.taskTime, upcomingDiv, task.index)
    })

}

const addTaskBtn = document.getElementById('add-task');
addTaskBtn.addEventListener('click', () => {

    if(clearSearchAlert()) return;

    const taskDescription = document.getElementById('task-description');
    const taskDate = document.getElementById('task-date');
    const taskTime = document.getElementById('task-time');

    if(!taskDescription.value || !taskDate.value || !taskTime.value) return;

    const taskObj = {
        taskDescription: taskDescription.value,
        taskDate: taskDate.value,
        taskTime: taskTime.value
    }

    tasksList.push(taskObj);
    saveTasks();

    taskDescription.value = "";
    taskDate.value = "";
    taskTime.value = "";

    displayTasks(tasksList);
})

searchBar.addEventListener('input', (event) => {
    const requiredWord = event.target.value;
    const filteredTasks = tasksList.filter((task) => {
        if(task.taskDescription.toLowerCase().includes(requiredWord.toLowerCase())) return true;
        return false;
    });

    displayTasks(filteredTasks);
})
displayTasks(tasksList);