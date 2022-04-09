const tasks = [
	{
		_id: '01',
		completed: true,
		body:
			'Occaecat non ea quis occaecat ad culpa.',
		title:
			'Eu ea incididunt sunt consectetur fugiat non.',
	},
	{
		_id: '02',
		completed: false,
		body:
			'Aliquip cupidatat ex adipisicing veniam do tempor. ',
		title:
			'Deserunt laborum id consectetur pariatur veniam ',
	},
	{
		_id: '03',
		completed: true,
		body:
			'Occaecat non ea quis occaecat ad culpa amet \r\n',
		title: 'Eu ea incididunt sunt consectetur fugiat non.',
	},
	{
		_id: '04',
		completed: false,
		body:
			'ТИМА ',
		title:
			'Deserunt laborum id consectetur pariatur ',
	},
];

(function (arrOfTasks) {
	const objOfTasks = arrOfTasks.reduce((acc, task) => {
		acc[task._id] = task;
		return acc;

	}, {});
	// console.log(tasks);
	// console.log(objOfTasks);

	//3-я часть 
	const themes = {
		default: {
			'--base-text-color' : '#212529',
			'--header-bg' : '#007bff',
			'--header-text-color' : '#fff',
			'--default-btn-bg' : '#007bff',
			'--default-btn-text-color' : '#fff',
			'--default-btn-hover-bg' : '#0069d9',
			'--default-btn-border-color' : '#0069d9',
			'--danger-btn-bg' : '#dc3545',
			'--danger-btn-text-color' :'#fff',
			'--danger-btn-hover-bg' : '#bd2130',
			'--danger-btn-border-color' : '#dc3545',
			'--input-border-color' : '#ced4da',
			'--input-bg-color' : '#fff',
			'--input-text-color' : '#495057',
			'--input-focus-bg-color' : '#fff',
			'--input-focus-text-color' : '#495057',
			'--input-focus-border-color' : '#80bdff',
			'--input-focus-box-shadow' : '0 0 0 0.2rem rgba(0,123,255, 0.25)',
		},
		dark: {
			'--base-text-color': '#212529',
			'--header-bg': '#343a40',
			'--header-text-color': '#fff',
			'--default-btn-bg': '#58616b',
			'--default-btn-text-color': '#fff',
			'--default-btn-hover-bg': '#292d31',
			'--default-btn-border-color': '#343a40',
			'--default-btn-focus-box-shadow' : 
			'0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
			'--danger-btn-bg': '#b52d3a',
			'--danger-btn-text-color': '#fff',
			'--danger-btn-hover-bg': '#88222c',
			'--danger-btn-border-color': '#88222c',
			'--input-border-color': '#ced4da',
			'--input-bg-color': '#fff',
			'--input-text-color': '#495057',
			'--input-focus-bg-color': '#fff',
			'--input-focus-text-color': '#495057',
			'--input-focus-border-color': '#78878a',
			'--input-focus-box-shadow': '0 0 0 0.2rem rgba(141,143,146, 0.25)',
		},
		light: {
			'--base-text-color': '#212529',
			'--header-bg': '#fff',
			'--header-text-color': '#212529',
			'--default-btn-bg': '#fff',
			'--default-btn-text-color': '#212529',
			'--default-btn-hover-bg': '#e8e7e7',
			'--default-btn-border-color': '#343a40',
			'--default-btn-focus-box-shadow':
				'0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
			'--danger-btn-bg': '#f1b5bb',
			'--danger-btn-text-color': '#212529',
			'--danger-btn-hover-bg': '#ef808a',
			'--danger-btn-border-color': '#e2818a',
			'--input-border-color': '#ced4da',
			'--input-bg-color': '#fff',
			'--input-text-color': '#495057',
			'--input-focus-bg-color': '#fff',
			'--input-focus-text-color': '#495057',
			'--input-focus-border-color': '#78878a',
			'--input-focus-box-shadow': '0 0 0 0.2rem rgba(141,143,146, 0.25)',
		},
	}
//изменить в 4 части ха ха ха
	let lastSelectedTheme = localStorage.getItem('app-theme') || 'default';
	setTheme(lastSelectedTheme);
	const listContainer = document.querySelector('.list-group');
	

	renderAllTasks(objOfTasks);

	function renderAllTasks(taskList) {
		if (!taskList) {
			console.error('Передайте список задач');//вызываем ошибку
			return;//возвращаем ретюрн чтобы остановить код
		}
		const fragment = document.createDocumentFragment()
		Object.values(taskList).forEach(task => {
			// console.log(task);     
			const li = listItemTemplate(task);//в переменную li мы закинули функцию
			fragment.appendChild(li);
			listContainer.appendChild(fragment);
		})
	}
	function listItemTemplate({ _id, title, body } = {}) {
		// console.log(_id, title);
		//создаtv элемент li
		const li1 = document.createElement('li');
		li1.classList.add(
			'list-group-item',
			'd-flex',
			'align-items-center',
			'flex-wrap',
			'mt-2'
		);
		li1.setAttribute('data-task-id', _id);


		// console.log(li1);
		const span = document.createElement('span');
		span.textContent = title;
		span.style.fontWeight = "bold";

		//создаем кнопку удаления
		const deleteBtn = document.createElement('button');
		deleteBtn.textContent = "Delete";
		deleteBtn.classList.add(
			'btn', 'btn-danger', 'ml-auto', 'delete-btn',
		)

		const article = document.createElement('p');
		article.textContent = body;
		article.classList.add('mt-2', 'w-100');

		//присваиваем что созданные элементы будут в списке
		li1.appendChild(span);
		li1.appendChild(deleteBtn);
		li1.appendChild(article);
		// console.log(li1);
		return li1;
	}

	//добавляем элементы на страницу
	const form = document.forms['addTask'];
	//она выводит все доступные формы и сохраняет их в виде массиве
	const inputTitle = form.elements['title'];
	const inputBody = form.elements['body'];
	// console.log(inputTitle, inputBody);
	
	//напишем функцию для получения данных их инпутов

	form.addEventListener('submit', onFormSubmit);
	function onFormSubmit(e) {
		e.preventDefault();
		const titleValue = inputTitle.value;
		const bodyValue = body.value;
		// console.log(titleValue, bodyValue);
		//проверим на наличие текста в инпутах
		if (!titleValue || !bodyValue) {
			alert('Пожалуйста введите титл и боди');
			return;
		}
		const task = createNewTask(titleValue, bodyValue);
		// console.log(objOfTasks);
		const listItem = listItemTemplate(task);
		listContainer.insertAdjacentElement('afterbegin', listItem);
	}

	function createNewTask(title, body) {
		const newTask = {
			title,
			body,
			completed: false,
			_id: `ttask-${Math.random()}`
		}
		// console.log(newTask);
		objOfTasks[newTask._id] = newTask;
		return { ...newTask };
	}

	//2-часть
	listContainer.addEventListener('click', onDeleteTask);
	//функция получения данных элемента по клику
	// function onDeleteTask(e){
	//   console.log(e.target);
	// }

	function onDeleteTask({ target }) {
		if (target.classList.contains('delete-btn')) {
			// console.log('Вы нажали на кнопку DELETE');
			const parent = target.closest('[data-task-id]');
			// console.log(parent);
			const id = parent.dataset.taskId;
			// console.log(id);
			const confirmed = deleteTask(id);
			deleteFromHtml(confirmed, parent)
		}
	}
	function deleteFromHtml(confirmed, el1) {
		if (!confirmed) return;
		el1.remove();

	}
	function deleteTask(id) {
		const { title } = objOfTasks[id];
		//при нажатии комп будет спрашивать хоти ли мы удалить эту задачу
		const isConfirm = confirm(`Вы точно хотите удалить задачу: ${title}?`);
		console.log(isConfirm);
		//если пользователь отказал
		if (!isConfirm) return;
		delete objOfTasks[id];//здесь мы удаляем из объектов
		return isConfirm;
	}
	
	//3-я часть
	const themeSelect = document.getElementById('themeSelect');
	themeSelect.addEventListener('change', onThemeSelectChange);
	
	


	function onThemeSelectChange(e) {
		const selectedTheme = themeSelect.value;
		// console.log(selectedTheme);
		const isConfirmed = confirm(`Вы действительно хотите изменить тему: ${selectedTheme}`);
		if(!isConfirmed){
			themeSelect.value = lastSelectedTheme;
			return;
		}
		setTheme(selectedTheme);
		lastSelectedTheme = selectedTheme;

//4-я часть
		localStorage.setItem('app-theme', selectedTheme);
		//проверить в консольке

	}
	function setTheme(name){
		// console.log(name);
		const selectedThemeObj = themes[name];
		Object.entries(selectedThemeObj).forEach(([key, value])=>{
			// console.log(key, value);
		//задаем стилистику
		document.body.style.setProperty(key, value);
		})
	}



	
})(tasks);

















