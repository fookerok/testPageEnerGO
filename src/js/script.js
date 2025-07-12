const btnAdd = document.querySelector('.btn-add');
const cardsContainer = document.querySelector('.cards-container');

btnAdd.addEventListener('click', () => {
	const companySelects = document.querySelectorAll('.select');
	const company = companySelects[0].options[companySelects[0].selectedIndex].text;
	const job = document.querySelectorAll('.input.job')[0].value;
	const department = companySelects[1].options[companySelects[1].selectedIndex].text;

	const newCard = document.createElement('div');
	newCard.className = 'card__company';
	newCard.innerHTML = `
		<div class="input__image input__image--company image__card"></div>
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
});

document.querySelectorAll('.btn-delete').forEach(btn => {
	btn.addEventListener('click', () => {
		btn.closest('.card__company').remove();
	});
});
