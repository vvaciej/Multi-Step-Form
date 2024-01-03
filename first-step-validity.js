const firstStepInput = document.querySelectorAll('.first-step-input');
const firstStepErrorText = document.querySelectorAll('.first-step-error-text');

function checkEmptyInputs() {
	firstStepInput.forEach((input, index) => {
		const inputValue = input.value.trim();

		if (inputValue === '') {
			input.classList.add('error');
			firstStepErrorText[index].classList.add('error');
			isFirstStepValid = false;
		} else {
			input.classList.remove('error');
			firstStepErrorText[index].classList.remove('error');
		}
	});
}

function checkFullName() {
  const nameInput = firstStepInput[0];
	const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/g;
	const wordDivided = nameInput.value.split(' ');
	let newString = '';

	for (let i = 0; i < wordDivided.length; i++) {
		newString += wordDivided[i].charAt(0).toUpperCase() + wordDivided[i].slice(1) + ' ';
	}
	newString = newString.slice(0, -1);

	if (!nameRegex.test(nameInput.value)) {
		nameInput.classList.add('error');

		isFirstStepValid = false;
	} else {
		nameInput.classList.remove('error');
	}

	nameInput.value = newString;
}

function checkEmail() {
  const emailInput = firstStepInput[1];
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g;

	if (!emailRegex.test(emailInput.value)) {
		emailInput.classList.add('error');

		isFirstStepValid = false;
	} else {
		emailInput.classList.remove('error');
	}
}

function checkPhoneNumber() {
  const phoneInput = firstStepInput[2];
	const phoneRegex = /^[0-9]{9}$/g;
	phoneInput.value = phoneInput.value.replace(/ /g, '');

	if (!phoneRegex.test(phoneInput.value)) {
		phoneInput.classList.add('error');

		isFirstStepValid = false;
	} else {
		phoneInput.classList.remove('error');
	}
}

export function firstStepCheckValidity() {
	let isFirstStepValid = true;

	checkEmptyInputs();
	checkFullName();
	checkEmail();
	checkPhoneNumber();


	console.log('5');
	
	return isFirstStepValid;
}
