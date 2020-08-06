var db = firebase.database();





window.onload = function () {
    var list = document.getElementById("list")
    var item = document.getElementById("todolist")

    var todosRef = db.ref('todos');
    todosRef.on('child_added', (data) => {
        console.log(data.val().title)

        var li = document.createElement("li")
        var liText = document.createTextNode(data.val().title)
        li.append(liText)

        var dltbtn = document.createElement("i")
        dltbtn.setAttribute("class", "fas fa-trash-alt")
        dltbtn.setAttribute("onclick", `dlt(this,'${data.val().id}')`)

        var editbtn = document.createElement("i")
        editbtn.setAttribute("class", "far fa-edit")
        editbtn.setAttribute("onclick", `edit(this,'${data.val().id}')`)


        li.appendChild(dltbtn)
        li.appendChild(editbtn)
        list.appendChild(li)

    })










}


function todo() {

    var item = document.getElementById("todolist")

    var newtodoRef = db.ref('todos')
    var key = newtodoRef.push().key
    console.log(newtodoRef)

    var newTodo = {
        title: item.value,
        id: key
        // date: new Date().getDate()
    }
    console.log(newTodo)

    newtodoRef.child(key).set(newTodo)

    item.value = ""


}

function dlt(e, key) {
    var newtodoRef = db.ref('todos')
    newtodoRef.child(key).remove()
    e.parentNode.remove()
    console.log(e)
    console.log(key)
}
function edit(e, key) {
    var newtodoRef = db.ref('todos')
    var upd = prompt("Change what you want")
    if (upd === null) {
    } else {

        e.parentNode.firstChild.nodeValue = upd
        newtodoRef.child(f).set({ title: upd, id: f })  
    }

}
function clearAll() {
    list.innerHTML = ""
    db.ref('todos').set({})

}
