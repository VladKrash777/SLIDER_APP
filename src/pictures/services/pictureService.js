/* import elements */
import useForm from "../../forms/useForm.js";
import { onInputChange, onReset } from "../../forms/utils/formMethods.js";
import PAGES from "../../routes/pageModel.js";
import { onChangePage } from "../../routes/router.js";
import {
  CREATE_PIC_URL_FIELD,
  CREATE_PIC_URL_ERROR,
  CREATE_PIC_ALT_FIELD,
  CREATE_PIC_ALT_ERROR,
  CREATE_PIC_CREDITS_FIELD,
  CREATE_PIC_CREDITS_ERROR,
  CREATE_PIC_PRICE_FIELD,
  CREATE_PIC_PRICE_ERROR,
  CREATE_PIC_CANCEL_BTN,
  CREATE_PIC_SUBMIT_BTN,
} from "../../services/domService.js";
import INITIAL_CREATE_PIC_FORM from "../helpers/initialForms/initial_create_pic_form.js";
import Picture from "../models/Picture.js";
import CREATE_PIC_SCHEMA from "../models/schema/create_pic_schema.js";

export const createPicture = () => {
  /* array of inputs elements */
  const INPUTS_ARRAY = [
    CREATE_PIC_URL_FIELD,
    CREATE_PIC_ALT_FIELD,
    CREATE_PIC_CREDITS_FIELD,
    CREATE_PIC_PRICE_FIELD,
  ];

  /* array of errors elements */
  const ERRORS_ARRAY = [
    CREATE_PIC_URL_ERROR,
    CREATE_PIC_ALT_ERROR,
    CREATE_PIC_CREDITS_ERROR,
    CREATE_PIC_PRICE_ERROR,
  ];

  /* handleSubmit  */
  const handleSubmitCreatePic = data => {
    try {
      data.user_id = "123456";
      const pic = new Picture(data, pictures);
      onReset(INPUTS_ARRAY, ERRORS_ARRAY,CREATE_PIC_SUBMIT_BTN, rest.handleReset);
      pictures.push(pic);
      onChangePage(PAGES.HOME);
    } catch (error) {
      console.log(error);
    }
  };

  /* useForm  */
  const { errors, ...rest } = useForm(
    INITIAL_CREATE_PIC_FORM,
    CREATE_PIC_SCHEMA,
    handleSubmitCreatePic
  );

  /* event listeners */
  CREATE_PIC_URL_FIELD.addEventListener("input", event =>
    onInputChange(
      event,
      CREATE_PIC_URL_ERROR,
      CREATE_PIC_SUBMIT_BTN,
      rest.handleInputChange,
      rest.handleDisableSubmitBtn
    )
  );

  // CREATE_PIC_URL_FIELD.removeEventListener("input", onInputChange);

  CREATE_PIC_ALT_FIELD.addEventListener("input", event =>
    onInputChange(
      event,
      CREATE_PIC_ALT_ERROR,
      CREATE_PIC_SUBMIT_BTN,
      rest.handleInputChange,
      rest.handleDisableSubmitBtn
    )
  );

  CREATE_PIC_CREDITS_FIELD.addEventListener("input", event =>
    onInputChange(
      event,
      CREATE_PIC_CREDITS_ERROR,
      CREATE_PIC_SUBMIT_BTN,
      rest.handleInputChange,
      rest.handleDisableSubmitBtn
    )
  );
  CREATE_PIC_PRICE_FIELD.addEventListener("input", event =>
    onInputChange(
      event,
      CREATE_PIC_PRICE_ERROR,
      CREATE_PIC_SUBMIT_BTN,
      rest.handleInputChange,
      rest.handleDisableSubmitBtn
    )
  );

  CREATE_PIC_CANCEL_BTN.addEventListener("click", () =>
    onReset(INPUTS_ARRAY, ERRORS_ARRAY, CREATE_PIC_SUBMIT_BTN, rest.handleReset)
  );
  CREATE_PIC_SUBMIT_BTN.addEventListener("click", rest.onSubmit);
};
