export const onReset = (
	inputsElArray,
	errorsElArray,
	submitBtn,
	handleReset
) => {
	handleReset();
	inputsElArray.map(input => {
		input.value = "";
		input.removeEventListener("input", onInputChange);
	});
	errorsElArray.map(err => {
		err.innerHTML = "";
	});
	submitBtn.setAttribute("disabled", "disabled");
};

export const onInputChange = (
	event,
	errorEl,
	submitBtn,
	handleInputChange,
	handleDisableSubmitBtn
) => {
	const { error } = handleInputChange(event);
	errorEl.innerHTML = error;
	const isFormValidate = handleDisableSubmitBtn();
	if (!isFormValidate) return submitBtn.removeAttribute("disabled");
	submitBtn.setAttribute("disabled", "disabled");
};
