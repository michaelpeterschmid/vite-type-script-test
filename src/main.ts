import { v4 as uuidV4 } from "uuid" // ES module import


//defining Task type
type Task = {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

//Select HTML as specific as possible for intellisense
//can use query selector or getElementById
const list = document.querySelector("#list") as HTMLUListElement
const form = document.getElementById("new-task-form") as HTMLFormElement | null
const input = document.querySelector("#new-task-title") as HTMLInputElement


//load exisiting tasks from local storage
const tasks: Task[] = loadTasks()
//add each Task as ListItem
tasks.forEach(addListItem)


form?.addEventListener("submit", e => {
  e.preventDefault() //prevent reloading of page on submit

  //only add task if user actually provided something in the input field
  if (input?.value == "" || input?.value == null) return

  const newTask: Task = {
    id: uuidV4(),
    title: input.value, //value from the input
    completed: false,
    createdAt: new Date(),
  }
  //push to task List and save it also to local storage
  tasks.push(newTask) 
  saveTasks()

  //call function to create HTML Elements for the task!
  addListItem(newTask)
  input.value = ""
})

function addListItem(task: Task) {
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input") 
  checkbox.addEventListener("change", () => { 
    // The event listener is attached when addListItem() runs.
    // From then on, it keeps listening to "change" events on this checkbox.

    task.completed = checkbox.checked
    saveTasks()
  })
  checkbox.type = "checkbox"
  checkbox.checked = task.completed //false per default
  label.append(checkbox, task.title) //add checkbox element and title inside label
  item.append(label)
  list?.append(item)
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS")
  if (taskJSON == null) return []
  return JSON.parse(taskJSON) //retrurns List of type Task
}


/*
✅ Correct version:

JSON.stringify() converts a JavaScript object (not “JSON object”) into a JSON string.

JSON.parse() converts a JSON string back into a JavaScript object.

Important: Functions (methods) and other non-JSON data types (like undefined, Symbol, or class instances) are not preserved when you stringify. They are either dropped or converted to something else.

const obj = {
  name: "Alice",
  greet() {
    console.log("Hello!");
  }
};

const str = JSON.stringify(obj);
console.log(str); 
// {"name":"Alice"}   ← method is gone

const parsed = JSON.parse(str);
console.log(parsed); 
// { name: "Alice" }  ← plain object, no method










const list = document.querySelector("#list")!;


By writing !, I am telling TypeScript:
  “I’m sure this value is not null or undefined, trust me.”

*/