const todoItem:HTMLInputElement = document.querySelector("#todo-item")
const todoSave:HTMLInputElement = document.querySelector("#todo-save")
const todoDelall:HTMLInputElement = document.querySelector("#todo-delall")
const todoDelcom:HTMLInputElement = document.querySelector("#todo-delcom")
const form:HTMLFormElement = document.querySelector("#todo-add")
const todoList:HTMLDivElement = document.querySelector("#todo-list")
//let arrTodo:Array<TASK>= Object.assign([],JSON.parse(localStorage.getItem("tasks")))
let arrTodo:Array<TASK>=[...JSON.parse(localStorage.getItem("tasks"))]
let modal:HTMLElement= document.querySelector(".modal")
let cancelBtn:HTMLButtonElement = document.querySelector(".cancel")
let deleteAllTasks:HTMLButtonElement = document.querySelector(".deleteAllTasks")

class TASK {
    public todo
    public isDone
    constructor(todo:string,isDone:boolean=false) {
        this.todo=todo
        this.isDone=isDone
    }
}

form.onsubmit=(event):void=>{
    event.preventDefault()
}

todoSave.onclick=():void=>{
    createTask()
    seeTasks()
}

todoDelcom.onclick=():void=>{
    removeClassDone()
}

todoDelall.onclick=():void=>{
    modal.style.display="block";
}

cancelBtn.onclick=():void=>{
    modal.style.display="none";
}

deleteAllTasks.onclick=():void=>{
     removeAll()
    modal.style.display="none";
}

let createTask=()=>{
    let re = /^[A-Za-z0-9_]+/
    if(!re.test(todoItem.value))
    return
    let task= new TASK(todoItem.value,false)
    arrTodo.push(task)
    localStorage.setItem("tasks",JSON.stringify(arrTodo));
    // todoItem.value=""
}

let seeTasks=()=>{
    todoList.innerHTML=""
     for(let i=0; i<arrTodo.length; i++){
         if(arrTodo[i].isDone===true){
            todoList.innerHTML+=
            `<div class="todo-row todo-item done">
                <span class="todo-item done">${arrTodo[i].todo}</span>
            <button onclick="addClass(${i})" class="todo-ok">V</button>
            </div>`
         }
         else{
            todoList.innerHTML+=
            `<div class="todo-row todo-item">
                <span class="todo todo-item">${arrTodo[i].todo}</span>
            <button onclick="addClass(${i})" class="todo-ok">V</button>
            </div>`
         }
     }
 }


 let addClass=(index)=>{
    arrTodo[index].isDone=!arrTodo[index].isDone;
    localStorage.setItem("tasks",JSON.stringify(arrTodo));
    seeTasks()
 }

let removeClassDone=()=>{
    for(let i=0; i<arrTodo.length; i++){
        if(arrTodo[i].isDone===true){
        arrTodo.splice(i,1)
        i=i-1
        }
    }
    localStorage.setItem("tasks",JSON.stringify(arrTodo));
    seeTasks()
    }

    
let removeAll=()=>{
    arrTodo=[];
    localStorage.setItem("tasks",JSON.stringify(arrTodo));
    seeTasks()
    }
 
seeTasks()