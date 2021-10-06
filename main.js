const do_toList = document.querySelector("#to-doList");
const newTaskInput = document.querySelector("#newTask");
const numberTasksDiv = document.querySelector("#numberTasks");
const addTaskButton = document.querySelector("#addTask");
const tasks = {};
let numberTasks = 0, n = 0;

addTaskButton.addEventListener("click", () => {
	if(!tasks.hasOwnProperty(newTaskInput.value)) {
		if(newTaskInput.value.length > 0) {
			addTask(newTaskInput.value, false);
		} else {
			alert("Para adicionar uma tarefa adicione um nome a ela.");
		}
	} else {
		const a = document.querySelectorAll("a");
		let task;
		
		alert("Esta tarefa já foi adicionada na lista!");
		
		// Busca a tarefa já existente
		
		for(let i = 0; i < a.length; i++) {
			if(a[i].text == newTaskInput.value) task = a[i];
		}
		
		// Destaca tarefa já existente
		
		task.parentElement.children[1].focus();
		task.parentElement.style.background = "#0fc5f2aa";
		setTimeout(() => {
			task.parentElement.style.background = "#ddd";
		}, 500);
		
		newTaskInput.value = "";
	}
});

function addTask(task, check) {
	n++;
	tasks[task] = false;
	numberTasks = Object.keys(tasks).length;
	numberTasksDiv.innerText = numberTasks;
	
	let state = "";
	if(check) {
		state = "checked";
	}
	
	do_toList.innerHTML += `
		<label for="task_0${n}">
			<li class="tasks">
				<a>${task}</a>
				<input type="checkbox" id="task_0${n}" onchange="checkTask(this)" class="default_checkbox" ${state}/>
				<span class="taskCheckbox">✓</span>
				<button class="removeTask" onclick="removeTask(this.parentElement.parentElement)" >×</button>
			</li>
		</label>
	`
	
	// Prepare input for the next task
	
	newTaskInput.value = "";
	newTaskInput.placeholder = `Adicione a ${numberTasks + 1}° Tarefa.`;
	newTaskInput.focus();
	save();
}

function save() {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function restorePage() {
	const tasks = JSON.parse(localStorage.getItem('tasks'));
	for(let i = 0; i < Object.keys(tasks).length; i++) {
		addTask(Object.getOwnPropertyNames(tasks)[i], tasks[Object.getOwnPropertyNames(tasks)[i]]);
	}
}

function checkTask(task) {
	if(task.checked) {
		tasks[task.parentElement.firstElementChild.text] = true;
	} else {
		tasks[task.parentElement.firstElementChild.text] = false;
	}
	save();
}

function removeTask(task) {
	delete tasks[task.firstElementChild.firstElementChild.text];
	task.remove();
	numberTasks = Object.keys(tasks).length
	numberTasksDiv.innerText = numberTasks;
	newTaskInput.placeholder = `Adicione a ${numberTasks + 1}° Tarefa.`;
	save();
}

restorePage();