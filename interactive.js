const numberOfStepDesktop = document.querySelectorAll('.step-form-number-desktop');
const numberOfStepMobile = document.querySelectorAll('.step-form-number-mobile');
const goBackBtn = document.querySelector('.step-aside-back-btn');
const firstStepDiv = document.querySelector('.first-step-div');
const secondStepDiv = document.querySelector('.second-step-div');
const thirdStepDiv = document.querySelector('.third-step-div');
const fourthStepDiv = document.querySelector('.fourth-step-div');

let actualStepDesktop = 0;
let actualStepMobile = 0;

let actualStepContainer = 1;

// first step section
const firstStepInput = document.querySelectorAll('.first-step-input');
const firstStepErrorText = document.querySelectorAll('.first-step-error-text');
const submitBtn = document.querySelector('.step-aside-next-btn');

let isValid = true;

function checkEmptyInputs() {
	firstStepInput.forEach((input, index) => {
		const inputValue = input.value.trim();

		if (inputValue === '') {
			input.classList.add('error');
			firstStepErrorText[index].classList.add('error');
			isValid = false;
		} else {
			input.classList.remove('error');
			firstStepErrorText[index].classList.remove('error');
		}
	});
}

function checkFullName() {
	const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/g;
  const wordDivided = firstStepInput[0].value.split(' ');
  let newString = '';

  for (let i = 0; i < wordDivided.length; i++) {
    newString += wordDivided[i].charAt(0).toUpperCase() + wordDivided[i].slice(1) + ' ';
  }
  newString = newString.slice(0, -1);

	if (!nameRegex.test(firstStepInput[0].value)) {
		firstStepInput[0].classList.add('error');
		firstStepErrorText[0].classList.add('error');
		isValid = false;
	} else {
		firstStepInput[0].classList.remove('error');
		firstStepErrorText[0].classList.remove('error');
	}

  firstStepInput[0].value = newString;
}

function checkEmail() {
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g;

	if (!emailRegex.test(firstStepInput[1].value)) {
		firstStepInput[1].classList.add('error');
		firstStepErrorText[1].classList.add('error');
		isValid = false;
	} else {
		firstStepInput[1].classList.remove('error');
		firstStepErrorText[1].classList.remove('error');
	}
}

function checkPhoneNumber() {
	const phoneRegex = /^[0-9]{9}$/g;
	firstStepInput[2].value = firstStepInput[2].value.replace(/ /g, '');

	if (!phoneRegex.test(firstStepInput[2].value)) {
		firstStepInput[2].classList.add('error');
		firstStepErrorText[2].classList.add('error');
		isValid = false;
	} else {
		firstStepInput[2].classList.remove('error');
		firstStepErrorText[2].classList.remove('error');
	}
}

function firstStepCheckValidity() {
	isValid = true;

	checkEmptyInputs();
	checkFullName();
	checkEmail();
	checkPhoneNumber();

	return isValid;
}

function afterFirstValidity () {
  const checkValidity = firstStepCheckValidity();
  if (checkValidity && isValid) {
    firstStepDiv.classList.remove('active');
    secondStepDiv.classList.add('active');

    actualStepDesktop++;
    numberOfStepDesktop[actualStepDesktop].classList.add('active');
    numberOfStepDesktop[actualStepDesktop - 1].classList.remove('active');

    actualStepMobile++;
    numberOfStepMobile[actualStepMobile].classList.add('active');
    numberOfStepMobile[actualStepMobile - 1].classList.remove('active');

    goBackBtn.classList.add('active');
    actualStepContainer++;
    // reset inputs
    firstStepInput.forEach((input) => {
      input.value = '';
    });
  }
}

firstStepInput.forEach((input, index) => {
  input.addEventListener('keydown', function (e) {
    if (input.classList.contains('error')) {
      input.classList.remove('error');
      firstStepErrorText[index].classList.remove('error');
    }
    if (e.key === 'Enter') {
      afterFirstValidity();
    }
  });
});
 
submitBtn.addEventListener('click', function () {
  afterFirstValidity();
});

function goBackBtnFunction() {
  switch (actualStepContainer) { 
    case 2: 
      secondStepDiv.classList.remove('active');
      firstStepDiv.classList.add('active');
      break;
    case 3:
      thirdStepDiv.classList.remove('active');
      secondStepDiv.classList.add('active');
      break;
    case 4:
      fourthStepDiv.classList.remove('active');
      thirdStepDiv.classList.add('active');
      break;
  }
      
  
	actualStepContainer--;
  if (actualStepContainer === 1) goBackBtn.classList.remove('active');

  actualStepDesktop--;
  numberOfStepDesktop[actualStepDesktop].classList.add('active');
  numberOfStepDesktop[actualStepDesktop + 1].classList.remove('active');

  actualStepMobile--;
  numberOfStepMobile[actualStepMobile].classList.add('active');
  numberOfStepMobile[actualStepMobile + 1].classList.remove('active');
}

goBackBtn.addEventListener('click', goBackBtnFunction);
// second step section