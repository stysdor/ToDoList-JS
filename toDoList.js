/*to do:
-validation
-max number of tasks
*/

(function() {
    
    //Getting elements 
    var el = function (element) {
        if (element.charAt(0) === "#") { 
            return document.querySelector(element); 
        } else { 
            return document.querySelectorAll(element); 
        }      
    };


    //Variables
    var currentTask = el("#input"), //current input
        tasks = el(".task"), //list of tasks
        form = el("#form"),
        removeBut = el("#removeAll"), //removeAll button
        divList = el("#list"); //place, where list of task will be appear
    
    currentTask.focus();
    /**********************************/
    /**** Functions serving events ****/
    
    //function downloads list of tasks from localStorage and shows them
    function screenListOfTasks () {
        if (localStorage.length > 0) {
            for (var key in localStorage) {
               if(key != "number") {
                   screenTask(key);
               }
            }
        }
    }
    
    //function adding new task
    function addTask () {
       if (currentTask.value != "") {
           var nr;
           if(localStorage.getItem("number") != null) {
               nr = Number(localStorage.number) + 1;
           } else {
               nr = 1;
           }
           localStorage.setItem( nr, currentTask.value);
            localStorage.setItem("number", nr);
       }   
    }
   
    //function removing the task
    function removeTask (nr) {
        var isOk = confirm("Do  you really want to remove: " + localStorage.getItem(nr) + "?");
        if(isOk) {
            localStorage.removeItem(nr);
            if(localStorage.length < 2){
                localStorage.setItem("number", 0);
            }
            location.reload();
        }
    }
    
    //function removing all the tasks
    function removeAll () {
        if(localStorage.length > 0) {
            var isOk = confirm("Do you really want to remove all tasks?");
            if(isOk) {
                for(var key in localStorage) {
                    localStorage.removeItem(key);
                }
                location.reload();
            }
        }  
    }
    
    //function creating div with single task and show it on the screan
    function screenTask (key) {
        if (localStorage.getItem(key) != null) {
            var item = document.createElement("div");
            item.classList.add("task");
            item.innerText = localStorage.getItem(key);

           var button = document.createElement("button");
            button.classList.add("remove-button");
            button.innerText = "Remove";
            

            item.appendChild(button);

            divList.appendChild(item);
            button.addEventListener("click", function(){removeTask(key);}, false);
        } 
    }
    
    /**********************************/
    /**** Adding eventListeners ****/
    form.addEventListener("submit", addTask, false);
    //form.onsubmit = addTask();
    removeBut.addEventListener("click", removeAll, false);
    
    
    window.addEventListener("load", screenListOfTasks);
    
}());

