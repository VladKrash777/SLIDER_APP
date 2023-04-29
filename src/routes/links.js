import {
	ABOUT_PAGE_LINK,
	CREATE_PIC_PAGE_LINK,
	HOME_PAGE_LINK,
	LOGIN_PAGE_LINK,
	RETURN_TO_HOME_PAGE_LINK,
	SIGNUP_PAGE_LINK,
} from "../services/domService.js";
import { getUser } from "../users/services/localStorageService.js";
import { createPicture } from "./../pictures/services/pictureService.js";
import { signUp, login, logout,} from "./../users/services/userService.js";
import PAGES from "./pageModel.js";
import { onChangePage } from "./router.js";

/********* האזנה לאירועים **********/

// ניתוב דפים
HOME_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.HOME));
ABOUT_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.ABOUT));
CREATE_PIC_PAGE_LINK.addEventListener("click", () => {
	onChangePage(PAGES.CREATE_PIC);
	createPicture();
});
SIGNUP_PAGE_LINK.addEventListener("click", () => {
	signUp();
	onChangePage(PAGES.SIGNUP)
});

LOGIN_PAGE_LINK.addEventListener("click", () => {
	const localStorageUser = getUser()
	if (localStorageUser === null) {
		onChangePage(PAGES.LOGIN);
		login();
	} else {
		logout();
		onChangePage(PAGES.HOME);
	}
});
RETURN_TO_HOME_PAGE_LINK.addEventListener("click", () =>
	onChangePage(PAGES.HOME)
);
