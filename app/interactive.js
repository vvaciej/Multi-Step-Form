const numberOfStepDesktop = document.querySelectorAll('.step-form-number-desktop');
const numberOfStepMobile = document.querySelectorAll('.step-form-number-mobile');
const goBackBtn = document.querySelector('.step-aside-back-btn');
const firstStepDiv = document.querySelector('.first-step-div');
const secondStepDiv = document.querySelector('.second-step-div');
const thirdStepDiv = document.querySelector('.third-step-div');
const fourthStepDiv = document.querySelector('.fourth-step-div');
const fiveStepDiv = document.querySelector('.five-step-div');
const submitBtn = document.querySelector('.step-aside-next-btn');

let actualStepDesktop = 0;
let actualStepMobile = 0;

let actualStepContainer = 1;

/* ----------------------- First Step ----------------------- */
const firstStepInput = document.querySelectorAll('.first-step-input');
const firstStepErrorText = document.querySelectorAll('.first-step-error-text');

import { firstStepCheckValidity } from "./first-step-validity.js";

function afterFirstValidity() {
	const checkValidity = firstStepCheckValidity();

	if (checkValidity) {
    afterValidity();

		firstStepDiv.classList.remove('active');
		secondStepDiv.classList.add('active');

		goBackBtn.classList.add('active');
	}
}

firstStepInput.forEach((input, index) => {
	input.addEventListener('keydown', e => {
		if (input.classList.contains('error')) {
			input.classList.remove('error');
			firstStepErrorText[index].classList.remove('error');
		}

		if (e.key === 'Enter') {
			afterFirstValidity();
		}
	});
});
/* ----------------------- Second Step ----------------------- */
const secondStepToggleSwitch = document.querySelector('.second-step-toggle-switch');
const secondStepPriceTextSwitch = document.querySelectorAll('.second-step-toggle-text');
const secondStepPriceText = document.querySelectorAll('.second-step-plan-price-text');

const secondStepSwitchText = {
  monthly: secondStepPriceTextSwitch[0],
  yearly: secondStepPriceTextSwitch[1],
}
const secondStepPriceTextSource = {
  arcade: secondStepPriceText[0],
  pro: secondStepPriceText[1],
  advanced: secondStepPriceText[2],
}

function secondStepToggleSwitcher() {
	const yearlyPrice = document.querySelectorAll('.second-step-choose-yearly-text');

	secondStepToggleSwitch.classList.toggle('switched');

	if (secondStepToggleSwitch.classList.contains('switched')) {
		yearlyPrice.forEach(yearly => {
			yearly.classList.add('active');
		});
    secondStepPriceTextSource.arcade.textContent = '$90/yr';
    secondStepPriceTextSource.pro.textContent = '$120/yr';
    secondStepPriceTextSource.advanced.textContent = '$150/yr';

		for (const key in secondStepSwitchText) {
      secondStepSwitchText[key].classList.toggle('active');
    }
	} else {
		yearlyPrice.forEach(yearly => {
			yearly.classList.remove('active');
		});
    secondStepPriceTextSource.arcade.textContent = '$9/mo';
    secondStepPriceTextSource.pro.textContent = '$12/mo';
    secondStepPriceTextSource.advanced.textContent = '$15/mo';

		for (const key in switchText) {
      secondStepSwitchText[key].classList.toggle('active');
		}
	}

  thirdStepChangePrice();
  fourthStepSummary();
}

secondStepToggleSwitch.addEventListener('click', secondStepToggleSwitcher);

const secondStepChooseBtn = document.querySelectorAll('.second-step-choose-plan-btn');
let chosenPlanIndex = null;

function secondStepChoosePlan(e) {
	const clickedPlan = e.currentTarget;

	secondStepChooseBtn.forEach((btn, index) => {
		const clickedPlanContainsClass = clickedPlan.classList.contains('chosen');

		if (clickedPlan === btn && !clickedPlanContainsClass) {
			if (chosenPlanIndex !== null) {
				secondStepChooseBtn[chosenPlanIndex].classList.remove('chosen');
			}
      
			btn.classList.add('chosen');
			chosenPlanIndex = index;
		} else if (clickedPlan === btn && clickedPlanContainsClass) {
			btn.classList.remove('chosen');
			chosenPlanIndex = null;
		}
	});

	return chosenPlanIndex;
}

secondStepChooseBtn.forEach(btn => {
	btn.addEventListener('click', (e) => {
		secondStepChoosePlan(e);
		fourthStepSummary();
	});
});

function secondStepCheckValidity() {
	let isSecondStepValid = true;

	if (chosenPlanIndex === null) {
		secondStepChooseBtn.forEach(btn => {
			btn.classList.add('error');
		});

		setTimeout(() => {
			secondStepChooseBtn.forEach(btn => {
				btn.classList.remove('error');
			});
		}, 400);

		isSecondStepValid = false;
	}

	return isSecondStepValid;
}

function afterSecondValidity() {
  const isSecondStepValid = secondStepCheckValidity();

	if (isSecondStepValid) {
		afterValidity();

		secondStepDiv.classList.remove('active');
		thirdStepDiv.classList.add('active');

		thirdStepChangePrice();
	}
}
/* ----------------------- Third Step ----------------------- */
function thirdStepChangePrice() {
	const stepPrice = document.querySelectorAll('.third-step-add-ons-btn-rightside-price-text');
	const forYearlyPlan = secondStepToggleSwitch.classList.contains('switched');

	const addOnPrice = {
		onlineService: forYearlyPlan ? '+$10/yr' : '+$1/mo',
		largerStorage: forYearlyPlan ? '+$20/yr' : '+$2/mo',
		customizableProfile: forYearlyPlan ? '+$20/yr' : '+$2/mo',
	};

	stepPrice[0].textContent = addOnPrice.onlineService; // textContent for Online Service Btn
	stepPrice[1].textContent = addOnPrice.largerStorage; // textContent for Larger Storage Btn
	stepPrice[2].textContent = addOnPrice.customizableProfile; // textContent for Customizable Profile Btn
}

const thirdStepAddOnsBtn = document.querySelectorAll('.third-step-add-ons-btn');

function thirdStepChooseAddOns(e) {
  const clickedAddOn = e.currentTarget;
	const checkboxEl = clickedAddOn.querySelector('.third-step-add-ons-checkbox');

	if (checkboxEl.checked) clickedAddOn.classList.add('chosen');
	else clickedAddOn.classList.remove('chosen');

	updateAddOns();
  fourthStepSummary();
}

thirdStepAddOnsBtn.forEach(btn => {
	btn.addEventListener('click', thirdStepChooseAddOns);
});

function afterThirdValidity() {
  afterValidity();
  
	thirdStepDiv.classList.remove('active');
	fourthStepDiv.classList.add('active');
  
	submitBtn.classList.remove('active');
	confirmBtn.classList.add('active');
  
	fourthStepSummary();
}

/* ----------------------- Fourth Step ----------------------- */
function whatPlanChosen() {
  let chosenPlan = null;
  
	secondStepChooseBtn.forEach(btn => {
    const checkIfBtnChosen = btn.classList.contains('chosen');
    
		if (checkIfBtnChosen && btn.classList.contains('arcade')) {
      chosenPlan = 'Arcade';
		} else if (checkIfBtnChosen && btn.classList.contains('pro')) {
      chosenPlan = 'Pro';
		} else if (checkIfBtnChosen && btn.classList.contains('advanced')) {
      chosenPlan = 'Advanced';
		}
	});
  
	return chosenPlan;
}

function whatPriceOfPlan() {
	let chosenPlanPrice = null;
  const chosenPlan = whatPlanChosen();
  const forYearlyPlan = secondStepToggleSwitch.classList.contains('switched');
  
	if (!forYearlyPlan) {
    chosenPlan === 'Arcade' ? chosenPlanPrice = 9 : null;
		chosenPlan === 'Advanced' ? chosenPlanPrice = 12 : null;
		chosenPlan === 'Pro' ? chosenPlanPrice = 15 : null;
	} else if (forYearlyPlan) {
    chosenPlan === 'Arcade' ? chosenPlanPrice = 90 : null;
		chosenPlan === 'Advanced' ? chosenPlanPrice = 120 : null;
		chosenPlan === 'Pro' ? chosenPlanPrice = 150 : null;
	}
  
	return chosenPlanPrice;
}

function updateAddOns() {
  const checkboxEl = document.querySelectorAll('.third-step-add-ons-checkbox');
	const addOnsArr = new Set();
  
	checkboxEl.forEach(el => {
    if (el.checked) {
      const addOnName = el.dataset.addon;
			addOnsArr.add(addOnName);
		}
	});
  
	return addOnsArr;
}

const addOnsSectionSource = {
  onlineService: document.querySelector('.online-service-section'),
  largerStorage: document.querySelector('.larger-storage-section'),
  customizableProfile: document.querySelector('.customizable-profile-section'),
};

function calcAddOnsPrice() {
  let addOnsTotalPrice = 0;
  
	const addOnsPriceSource = {
    onlineService: document.querySelector('.online-service-price'),
		largerStorage: document.querySelector('.larger-storage-price'),
		customizableProfile: document.querySelector('.customizable-profile-price'),
	};
  
	const forYearlyPlan = secondStepToggleSwitch.classList.contains('switched');
	const monthOrYear = forYearlyPlan ? 'yr' : 'mo';
  
	if (addOnsSectionSource.onlineService.classList.contains('active')) {
    addOnsPriceSource.onlineService.textContent = `+$${forYearlyPlan ? '10' : '1'}/${monthOrYear}`;
		addOnsTotalPrice += forYearlyPlan ? 10 : 1;
	}
	if (addOnsSectionSource.largerStorage.classList.contains('active')) {
    addOnsPriceSource.largerStorage.textContent = `+$${forYearlyPlan ? '20' : '2'}/${monthOrYear}`;
		addOnsTotalPrice += forYearlyPlan ? 20 : 2;
	}
	if (addOnsSectionSource.customizableProfile.classList.contains('active')) {
    addOnsPriceSource.customizableProfile.textContent = `+$${forYearlyPlan ? '20' : '2'}/${monthOrYear}`;
		addOnsTotalPrice += forYearlyPlan ? 20 : 2;
	}
  
	return addOnsTotalPrice;
}

function executeFunctionsForSummary () {
	const chosenPlan = whatPlanChosen();
	const chosenPlanPrice = whatPriceOfPlan();
	const addOnsArr = updateAddOns();
	const addOnsTotalPrice = calcAddOnsPrice();

  return {
    chosenPlan,
    chosenPlanPrice,
    addOnsArr,
    addOnsTotalPrice,
  };
}

function fourthStepSummary(e) {
  const totalText = document.querySelector('.fourth-step-summary-footer-leftside-text');
	const totalTextPrice = document.querySelector('.fourth-step-summary-footer-total-price-text');
  const placeForAddOns = document.querySelector('.fourth-step-summary-topside-section');
  const paddingForAddOns = document.querySelector('.fourth-step-summary-bottomside-section');
	const planPrice = document.querySelector('.fourth-step-summary-topside-rightside-price-text');
	const planText = document.querySelector('.fourth-step-summary-topside-heading-text');

  const forYearlyPlan = secondStepToggleSwitch.classList.contains('switched');
  const monthOrYear = forYearlyPlan ? 'yr' : 'mo';
  
  const {chosenPlan, chosenPlanPrice, addOnsArr, addOnsTotalPrice} = executeFunctionsForSummary();

  let isAnyAddOnPresent = false;
  
	for (const key in addOnsSectionSource) {
    const isAddonActive = addOnsArr.has(key);
    addOnsSectionSource[key].classList.toggle('active', isAddonActive);

    if (isAddonActive) isAnyAddOnPresent = true;
	}

  placeForAddOns.classList.toggle('added', isAnyAddOnPresent);
	paddingForAddOns.classList.toggle('added', isAnyAddOnPresent);
  
	planPrice.textContent = `$${chosenPlanPrice}/${monthOrYear}`;
	totalText.textContent = `Total (per ${forYearlyPlan ? 'year' : 'month'})`;
  
  let totalPlanPrice = Number(planPrice.textContent.slice(1, -3));
  let total = totalPlanPrice + addOnsTotalPrice;
  
  totalTextPrice.textContent = `$${total}/${monthOrYear}`;
	planText.textContent = `${chosenPlan} (${forYearlyPlan ? 'Yearly' : 'Monthly'})`;
}

function afterFourthValidity() {
  fourthStepDiv.classList.remove('active');
	fiveStepDiv.classList.add('active');
  
	updateAddOns();
}

const confirmBtn = document.querySelector('.step-aside-confirm-btn');

confirmBtn.addEventListener('click', function () {
  if (actualStepContainer === 4) {
    confirmBtn.classList.remove('active');
    goBackBtn.classList.remove('active');

    fourthStepDiv.classList.remove('active');
    fiveStepDiv.classList.add('active');
  }
});
/* ----------------------- For All Steps ----------------------- */
function afterValidity() {
	actualStepDesktop++;
	numberOfStepDesktop[actualStepDesktop].classList.add('active');
	numberOfStepDesktop[actualStepDesktop - 1].classList.remove('active');

	actualStepMobile++;
	numberOfStepMobile[actualStepMobile].classList.add('active');
	numberOfStepMobile[actualStepMobile - 1].classList.remove('active');

	actualStepContainer++;
}

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

function changeDisplayingActualStep() {
	if (actualStepContainer === 1) goBackBtn.classList.remove('active');

	actualStepDesktop--;
	numberOfStepDesktop[actualStepDesktop].classList.add('active');
	numberOfStepDesktop[actualStepDesktop + 1].classList.remove('active');

	actualStepMobile--;
	numberOfStepMobile[actualStepMobile].classList.add('active');
	numberOfStepMobile[actualStepMobile + 1].classList.remove('active');
}

goBackBtn.addEventListener('click', () => {
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
  changeDisplayingActualStep();
  
  updateAddOns();
  fourthStepSummary();
});