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

export function secondStepToggleSwitcher() {
	const yearlyPrice = document.querySelectorAll('.second-step-choose-yearly-text');
	
	secondStepToggleSwitch.classList.toggle('switched');
	
	if (secondStepToggleSwitch.classList.contains('switched')) {
		yearlyPrice.forEach(yearly => {
			yearly.classList.add('active');
		});
    secondStepPriceTextSource.arcade.textContent = '$90/yr';
    secondStepPriceTextSource.advanced.textContent = '$120/yr';
    secondStepPriceTextSource.pro.textContent = '$150/yr';
		
		for (const key in secondStepSwitchText) {
			secondStepSwitchText[key].classList.toggle('active');
    }
	} else {
		yearlyPrice.forEach(yearly => {
			yearly.classList.remove('active');
		});
    secondStepPriceTextSource.arcade.textContent = '$9/mo';
    secondStepPriceTextSource.advanced.textContent = '$12/mo';
    secondStepPriceTextSource.pro.textContent = '$15/mo';
		
		for (const key in switchText) {
			secondStepSwitchText[key].classList.toggle('active');
		}
	}
}