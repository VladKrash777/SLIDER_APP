import renderSlider from "../components/renderSlider.js";
import setCounter from "./setCounter.js";

const onChangeSliderPic = (pictures, counter, controller) => {
  counter = setCounter(pictures, counter, controller);
  renderSlider(pictures, counter);
  return counter;
};

export default onChangeSliderPic;
