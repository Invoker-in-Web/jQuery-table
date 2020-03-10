$("document").ready(function() {
	// Инициализация элементов страницы
	let teachers = jsonData["teachers"];
	let container = $(".container:first");
	let table = $("<table>");
	let textQuery = $("#textQuery");
	let warning = $("#warning");
	table.addClass("table table-sm mt-4")
	tableCreate(teachers);
	container.append(table);

	// Заполнение строк таблицы данными из JSON-файла
	function tableCreate(data) {
		for (let i = 0; i < data.length; i++) {
			for (key in data[i]) {
				let tr = $("<tr>");
				let td1 = $("<td>" + key + "</td>");
				let td2 = $("<td>" + teachers[i][key] + "</td>");
				if (key == "id") tr.addClass("bg-success");
				tr.append(td1).append(td2);
				table.append(tr);
			}
		}
	}

	// Поиск данных по запросу
	function searchData() {
		if (!warning.hasClass("d-none")) warning.addClass("d-none");
		if (textQuery.val() == "") return;
		let result = {};
		let reg = $("#format").hasClass("data-checked") ? 
			new RegExp(textQuery.val()) : new RegExp(textQuery.val(), "i");

		// Перебор по всем значениям и составление массива результатов
		for (let i = 0; i < teachers.length; i++) {
			for (key in teachers[i]) {
				if (teachers[i][key].match(reg)) {
					if (!result.hasOwnProperty(i)) result[i] = [];
					result[i].push(key);
				}
			}
		}

		// Если значения найдены, таблица обновляется
		if (Object.keys(result).length > 0) {
			tableUpdate(teachers, result);
		} else if (warning.hasClass("d-none")) {
			warning.removeClass("d-none");
		}
	}

	// Обновление таблицы по результатам поиска
	function tableUpdate(data, checkpoints) {
		table.empty();

		for (key1 in checkpoints) {
			for (key2 in data[key1]) {

				// Выделение id зеленым цветом
				if (key2 == "id") {
					let tr = $("<tr>");					
					let td1 = $("<td>");
					let td2 = $("<td>");
					td1.text(key2);
					td2.text(data[key1][key2]);
					tr.append(td1).append(td2).addClass("bg-success");
					table.append(tr);
					continue;
				}
			
				// Вставка найденных строк
				for (let i = 0; i < checkpoints[key1].length; i++) {
					if (key2 == checkpoints[key1][i]) {
						let tr = $("<tr>");					
						let td1 = $("<td>");
						let td2 = $("<td>");
						if (key2 == "id") {
							tr.addClass("bg-success");
						}
						td1.text(key2);
						td2.text(data[key1][key2]);
						tr.append(td1).append(td2);
						table.append(tr);
					} 
				}
			}
		}
	}

	// Действие при нажатии на кнопку поиска
	$("#search").click(searchData);

	// Действие при нажатии на кнопку учета регистра
	$("#format").click(function() {
		$(this).toggleClass("data-checked");
		if ($(this).hasClass("data-checked")) {
			$(this).children().attr("class", "material-icons text-warning");
		} else {
			$(this).children().attr("class", "material-icons text-white");
		}
	})

	// Действие при нажатии на кнопку обновления
	document.getElementById("refresh").addEventListener("click", function() {
		if (!warning.hasClass("d-none")) {
			warning.addClass("d-none");
		}

		table.empty();
		textQuery.val("");
		tableCreate(teachers);
	});
});