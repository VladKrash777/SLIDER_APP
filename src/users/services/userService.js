import { onInputChange, onReset } from "../../forms/utils/formMethods.js";
import PAGES from "../../routes/pageModel.js";
import { onChangePage } from "../../routes/router.js";
import {
	CREATE_PIC_PAGE_LINK,
	LOGIN_EMAIL_ERROR,
	LOGIN_EMAIL_FIELD,
	LOGIN_PAGE_LINK,
	LOGIN_PASSWORD_ERROR,
	LOGIN_PASSWORD_FIELD,
	LOGIN_SUBMIT_BTN,
	SIGNUP_CANCEL,
	SIGNUP_CITY,
	SIGNUP_CITY_ERROR,
	SIGNUP_COUNTRY,
	SIGNUP_COUNTRY_ERROR,
	SIGNUP_EMAIL_ERROR,
	SIGNUP_EMAIL_FIELD,
	SIGNUP_FIRST_NAME,
	SIGNUP_FIRST_NAME_ERROR,
	SIGNUP_HOUSE,
	SIGNUP_HOUSE_ERROR,
	SIGNUP_ISBIZ,
	SIGNUP_LAST_NAME,
	SIGNUP_LAST_NAME_ERROR,
	SIGNUP_PAGE_LINK,
	SIGNUP_PASSWORD_ERROR,
	SIGNUP_PASSWORD_FIELD,
	SIGNUP_PASSWORD_REENTER,
	SIGNUP_PASSWORD_REENTER_ERROR,
	SIGNUP_PHONE,
	SIGNUP_PHONE_ERROR,
	SIGNUP_STATE,
	SIGNUP_STATE_ERROR,
	SIGNUP_STREET,
	SIGNUP_STREET_ERROR,
	SIGNUP_ZIP,
	SIGNUP_ZIP_ERROR,
	SUBMIT_SIGNUP_USER_BTN,
	USER_NOT_FOUND_MSG,
} from "../../services/domService.js";
import useForm from "./../../forms/useForm.js";
import { removeToken, setToken } from "./localStorageService.js";

export const logout = () => {
	removeToken();
	window.user = null;
	LOGIN_PAGE_LINK.textContent = "Login";
	CREATE_PIC_PAGE_LINK.className = "nav-link cursor d-none"
	SIGNUP_PAGE_LINK.className = "nav-link cursor"
	onChangePage(PAGES.HOME)
}

export const login = () => {
	const INITIAL_LOGIN_FORM = {
		email: "",
		password: "",
	};

	const LOGIN_SCHEMA = {
		email: "email",
		password: "password",
	};

	const LOGIN_INPUTS_ARRAY = [LOGIN_EMAIL_FIELD, LOGIN_PASSWORD_FIELD];
	const LOGIN_ERROR_ARRAY = [LOGIN_EMAIL_ERROR, LOGIN_PASSWORD_ERROR];

	// data = { email, password }
	const handleLoginSubmit = data => {

		const foundUsers = window.users.filter((element) => {
			if (element.email === data.email && element.password === data.password) return true
			return false
		})
		if (foundUsers.length > 0) {
			setToken(data)
			window.user = foundUsers[0]
			CREATE_PIC_PAGE_LINK.className = "nav-link cursor d-block"
			SIGNUP_PAGE_LINK.className = "d-none"
			LOGIN_PAGE_LINK.textContent = "LogOut";
			onChangePage(PAGES.HOME)
			onReset(
				LOGIN_INPUTS_ARRAY,
				LOGIN_ERROR_ARRAY,
				LOGIN_SUBMIT_BTN,
				form.handleReset
			);
			USER_NOT_FOUND_MSG.className = "d-none center text-danger";
		} else {
			window.user = null;
			USER_NOT_FOUND_MSG.className = "d-block center text-danger";
		}
	};

	const form = useForm(INITIAL_LOGIN_FORM, LOGIN_SCHEMA, handleLoginSubmit);


	LOGIN_EMAIL_FIELD.addEventListener("input", event => {
		onInputChange(
			event,
			LOGIN_EMAIL_ERROR,
			LOGIN_SUBMIT_BTN,
			form.handleInputChange,
			form.handleDisableSubmitBtn
		);
	});

	LOGIN_PASSWORD_FIELD.addEventListener("input", event => {
		onInputChange(
			event,
			LOGIN_PASSWORD_ERROR,
			LOGIN_SUBMIT_BTN,
			form.handleInputChange,
			form.handleDisableSubmitBtn
		);
	});
	LOGIN_SUBMIT_BTN.addEventListener("click", form.onSubmit);
	SUBMIT_SIGNUP_USER_BTN.addEventListener("click", form.onSubmit);

};

export const signUp = () => {
	const INITIAL_SIGNUP_FORM = {
		email: "",
		password: "",
		passwordReEnter: "",
		first: "",
		last: "",
		state: "",
		country: "",
		city: "",
		street: "",
		phone: "",
		house: "",
		zip: "",
	};

	const SIGNUP_SCHEMA = {
		email: "email",
		password: "password",
		passwordReEnter: "password",
		first: "string",
		last: "string",
		state: "string",
		country: "string",
		city: "string",
		street: "string",
		phone: "string",
		house: "number",
		zip: "number",
	};


	const SIGNUP_INPUTS_ARRAY = [
		SIGNUP_EMAIL_FIELD,
		SIGNUP_PASSWORD_FIELD,
		SIGNUP_FIRST_NAME,
		SIGNUP_LAST_NAME,
		SIGNUP_STATE,
		SIGNUP_COUNTRY,
		SIGNUP_CITY,
		SIGNUP_STREET,
		SIGNUP_HOUSE,
		SIGNUP_ZIP,
		SIGNUP_PHONE,
		SIGNUP_PASSWORD_REENTER,
		SIGNUP_ISBIZ,
	];

	const SIGNUP_ERROR_ARRAY = [
		SIGNUP_EMAIL_ERROR,
		SIGNUP_PASSWORD_ERROR,
		SIGNUP_FIRST_NAME_ERROR,
		SIGNUP_LAST_NAME_ERROR,
		SIGNUP_STATE_ERROR,
		SIGNUP_COUNTRY_ERROR,
		SIGNUP_CITY_ERROR,
		SIGNUP_STREET_ERROR,
		SIGNUP_HOUSE_ERROR,
		SIGNUP_ZIP_ERROR,
		SIGNUP_PHONE_ERROR,
		SIGNUP_PASSWORD_REENTER_ERROR,
	];

	const handleSignupSubmit = data => {
		console.log(data);

		// debugger
		// 
		// 1. compare two passwords, if they are not the same, show error like 
		// USER_NOT_FOUND_MSG.className = "d-none center text-danger"; but use different span.... 
		// and return ( finish function )
		// 2. check if email already exists in global.users.
		// if exists -> shows msgs like 
		// USER_NOT_FOUND_MSG.className = "d-none center text-danger"; but use different span.... 
		// and return. ( finish function ) 
		// 3. if you are in this line, means you didnt return until now.. means everything ok.
		// 4 the user to global users,
		// 5 put him in localStorage
		// 6 put him in global
		// 7 change page to Home
	};

	const form = useForm(INITIAL_SIGNUP_FORM, SIGNUP_SCHEMA, handleSignupSubmit);

	SIGNUP_EMAIL_FIELD.addEventListener("input", event => {
		onInputChange(
			event,
			SIGNUP_EMAIL_ERROR,
			SUBMIT_SIGNUP_USER_BTN,
			form.handleInputChange,
			form.handleDisableSubmitBtn
		);
	});

	SIGNUP_PASSWORD_FIELD.addEventListener("input", event => {
		onInputChange(
			event,
			SIGNUP_PASSWORD_ERROR,
			SUBMIT_SIGNUP_USER_BTN,
			form.handleInputChange,
			form.handleDisableSubmitBtn
		);
	});

	SIGNUP_PASSWORD_REENTER.addEventListener("input", event => {
		onInputChange(
			event,
			SIGNUP_PASSWORD_REENTER_ERROR,
			SUBMIT_SIGNUP_USER_BTN,
			form.handleInputChange,
			form.handleDisableSubmitBtn
		);
	});

	SIGNUP_FIRST_NAME.addEventListener("input", event => {
		onInputChange(
			event,
			SIGNUP_FIRST_NAME_ERROR,
			SUBMIT_SIGNUP_USER_BTN,
			form.handleInputChange,
			form.handleDisableSubmitBtn
		);
	});

	SIGNUP_LAST_NAME.addEventListener("input", event => {
		onInputChange(
			event,
			SIGNUP_LAST_NAME_ERROR,
			SUBMIT_SIGNUP_USER_BTN,
			form.handleInputChange,
			form.handleDisableSubmitBtn
		);
	});

	SIGNUP_STATE.addEventListener("input", event => {
		onInputChange(
			event,
			SIGNUP_STATE_ERROR,
			SUBMIT_SIGNUP_USER_BTN,
			form.handleInputChange,
			form.handleDisableSubmitBtn
		);
	});

	SIGNUP_COUNTRY.addEventListener("input", event => {
		onInputChange(
			event,
			SIGNUP_COUNTRY_ERROR,
			SUBMIT_SIGNUP_USER_BTN,
			form.handleInputChange,
			form.handleDisableSubmitBtn
		);
	});

	SIGNUP_CITY.addEventListener("input", event => {
		onInputChange(
			event,
			SIGNUP_CITY_ERROR,
			SUBMIT_SIGNUP_USER_BTN,
			form.handleInputChange,
			form.handleDisableSubmitBtn
		);
	});

	SIGNUP_STREET.addEventListener("input", event => {
		onInputChange(
			event,
			SIGNUP_STREET_ERROR,
			SUBMIT_SIGNUP_USER_BTN,
			form.handleInputChange,
			form.handleDisableSubmitBtn
		);
	});

	SIGNUP_HOUSE.addEventListener("input", event => {
		onInputChange(
			event,
			SIGNUP_HOUSE_ERROR,
			SUBMIT_SIGNUP_USER_BTN,
			form.handleInputChange,
			form.handleDisableSubmitBtn
		);
	});

	SIGNUP_ZIP.addEventListener("input", event => {
		onInputChange(
			event,
			SIGNUP_ZIP_ERROR,
			SUBMIT_SIGNUP_USER_BTN,
			form.handleInputChange,
			form.handleDisableSubmitBtn
		);
	});

	SIGNUP_PHONE.addEventListener("input", event => {
		onInputChange(
			event,
			SIGNUP_PHONE_ERROR,
			SUBMIT_SIGNUP_USER_BTN,
			form.handleInputChange,
			form.handleDisableSubmitBtn
		);
	});

	SIGNUP_ISBIZ.addEventListener('change', form.handleOnCheckbox);

	SUBMIT_SIGNUP_USER_BTN.addEventListener("click", form.onSubmit);

	SIGNUP_CANCEL.addEventListener("click", () => onReset(
		SIGNUP_INPUTS_ARRAY,
		SIGNUP_ERROR_ARRAY,
		SUBMIT_SIGNUP_USER_BTN,
		form.handleReset
	))
};