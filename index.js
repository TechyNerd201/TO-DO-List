
const todoForm =document.querySelector('#todo-form')
const todoList =document.querySelector('.todos')
const totalTask =document.querySelector('#total-tasks')
const completedTask =document.querySelector('#completed-tasks')
const remainingTask =document.querySelector('#remaining-tasks')
const mainInput =document.querySelector('#todo-form input')
// const crossbutton =document.querySelectorAll('.remove-task');
let tasks = JSON.parse(localStorage.getItem('tasks')) || []

if(localStorage.getItem('tasks')){
    tasks.map((task) => {
        createTask(task);
    })
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = mainInput.value;
    if(inputValue == ''){
        return
    }

    const task = {
        id:new Date().getTime(),
        name:inputValue,
        isComplete:false,
    }
    // console.log(task);
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
    createTask(task);
    todoForm.reset();
    mainInput.focus(); 

});

todoList.addEventListener('click', (e) =>{
    if(e.target.classList.contains('remove-task') || e.target.parentElement.classList.contains('remove-task') || e.target.parentElement.parentElement.classList.contains('remove-task')) {
        const taskId = e.target.closest('li').id;
        removeTask(taskId);
    }
} )

todoList.addEventListener('input', (e) =>{
    const taskId = e.target.closest('li').id;
    updateTask(taskId, e.target);
})
function createTask(task){
    const taskele=document.createElement("li");
    taskele.setAttribute('id',task.id);
    if(task.isComplete){
        taskele.classList.add("complete");
    }
    const  htmlMarkup=`
                    <div>
                        <input type="checkbox" name="tasks" id="${task.id} "${task.isComplete ? 'checked' :''}>
                        <span ${!task.isComplete ?'contenteditable' :''} >${task.name}</span> 
                    </div>
                    <button title="Remove  the "${task.name}" task" class="remove-task">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M17.25 17.25L6.75 6.75" stroke="#A4D0E3" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round"/>
                            <path d="M17.25 6.75L6.75 17.25" stroke="#A4D0E3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                `
    taskele.innerHTML=htmlMarkup;
    todoList.append(taskele); 
    countTasks();      
}

function countTasks() {
    const completedTaskArray = tasks.filter((task) => task.isComplete == true);
    totalTask.textContent = tasks.length;
    completedTask.textContent = completedTaskArray.length;
    remainingTask.textContent = tasks.length - completedTaskArray.length;
}

function removeTask(taskid) {
    tasks = tasks.filter((task) => task.id !=taskid
)

    localStorage.setItem('tasks', JSON.stringify(tasks));

    document.getElementById(taskid).remove();
    countTasks();
}

function updateTask(taskid, el){
    const task = tasks.find((task) => task.id == parseInt(taskid));

    if(el.hasAttribute('contenteditable')){
        task.name = el.textContent ;
    }    
    else{
        const span = el.nextElementSibling;
        const parent=el.closest('li');
        task.isComplete = !task.isComplete;
        if(task.isComplete){
            span.removeAttribute('contenteditable');
            parent.classList.add('complete');
        }
        else{
            span.setAttribute('contenteditable','true');
            parent.classList.remove('complete');
        }
    }
    localStorage.setItem('tasks',JSON.stringify(tasks));
    countTasks();
}
