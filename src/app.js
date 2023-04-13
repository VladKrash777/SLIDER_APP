import "./routes/links.js";
import renderSlider from "./pictures/components/renderSlider.js";
import "./pictures/models/Picture.js";
import "./users/models/User.js";
import initialData from "./initial-data/initialData.js";
import "./users/services/localStorageService.js";

initialData()
  .then(data => {
    window.pictures = data.pictures;
    window.users = data.users;
    renderSlider(pictures, 0);
    window.user = null;
  })
  .catch(error => console.log(error));
