let name = JSON.parse(localStorage.getItem("name"));
    if (!name) {
      document.querySelector('.para-name').style.display = 'flex';
      document.querySelector('.main').style.display = 'none';
      document.querySelector('.elements-main').style.display = 'none';
      document.querySelector('.heading-info').style.display = 'none';
      document.querySelector('.ask-name').style.display = 'flex';
      document.querySelector('.ok-click').addEventListener('click', () => {
        const username = document.querySelector('.input-name').value;
        localStorage.setItem('name', JSON.stringify(username));
        name = username;
        totalWorkOnClick();
      });
    } else {
      totalWorkOnClick();
    }
    function totalWorkOnClick() {
      document.querySelector('.para-name').style.display = 'none';
      document.querySelector('.main').style.display = 'flex';
      document.querySelector('.elements-main').style.display = 'flex';
      document.querySelector('.heading-info').style.display = 'flex';
      document.querySelector('.ask-name').style.display = 'none';
      document.querySelector('.heading-info').innerText = name.length !== 0 ? `Todo List - ${name}` : 'Todo List - No Entered.';


      const clickedAddEle = document.querySelector('.add-task');
      let mainTaskspendingEle = document.querySelector('.main-tasks-pending');
      let mainTasksdoneEle = document.querySelector('.main-tasks-done');
      let todoListAll = JSON.parse(localStorage.getItem('todoListAll'));
      let todoListdone = JSON.parse(localStorage.getItem('todoListdone'));
      const addThem1 = `<button class="complete-task">Completed</button>
                      <button class="delete-task">Delete</button>`;
      const addThem2 = `<button class="not-comp">Add to Pending</button>`
      let pendingTasks = true;
      let doneTasks = false;
      if (todoListAll && pendingTasks) {
        todoListAll.forEach((ele) => {
          mainTaskspendingEle.innerHTML += displayTodo(ele, addThem1);
        });
      } else if (pendingTasks) {
        todoListAll = [];
      }
      if (todoListdone && doneTasks) {
        todoListAll.forEach((ele) => {
          mainTasksdoneEle.innerHTML += displayTodo(ele, addThem2);
        });
      } else if (!todoListdone) {
        todoListdone = [];
      }

      if (todoListAll.length === 0) {
        document.querySelector('.main-not-added').style.display = 'flex';
      }

      if (todoListdone.length === 0) {
        document.querySelector('.main-not-added').style.display = 'flex';
      }

      document.querySelector('.done').addEventListener('click', () => {
        document.querySelector('.done').classList.add('colors');
        document.querySelector('.pending').classList.remove('colors');
        mainTaskspendingEle.style.display = 'none';
        document.querySelector('.main-not-added').style.display = 'flex';
        mainTasksdoneEle.style.display = 'grid';
        document.querySelector('.main-content').style.display = 'none';
        if (todoListdone.length !== 0) document.querySelector('.main-not-added').style.display = 'none';
        mainTasksdoneEle.innerHTML = '';
        todoListdone.forEach((ele) => {
          mainTasksdoneEle.innerHTML += displayTodo(ele, addThem2);
        });
        pendingTasks = false;
        doneTasks = true;
      });

      document.querySelector('.pending').addEventListener('click', () => {
        document.querySelector('.pending').classList.add('colors');
        document.querySelector('.done').classList.remove('colors');
        mainTaskspendingEle.style.display = 'grid';
        mainTasksdoneEle.style.display = 'none';
        document.querySelector('.main-not-added').style.display = 'flex';
        if (todoListAll.length !== 0) document.querySelector('.main-not-added').style.display = 'none';
        mainTaskspendingEle.innerHTML = '';
        todoListAll.forEach((ele) => {
          mainTaskspendingEle.innerHTML += displayTodo(ele, addThem1);
        });
        document.querySelector('.main-content').style.display = 'grid';
        pendingTasks = true;
        doneTasks = false;
      });

      document.querySelector('.main-tasks-pending').addEventListener('click', (e) => {
        if (e.target.classList[0] === 'delete-task')
          deleteTask(e, false);
        else
          deleteTask(e, true);
      });

      document.querySelector('.main-tasks-done').addEventListener('click', (e) => {
        deleteTask1(e);
      });




      clickedAddEle.addEventListener('click', () => {
        if (todoListAll.length === 0) document.querySelector('.main-not-added').style.display = 'none';
        const text = document.querySelector('.text-input').value;
        const date = document.querySelector('.date-input').value;
        const time = document.querySelector('.time-input').value;
        createTasks(text, date === '' ? "No Date" : date, time === '' ? "No Time" : time);

      });

      function createTasks(text, date, time) {
        const obj = { 'text': text, 'date': date, 'time': time };
        todoListAll.push(obj);
        localStorage.setItem('todoListAll', JSON.stringify(todoListAll));
        localStorage.setItem('todoListdone', JSON.stringify(todoListdone));
        mainTaskspendingEle.innerHTML += displayTodo(obj, addThem1);
      }

      function deleteTask(event, flag) {
        const inputArray = Array.from(event.target.parentNode.children);
        todoListAll.forEach((ele, idx) => {
          if (ele.text === inputArray[0].innerText && ele.date === inputArray[1].innerText && ele.time === inputArray[2].innerText) {
            if (flag) todoListdone.push(ele);
            todoListAll.splice(idx, 1);
          }
          localStorage.setItem('todoListAll', JSON.stringify(todoListAll));
          localStorage.setItem('todoListdone', JSON.stringify(todoListdone));
          mainTaskspendingEle.innerHTML = '';
          todoListAll.forEach((ele) => {
            mainTaskspendingEle.innerHTML += displayTodo(ele, addThem1);
          });
          if (todoListAll.length === 0) {
            document.querySelector('.main-not-added').style.display = 'flex';
          }

        });
      }

      function deleteTask1(event) {
        const inputArray = Array.from(event.target.parentNode.children);
        todoListdone.forEach((ele, idx) => {
          if (ele.text === inputArray[0].innerText && ele.date === inputArray[1].innerText && ele.time === inputArray[2].innerText) {
            todoListAll.push(ele);
            todoListdone.splice(idx, 1);
          }
          localStorage.setItem('todoListAll', JSON.stringify(todoListAll));
          localStorage.setItem('todoListdone', JSON.stringify(todoListdone));
          mainTasksdoneEle.innerHTML = '';
          todoListdone.forEach((ele) => {
            mainTasksdoneEle.innerHTML += displayTodo(ele, addThem2);
          });
          if (todoListdone.length === 0) {
            document.querySelector('.main-not-added').style.display = 'flex';
          }
        });
      }

      function displayTodo(ele, value) {
        return `<div class="ids">
                <div class="text-value">${ele.text}</div>
                <div class="date-value">${ele.date}</div>
                <div class="time-value">${ele.time}</div>
                ${value}
                </div> 
              `;
      }
    }