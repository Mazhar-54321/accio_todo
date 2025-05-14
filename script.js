let todaysTodoList=[],futureTodoList=[],completedTodoList=[];
function addItem(){
    var itemName = document.querySelector(".item-name-input").value;
    var date = document.querySelector(".deadline-input").value;
    var priority = document.querySelector(".priority").value;
    console.log(itemName,date,priority)
    if(!itemName || !date || !priority){
        alert("All fields are mandatory");
        return;
    }
    let obj={
        name:itemName,
        date:date,
        priority:priority,
        isCompleted:false,
        _id:Date.now()
    }
    if(JSON.stringify(new Date().toISOString().split('T')[0])===
     JSON.stringify(date)){
        todaysTodoList.push(obj);
        window.localStorage.setItem("todays-todolist",JSON.stringify(todaysTodoList))
        todoHandler(todaysTodoList)
     }else{
        futureTodoList.push(obj);
        window.localStorage.setItem("future-todolist",JSON.stringify(futureTodoList))
        todoHandler(futureTodoList,false)
     }
}
function todoHandler(data,todayOrFuture=true,isCompleted=false){
    let item = data[data.length-1]
    var todaysSection = document.querySelector(todayOrFuture?".todays-section":".future-section")
    if(isCompleted){
        todaysSection = document.querySelector(".completed-section")
    }
    const row =document.createElement("div");
    row.className="row"
    const itemName =document.createElement("div");
    itemName.className="item-name"
    itemName.innerText=`${data.length}.${item.name}`
    const itemDate =document.createElement("div");
    itemDate.innerText=item.date
    itemDate.className="item-date"
    const itemPriority =document.createElement("div");
    itemPriority.className="item-priority"
    itemPriority.innerText=`Priority:${item.priority}`
    const activity =document.createElement("div");
    //activity.innerText=item.priority
    activity.className="activity"
    const img1 =document.createElement("img");
    img1.src="./check-circle 1.png"
    img1.className=`${item._id}`
    const img2 =document.createElement("img");
    img2.src="./trash 1.png"
    img2.className=`${item._id}`
    if(!isCompleted){
    activity.appendChild(img1)
    activity.appendChild(img2);
    }else{
        activity.appendChild(img2);
        img2.src="./2.png"
    }
    img1.addEventListener("click",function(){
        
        if(!todayOrFuture){
            futureTodoList=futureTodoList.filter((el)=>el._id!==item._id)
            window.localStorage.setItem("future-todolist",JSON.stringify(futureTodoList))
        }else{
            todaysTodoList=todaysTodoList.filter((el)=>el._id!==item._id)
            window.localStorage.setItem("todays-todolist",JSON.stringify(todaysTodoList))
        }
        // var completedTodoListNode =document.querySelector(".completed-section")
        completedTodoList.push(item);
        window.localStorage.setItem("completed-todolist",JSON.stringify(completedTodoList));
        todaysSection.removeChild(document.getElementsByClassName(`incomplete-todos ${item._id}`)[0])
        todoHandler(completedTodoList,false,true);
    })
    img2.addEventListener("click",function(){
        todaysSection.removeChild(document.getElementsByClassName(`incomplete-todos ${item._id}`)[0])
        
        if(!todayOrFuture){
            futureTodoList=futureTodoList.filter((el)=>el._id!==item._id)
            window.localStorage.setItem("future-todolist",JSON.stringify(futureTodoList))
        }else{
            todaysTodoList=todaysTodoList.filter((el)=>el._id!==item._id)
            window.localStorage.setItem("todays-todolist",JSON.stringify(todaysTodoList))
        }
        completedTodoList=completedTodoList.filter((el)=>el._id!==item._id)
        window.localStorage.setItem("completed-todolist",JSON.stringify(completedTodoList))
    })
    row.appendChild(itemName)
    row.appendChild(itemDate)
    row.appendChild(itemPriority)
    row.appendChild(activity);
    if(isCompleted){
        row.style.backgroundColor="white";
        row.style.color="black";
        row.style.border="1px solid black";
        row.style.borderRadius="2px";
    }
    var incompletedTodos=document.createElement("div");
    incompletedTodos.className=`incomplete-todos ${item._id}`
    incompletedTodos.appendChild(row);
    todaysSection.appendChild(incompletedTodos);
}
document.addEventListener("DOMContentLoaded",function(){
    const todaysTodoListLocal = window.localStorage.getItem("todays-todolist")
    const futureTodoListLocal = window.localStorage.getItem("future-todolist")
    const completedTodoListLocal = window.localStorage.getItem("completed-todolist");
    if(todaysTodoListLocal){
        JSON.parse(todaysTodoListLocal).forEach((el)=>{
            todaysTodoList.push(el);
            todoHandler(todaysTodoList);
        })
    }
    if(futureTodoListLocal){
        JSON.parse(futureTodoListLocal).forEach((el)=>{
            futureTodoList.push(el);
            todoHandler(futureTodoList,false);
        })

    }
    if(completedTodoListLocal){
        JSON.parse(completedTodoListLocal).forEach((el)=>{
            completedTodoList.push(el);
            todoHandler(completedTodoList,false,true);
        })

    }
})