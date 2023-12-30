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

let isFirstStepValid = true;

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
		isFirstStepValid = false;
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
		isFirstStepValid = false;
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
		isFirstStepValid = false;
	} else {
		firstStepInput[2].classList.remove('error');
		firstStepErrorText[2].classList.remove('error');
	}
}

function firstStepCheckValidity() {
	isFirstStepValid = true;

	checkEmptyInputs();
	checkFullName();
	checkEmail();
	checkPhoneNumber();

	return isFirstStepValid;
}

function afterValidity () {
  actualStepDesktop++;
  numberOfStepDesktop[actualStepDesktop].classList.add('active');
  numberOfStepDesktop[actualStepDesktop - 1].classList.remove('active');

  actualStepMobile++;
  numberOfStepMobile[actualStepMobile].classList.add('active');
  numberOfStepMobile[actualStepMobile - 1].classList.remove('active');

  actualStepContainer++;  
}

function afterFirstValidity () {
  const checkValidity = firstStepCheckValidity();

  if (checkValidity && isFirstStepValid) {
    firstStepDiv.classList.remove('active');
    secondStepDiv.classList.add('active');

    afterValidity();

    goBackBtn.classList.add('active');
    // reset inputs
    firstStepInput.forEach((input) => {
      input.value = '';
    });
  }
}

firstStepInput.forEach((input, index) => {
  input.addEventListener('keydown', (e) => {
    if (input.classList.contains('error')) {
      input.classList.remove('error');
      firstStepErrorText[index].classList.remove('error');
    }
    if (e.key === 'Enter') {
      afterFirstValidity();
    }
  });
});
// second step section
const toggleSwitch = document.querySelector('.second-step-toggle-switch');

function secondStepToggleSwitcher () {
  const secondStepYearlyPrice = document.querySelectorAll('.second-step-choose-yearly-text');
  const secondStepPriceTextSwitch = document.querySelectorAll('.second-step-toggle-text');
  toggleSwitch.classList.toggle('switched');

  if (toggleSwitch.classList.contains('switched')) {
    secondStepYearlyPrice.forEach((yearly) => {
      yearly.classList.add('active');
    });
    secondStepPriceTextSwitch[0].classList.toggle('active');
    secondStepPriceTextSwitch[1].classList.toggle('active');
  } else {
    secondStepYearlyPrice.forEach((yearly) => {
      yearly.classList.remove('active');
    });
    secondStepPriceTextSwitch[0].classList.toggle('active');
		secondStepPriceTextSwitch[1].classList.toggle('active');
  }
}

toggleSwitch.addEventListener('click', secondStepToggleSwitcher);

const secondStepChooseBtn = document.querySelectorAll('.second-step-choose-plan-btn');
let chosenPlanIndex = null;

function secondStepChoosePlan (e) {
  const clickedPlan = e.currentTarget;

  secondStepChooseBtn.forEach((btn, index) => { 
    const clickedPlanContainsClass = clickedPlan.classList.contains('chosen');
    if (clickedPlan === btn && !clickedPlanContainsClass) {
      if (chosenPlanIndex !== null) {
        secondStepChooseBtn[chosenPlanIndex].classList.remove('chosen');
      }
      btn.classList.add('chosen');
      chosenPlanIndex = index;
    }
    else if (clickedPlanContainsClass) {
      btn.classList.remove('chosen');
    }
  });

  return chosenPlanIndex;
}

secondStepChooseBtn.forEach((btn) => {
  btn.addEventListener('click', secondStepChoosePlan);
});

let isSecondStepValid = true;

function secondStepCheckValidity() {
  isSecondStepValid = true;

  if (chosenPlanIndex === null) {
    secondStepChooseBtn.forEach((btn) => {
      btn.classList.add('error');
    });
    setTimeout(() => {
      secondStepChooseBtn.forEach((btn) => {
        btn.classList.remove('error');
      });
    }, 400);
    isSecondStepValid = false;
  }

  return isSecondStepValid; 
}

function afterSecondValidity () {
  const checkValidity = secondStepCheckValidity();

  if (checkValidity && isSecondStepValid) {
    secondStepDiv.classList.remove('active');
    thirdStepDiv.classList.add('active');

    afterValidity();
  }
}
// third step section

// all steps section
submitBtn.addEventListener('click', () => {
  switch (actualStepContainer) {
    case 1:
      afterFirstValidity();
      break;
    case 2:
      afterSecondValidity();
      break;
    /*
    case 3:
      thirdStepDiv.classList.remove('active');
      fourthStepDiv.classList.add('active');
      actualStepContainer++;
      break;
    */
  }
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

