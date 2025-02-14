import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js"

const firebaseConfig = {
    apiKey: "",
    authDomain: "todolist-921ab.firebaseapp.com",
    databaseURL: "https://todolist-921ab-default-rtdb.firebaseio.com",
    projectId: "todolist-921ab",
    storageBucket: "todolist-921ab.appspot.com",
    messagingSenderId: "48725145641",
    appId: "1:48725145641:web:efd9f9ee4a0eb5481f8438",
    measurementId: "G-5H187RMBN9"
};

const appSettings = {
    databaseURL: "https://todolist-921ab-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const todoListInDB = ref(database, "todoList")

const inputField = document.getElementById("input-field")
const addButton = document.getElementById("add-button")
const todoList = document.getElementById("todo-list")

addButton.addEventListener("click", function(){
    let inputValue = inputField.value

    push(todoListInDB, inputValue)
    clearInputField()
})

onValue(todoListInDB, function(snapshot){
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())

        clearToDoList()
    
        for (let i = 0; i < itemsArray.length; i++){
            let currentItem = itemsArray[i]

            appendItemToToDoList(currentItem)
        }
    }
    else{
        todoList.innerHTML = "No Items Here Yet..."
    }
})

function clearToDoList(){
    todoList.innerHTML = ""
}

function clearInputField(){
    inputField.value = null
}

function appendItemToToDoList(item){
    let itemID = item[0]
    let itemValue = item[1]

    let newElement = document.createElement("li")

    newElement.addEventListener("click", function(){
        let exactLocationOfItemInDB = ref(database, `todoList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    newElement.textContent = itemValue
    todoList.append(newElement)
}
