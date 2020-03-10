// Инициализация таблицы
let teachers = jsonData["teachers"];
let container = document.getElementsByClassName("container")[0];
let table = document.createElement("table");
let textQuery = document.getElementById("textQuery");
let warning = document.getElementById("warning");
table.className = "table table-sm mt-4";
tableCreate(teachers);
container.append(table);

// Заполнение строк таблицы данными из JSON-файла
function tableCreate(data) {
	for (let i = 0; i < data.length; i++) {
		for (key in data[i]) {
			let tr = document.createElement('tr');
			table.append(tr);

			if (key == "id") {
				tr.className = "bg-success";
			}

			let td1 = document.createElement('td');
			let td2 = document.createElement('td');
			td1.innerText = key;
			td2.innerText = teachers[i][key];
			tr.append(td1);
			tr.append(td2);
		}
	}
}

// Обновление таблицы по результатам поиска
function tableUpdate(data, checkpoints) {
	table.innerHTML = "";

	for (key1 in checkpoints) {
		for (key2 in data[key1]) {

			// Выделение id зеленым цветом
			if (key2 == "id") {
				let tr = document.createElement('tr');					
				let td1 = document.createElement('td');
				let td2 = document.createElement('td');
				td1.innerText = key2;
				td2.innerText = data[key1][key2];
				tr.append(td1);
				tr.append(td2);
				tr.className = "bg-success";
				table.append(tr);
				continue;
			}
			
			// Вставка найденных строк
			for (let i = 0; i < checkpoints[key1].length; i++) {
				if (key2 == checkpoints[key1][i]) {
					let tr = document.createElement('tr');					
					let td1 = document.createElement('td');
					let td2 = document.createElement('td');

					if (key2 == "id") {
						tr.className = "bg-success";
					}

					td1.innerText = key2;
					td2.innerText = data[key1][key2];
					tr.append(td1);
					tr.append(td2);
					table.append(tr);
				} 
			}
		}
	}
}

// Поиск данных по запросу
function searchData() {
	if (!warning.classList.contains("d-none")) {
		warning.classList.add("d-none");
	}
	if (textQuery.value == "") return;
	let result = {};
	let reg = document.getElementById("format").classList.contains("data-checked") ? 
		new RegExp(textQuery.value) : new RegExp(textQuery.value, "i");

	// Перебор по всем значениям и составление массива результатов
	for (let i = 0; i < teachers.length; i++) {
		for (key in teachers[i]) {
			if (teachers[i][key].match(reg)) {
				if (!result.hasOwnProperty(i)) {
					result[i] = [];
				}
				result[i].push(key);
			}
		}
	}

	// Если значения найдены, таблица обновляется
	if (Object.keys(result).length > 0) {
		tableUpdate(teachers, result);
	} else if (warning.classList.contains("d-none")) {
		warning.classList.remove("d-none");
	}
}

// Действие при нажатии на кнопку поиска
document.getElementById("search").addEventListener("click", searchData);

// Действие при нажатии на кнопку обновления
document.getElementById("refresh").addEventListener("click", function() {
	if (!warning.classList.contains("d-none")) {
		warning.classList.add("d-none");
	}

	table.innerHTML = "";
	textQuery.value = "";
	tableCreate(teachers);
});

// Действие при нажатии на кнопку учета регистра
document.getElementById("format").addEventListener("click", function() {
	if (!this.classList.contains("data-checked")) {
		this.classList.add("data-checked");
		this.children[0].className = "material-icons text-warning";
	} else {
		this.classList.remove("data-checked");
		this.children[0].className = "material-icons text-white";
	}
})