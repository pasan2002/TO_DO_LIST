import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://todolist-b7ef8-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const toDoListInDB = ref(database, "todolist");

const inputEl = document.getElementById("input-el");
const buttonEl = document.getElementById("b1");
const actualListEl = document.getElementById("actualList");

buttonEl.addEventListener("click", function(){
    let inputvalue = inputEl.value;

    push(toDoListInDB, inputvalue);

    clearinput();
});


onValue(toDoListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val());

        clearList()

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i];
            let currentItemID = currentItem[0];
            let currentItemValue = currentItem[1];

            appendItemsToList(currentItem);
        }
    } else {
        actualListEl.innerHTML = "No work to do yet..........";
    }
});

function clearinput(){
    inputEl.value = "";
}


function clearList(){
    actualListEl.innerHTML = ""
}

function appendItemsToList(item){
    let itemID = item[0];
    let itemValue = item[1];

    let newEl = document.createElement("li");

    newEl.textContent = itemValue;

    newEl.addEventListener("click", function(){
        let exactLocationOfItemInDB = ref(database, `todolist/${itemID}`);
        remove(exactLocationOfItemInDB);
    });

    actualListEl.append(newEl);
}



