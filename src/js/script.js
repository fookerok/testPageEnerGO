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
		
	const logo = document.querySelector('.logo-desktop');
	const logoAdaptive = document.querySelector('.logo-adaptive');
	const aside = document.querySelector('.aside');
	const asidemenuTitle = document.querySelectorAll('.asidemenu__title');
	const asidemenuName = document.querySelectorAll('.asidemenu__name');
	const exitBtn = document.querySelector('.exit-btn');

	const adaptiveAside = () =>{
		aside.style.width = '74px';
		asidemenuTitle.forEach(i => {
			i.style.display = 'none';
		});
		asidemenuName.forEach(i => {
			i.style.display = 'none';
		});
		logo.style.display = 'none';
		exitBtn.style.display = 'none';
		logoAdaptive.style.display = 'block';
	}

	const desktopAside = () =>{
		aside.style.width = '';
		asidemenuTitle.forEach(i => {
			i.style.display = '';
		});
		asidemenuName.forEach(i => {
			i.style.display = '';
		});
		logo.style.display = '';
		exitBtn.style.display = '';
		logoAdaptive.style.display = 'none';
	}

	logo.addEventListener('click', () => {
		adaptiveAside()
	});

	logoAdaptive.addEventListener('click', () => {
		desktopAside()
	});

	const checkScreenWidth = () => {
		if (window.innerWidth >= 1200 && window.innerWidth <= 1500) {
			adaptiveAside();
		} else {
			desktopAside();
		}
	};

	checkScreenWidth();
	window.addEventListener('resize', checkScreenWidth);

	const burger = document.querySelector('.burger');
	const asideClose = document.querySelector('.aside-close');

	burger.addEventListener('click', () => {
		aside.classList.add('open');
	});

	asideClose.addEventListener('click', () => {
		aside.classList.remove('open');
		burger.style.display = 'block'; 
	});
});





