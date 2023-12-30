const numberOfStepDesktop = document.querySelectorAll('.step-form-number-desktop');
const numberOfStepMobile = document.querySelectorAll('.step-form-number-mobile');
const goBackBtn = document.querySelector('.step-aside-back-btn');
const firstStepDiv = document.querySelector('.first-step-div');
const secondStepDiv = document.querySelector('.second-step-div');
const thirdStepDiv = document.querySelector('.third-step-div');
const fourthStepDiv = document.querySelector('.fourth-step-div');
const fiveStepDiv = document.querySelector('.five-step-div');

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
    else if (clickedPlan === btn && clickedPlanContainsClass) {
      btn.classList.remove('chosen');
      chosenPlanIndex = null;
    }
  });
  return chosenPlanIndex;
}

secondStepChooseBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    secondStepChoosePlan(e);
    fourthStepSummary();
  });
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
    thirdStepChangePrice();
  }
}
// third step section
function thirdStepChangePrice () {
  const thirdStepPrice = document.querySelectorAll('.third-step-add-ons-btn-rightside-price-text');
  if (toggleSwitch.classList.contains('switched')) {
    thirdStepPrice[0].textContent = '+$10/yr';
    thirdStepPrice[1].textContent = '+$20/yr';
    thirdStepPrice[2].textContent = '+$20/yr';
  } else {    
    thirdStepPrice[0].textContent = '+$1/mo';
    thirdStepPrice[1].textContent = '+$2/mo';
    thirdStepPrice[2].textContent = '+$2/mo';
  }
}

const thirdStepAddOnsBtn = document.querySelectorAll('.third-step-add-ons-btn');

function thirdStepChooseAddOns(e) {
	const clickedAddOn = e.currentTarget;
  const checkboxEl = clickedAddOn.querySelector('.third-step-add-ons-checkbox');

	if (checkboxEl.checked) clickedAddOn.classList.add('chosen');
  else clickedAddOn.classList.remove('chosen');
  updateAddOns();
}

thirdStepAddOnsBtn.forEach((btn) => {
  btn.addEventListener('click', thirdStepChooseAddOns);
});

const confirmBtn = document.querySelector('.step-aside-confirm-btn');

function afterThirdValidity() {
  afterValidity();
  thirdStepDiv.classList.remove('active');
  fourthStepDiv.classList.add('active');
  submitBtn.classList.remove('active');
  confirmBtn.classList.add('active');
  fourthStepSummary();
}

confirmBtn.addEventListener('click', function () {
  if (actualStepContainer === 4) {
    confirmBtn.classList.remove('active');
    goBackBtn.classList.remove('active');
    fourthStepDiv.classList.remove('active');
    fiveStepDiv.classList.add('active');
  }
});
// fourth steps section
function whatPlanChosen () {
  let chosenPlan = null;

  secondStepChooseBtn.forEach(btn => {
    if (btn.classList.contains('chosen') && btn.classList.contains('arcade')) {
      chosenPlan = 'Arcade';
    } else if (btn.classList.contains('chosen') && btn.classList.contains('pro')) {
      chosenPlan = 'Pro';
    } else if (btn.classList.contains('chosen') && btn.classList.contains('advanced')) {
      chosenPlan = 'Advanced';
    }
  });

  return chosenPlan;
}

function whatPriceOfPlan () {
  const forYearlyPlan = toggleSwitch.classList.contains('switched');
  let chosenPlanPrice = null;
  let chosenPlan = whatPlanChosen();

  if (!forYearlyPlan) {
    chosenPlan === 'Arcade' ? chosenPlanPrice = 9 : null;
    chosenPlan === 'Pro' ? chosenPlanPrice = 12 : null;
    chosenPlan === 'Advanced' ? chosenPlanPrice = 15 : null;
  } else if (forYearlyPlan) {
    chosenPlan === 'Arcade' ? chosenPlanPrice = 90 : null;
    chosenPlan === 'Pro' ? chosenPlanPrice = 120 : null;
    chosenPlan === 'Advanced' ? chosenPlanPrice = 150 : null;
  }

  return chosenPlanPrice;
}

function updateAddOns () {
	const checkboxEl = document.querySelectorAll('.third-step-add-ons-checkbox');
	const addOnsArr = new Set();

  checkboxEl.forEach(checkbox => {
		if (checkbox.checked) {
			const addOnName = checkbox.dataset.addon;
			addOnsArr.add(addOnName);
		}
	});

	return addOnsArr;
}

function fourthStepSummary (e) {
  const totalText = document.querySelector('.fourth-step-summary-footer-leftside-text');
	const totalTextPrice = document.querySelector('.fourth-step-summary-footer-total-price-text');
	const onlineService = document.querySelector('.online-service-price');
	const largerStoragePrice = document.querySelector('.larger-storage-price');
  const customizablePrice = document.querySelector('.customizable-profile-price');
  const onlineServiceSection = document.querySelector('.online-service-section');
  const largerStorageSection = document.querySelector('.larger-storage-section');
  const customizableProfileSection = document.querySelector('.customizable-profile-section');
	const planPrice = document.querySelector('.fourth-step-summary-topside-rightside-price-text');
	const planText = document.querySelector('.fourth-step-summary-topside-heading-text');
  
	let chosenPlan = whatPlanChosen();
  let chosenPlanPrice = whatPriceOfPlan(); 
  let addOnsArr = updateAddOns();

  if (addOnsArr.has('Online services')) onlineServiceSection.classList.add('active');
  else onlineServiceSection.classList.remove('active');
  if (addOnsArr.has('Larger storage')) largerStorageSection.classList.add('active');
  else largerStorageSection.classList.remove('active');
  if (addOnsArr.has('Customizable profile')) customizableProfileSection.classList.add('active');
  else customizableProfileSection.classList.remove('active');
  
  const forYearlyPlan = toggleSwitch.classList.contains('switched'); 
  
  const monthOrYear = forYearlyPlan ? 'yr' : 'mo';

  planPrice.textContent = `$${chosenPlanPrice}/${monthOrYear}`;

  if (onlineServiceSection.classList.contains('active')) {
    onlineService.textContent = `+$${forYearlyPlan ? '10' : '1'}/${monthOrYear}`;
  } 
  if (largerStorageSection.classList.contains('active')) {
    largerStoragePrice.textContent = `+$${forYearlyPlan ? '20' : '2'}/${monthOrYear}`;
  }
  if (customizableProfileSection.classList.contains('active')) {
    customizablePrice.textContent = `+$${forYearlyPlan ? '20' : '2'}/${monthOrYear}`;
  }
  
  totalText.textContent = `Total (per ${forYearlyPlan ? 'year' : 'month'})`;

  totalTextPrice.textContent = `
  $${
  Number(planPrice.textContent.slice(1, -3)) + 
  Number(onlineService.textContent.slice(2, -3)) +
  Number(largerStoragePrice.textContent.slice(2, -3)) +
  Number(customizablePrice.textContent.slice(2, -3))
  }/${monthOrYear}`;

	planText.textContent = `${chosenPlan} (${forYearlyPlan ? 'Yearly' : 'Monthly'})`;
}

function afterFourthValidity () {
  fourthStepDiv.classList.remove('active');
  fiveStepDiv.classList.add('active');
  updateAddOns();
}

// all steps section
submitBtn.addEventListener('click', () => {
  switch (actualStepContainer) {
    case 1:
      afterFirstValidity();
      break;
    case 2:
      afterSecondValidity();
      break;
    case 3:
      afterThirdValidity();
      break;
    case 4: 
      afterFourthValidity();
      break;
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
      submitBtn.classList.add('active');
      confirmBtn.classList.remove('active');
      break;
    case 5:
      fiveStepDiv.classList.remove('active');
      fourthStepDiv.classList.add('active');
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