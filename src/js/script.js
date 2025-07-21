document.addEventListener('DOMContentLoaded', () => {
	const cardsContainer = document.querySelector('.cards-container');
	const createCard = (company, job, department) => {
		const newCard = document.createElement('div');
		newCard.className = 'card__company';
		newCard.innerHTML = `
			<div class="input__image input__image--company-card image__card"></div>
			<div class="data__company">
				<div class="data-name">${company}</div>
				<div class="data-job">${job}</div>
				<div class="data-department">${department}</div>
			</div>
			<div class="btn-block">
				<button class="btn-delete"></button>
			</div>
		`;

		newCard.querySelector('.btn-delete').addEventListener('click', () => {
			newCard.remove();
		});
		cardsContainer.appendChild(newCard);
	}

	document.querySelector('.btn-add').addEventListener('click', () => {
		const companySelects = document.querySelectorAll('.select');
		const company = companySelects[0].options[companySelects[0].selectedIndex].text;
		const job = document.querySelector('.input.job').value;
		const department = companySelects[1].options[companySelects[1].selectedIndex].text;

		createCard(company, job, department);
	});

	const initImageUploader = (id) => {
		const input = document.getElementById('imageInput' + id);
		const previewContainer = document.querySelector('.preview' + id);
		const previewImage = previewContainer.querySelector('img');
		const clearBtn = document.querySelector('.clear-img' + id);
		const uploadButton = document.querySelector('.upload-button' + id);

		input.addEventListener('change', function() {
			const file = this.files[0];
			if (!file) return;
			if (file.type !== 'image/png') {
				alert('Пожалуйста, загрузите файл в формате PNG.');
				input.value = '';
				return;
			}
			if (file.size > 1024 * 1024) {
				alert('Размер файла не должен превышать 1 Мб.');
				input.value = '';
				return;
			}
			const reader = new FileReader();
			reader.onload = function(e) {
				const img = new Image();
				img.src = e.target.result;
				img.onload = function() {
					if (img.width < 600) {
						alert('Ширина изображения должна быть не менее 600px.');
						input.value = '';
						return;
					}
					previewImage.src = e.target.result;
					previewContainer.style.display = 'flex';
					clearBtn.style.display = 'block';
					uploadButton.style.display = 'none';
				};
			};
			reader.readAsDataURL(file);
		});
		clearBtn.addEventListener('click', function() {
			input.value = '';
			previewImage.src = '#';
			previewContainer.style.display = 'none';
			clearBtn.style.display = 'none';
			uploadButton.style.display = 'flex';
		});
	}

	initImageUploader(1);
	initImageUploader(2);
	initImageUploader(3);
		
	const title = document.querySelector('.title');
	const logo = document.querySelector('.logo');
	const aside = document.querySelector('.aside');
	const asidemenuTitle = document.querySelectorAll('.asidemenu__title');
	const asidemenuName = document.querySelectorAll('.asidemenu__name');
	const exitBtn = document.querySelector('.close-btn');
	const burger = document.querySelector('.burger');
	const overlay = document.querySelector('.overlay');


	const adaptiveAside = () => {
		aside.style.width = '74px';
		asidemenuTitle.forEach(i => i.style.display = 'none');
		asidemenuName.forEach(i => i.style.display = 'none');
		title.style.display = 'none';
		exitBtn.style.display = 'none';
	};

	const desktopAside = () => {
		aside.style.width = '';
		asidemenuTitle.forEach(i => i.style.display = '');
		asidemenuName.forEach(i => i.style.display = '');
		title.style.display = '';
		exitBtn.style.display = '';
	};

	const toggleOverlay = (show) => {
		if (show) {
			overlay.classList.add('active');
		} else {
			overlay.classList.remove('active');
		}
	};
	
	const checkScreenWidth = () => {
		if (window.innerWidth >= 1200) {
			burger.style.display = 'none';
			aside.classList.remove('open');
			toggleOverlay(false);
			if (window.innerWidth <= 1500) {
			adaptiveAside();
			} else {
			desktopAside();
			}
		} else {
			burger.style.display = 'block';
			aside.style.width = '';
			asidemenuTitle.forEach(i => i.style.display = '');
			asidemenuName.forEach(i => i.style.display = '');
			title.style.display = '';
			exitBtn.style.display = '';
			toggleOverlay(false);
		}
	};

	checkScreenWidth();

	window.addEventListener('resize', checkScreenWidth);

	exitBtn.addEventListener('click', () => {
		if (window.innerWidth >= 1200) adaptiveAside();
		else aside.classList.remove('open');
		toggleOverlay(false);
	});

	logo.addEventListener('click', () => {
		if (window.innerWidth >= 1200) desktopAside();
	});

	burger.addEventListener('click', () => {
		aside.classList.add('open');
		toggleOverlay(true);
	});

	const companyList = document.querySelector('.company__list-block');
	const btnCompany = document.querySelector('.button__company');

	btnCompany.addEventListener('click', () =>{
		if (companyList.style.display === 'none') {
			companyList.style.display = 'block';
		} else {
			companyList.style.display = 'none';
		}
	});
	
});
