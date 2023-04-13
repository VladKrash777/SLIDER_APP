import Picture from "../pictures/models/Picture.js";
import User from "../users/models/User.js";

const initialData = async () => {
  try {
    const response = await fetch("/src/initial-data/database.json");
    let { pictures, users } = await response.json();

    pictures = pictures.map(
      (picture, i, pictures) => new Picture(picture, pictures)
    );

    users = users.map(user => new User(user, []));

    return { pictures, users };
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export default initialData;
