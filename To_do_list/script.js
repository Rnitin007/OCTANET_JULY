document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const addTaskButton = document.getElementById('add-task-button');
    const newTaskInput = document.getElementById('new-task');
    const taskDatetimeInput = document.getElementById('task-datetime');

    addTaskButton.addEventListener('click', addTask);
    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    function addTask() {
        const taskText = newTaskInput.value.trim();
        const taskDatetime = taskDatetimeInput.value.trim();
        if (taskText === '') return;

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <label>
                <input type="checkbox" class="checkbox">
                <span>${taskText}</span>
                ${taskDatetime ? `<span class="task-datetime"> - ${new Date(taskDatetime).toLocaleString()}</span>` : ''}
            </label>
            <div class="task-actions">
                <button class="edit-btn"><img src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png" alt="Edit"></button>
                <button class="delete-btn"><img src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png" alt="Delete"></button>
            </div>
        `;
        listItem.querySelector('.checkbox').addEventListener('change', () => {
            listItem.classList.toggle('completed');
        });
        listItem.querySelector('.edit-btn').addEventListener('click', () => editTask(listItem));
        listItem.querySelector('.delete-btn').addEventListener('click', () => listItem.remove());

        taskList.appendChild(listItem);
        newTaskInput.value = '';
        taskDatetimeInput.value = '';
    }

    function editTask(listItem) {
        const taskText = listItem.querySelector('span').innerText;
        const newTaskText = prompt('Edit your task', taskText);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            listItem.querySelector('span').innerText = newTaskText.trim();
        }
    }
});
