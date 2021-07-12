let task = {}
var myTaskList = []
var total = 0;
var lastUpdatedTime;

window.onload = function() {
    if (!getFromAdmin())
        return;

    myTaskList = JSON.parse(getFromAdmin())
    for (let index = 0; index < myTaskList.length; index++) {
        if (!myTaskList[index].isDeleted) {
            total++;
            document.getElementById('lastUpdatedTime').innerHTML = "Last Updated Time : " + getLastUpdatedTime();
            renderElements(myTaskList[index]);
            return;
        }
        renderElements(myTaskList[index])
    }
};

let input = document.querySelector('input');
input.addEventListener('keyup', function(e) {
    if (e.key == 'Enter') {
        let info = input.value.trim();
        if (info)
            addToList(info);
        input.value = "";
        input.focus();
    }

})

function storeToAdmin() {
    localStorage.setItem("myTaskList", JSON.stringify(myTaskList));

}

function storeLastUpdatedTime() {
    localStorage.setItem("lastUpdatedTime", moment().format('MMMM Do YYYY, h:mm:ss a'))
}

function getFromAdmin() {
    return localStorage.getItem("myTaskList");
}

function getLastUpdatedTime() {
    return localStorage.getItem("lastUpdatedTime");
}

function renderElements(task) {
    var ul = document.getElementById('taskList');

    var li = document.createElement('li');
    li.appendChild(document.createTextNode(task.info));
    ul.prepend(li);

    if (task.isDeleted)
        li.style.textDecoration = "line-through";

    var btnDelete = document.createElement("button");
    btnDelete.textContent = "X";
    btnDelete.addEventListener("click", function() {
        var id = task.id;
        //ul.removeChild(li);
        task.isDeleted = true;
        //btnDelete.remove();
        li.style.textDecoration = "line-through";
        console.log(myTaskList)
        total--;
        storeToAdmin(task);
        storeLastUpdatedTime();
        document.getElementById('lastUpdatedTime').innerHTML = "Last Updated Time : " + getLastUpdatedTime();
        document.getElementById('total').innerHTML = "Total : " + total;
    });
    li.append(btnDelete);
    storeToAdmin();
    document.getElementById('lastUpdatedTime').innerHTML = "Last Updated Time : " + getLastUpdatedTime();
    document.getElementById('total').innerHTML = "Total : " + total;
}

function addToList(info) {
    task = {
        id: Date.now(),
        createdTime: moment().format('MMMM Do YYYY, h:mm:ss a'),
        info: info + " => " + moment().format('MMMM Do YYYY, h:mm:ss a') + "  ",
        isDeleted: false,
    };
    total++;

    myTaskList.push(task);
    renderElements(task);
    storeToAdmin(myTaskList);
    storeLastUpdatedTime();
    document.getElementById('lastUpdatedTime').innerHTML = "Last Updated Time : " + getLastUpdatedTime();
    document.getElementById('total').innerHTML = "Total : " + total;
    console.log(myTaskList);
}


document.getElementById('deleteAll').addEventListener("click", function() {
    console.log("Delete All");
    if (!getFromAdmin())
        return;

    myTaskList = JSON.parse(getFromAdmin())
    for (let index = 0; index < myTaskList.length; index++) {
        if (!myTaskList[index].isDeleted) {
            myTaskList[index].isDeleted = true;
            storeToAdmin();
            storeLastUpdatedTime();
            // document.getElementById('lastUpdatedTime').innerHTML = "Last Updated Time : "+getLastUpdatedTime();
        }
    }
    window.location.reload()

})