import { generateUniqId } from "../../utils/algoMethods.js";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../utils/regex.js";
import { makeEveryFirstLetterCapital } from "./../../utils/algoMethods.js";

class User {
  #id;
  #name;
  #address;
  #phone;
  #email;
  #password;
  #createdAt;
  #isAdmin;
  #isBusiness;

  constructor(user, users = []) {
    const { address, phone, name, password, email, isAdmin, isBusiness } = user;
    this.#id = generateUniqId(users, 1_000_000, 9_999_999);
    this.#name = this.setName(name);
    this.#address = this.checkAddress(address);
    this.#phone = this.checkPhone(phone);
    this.#email = this.checkUniqEmail(email, users);
    this.#password = this.checkPassword(password);
    this.#createdAt = new Date();
    this.#isAdmin = isAdmin || false;
    this.#isBusiness = isBusiness || false;
  }

  setName({ first, last }) {
    if (
      typeof first !== "string" ||
      typeof last !== "string" ||
      first.length < 2 ||
      last.length < 2
    )
      throw new Error("Please enter a valid name!");

    return {
      first: makeEveryFirstLetterCapital(first),
      last: makeEveryFirstLetterCapital(last),
    };
  }

  checkPhone(phone) {
    const regex = /^0[0-9]{1,2}(-?|\s?)[0-9]{3}(-?|\s?)[0-9]{4}/g;
    const isExist = phone.match(regex);
    if (!isExist) throw new Error("Please enter a valid phone number!");
    return phone;
  }

  checkUniqEmail(email, users) {
    email.trim();
    const regex = EMAIL_REGEX;
    const isExist = email.match(regex);
    if (!isExist) throw new Error("Please enter a valid email!");

    const user = users.findIndex(user => user.email === email);
    if (user !== -1) throw new Error("User is already registered!");

    return email;
  }

  checkPassword(password) {
    const regex = PASSWORD_REGEX;
    const isExist = password.match(regex);
    if (!isExist)
      throw new Error(
        "The password must contain at least one uppercase letter in English. One lowercase letter in English. Four numbers and one of the following special characters !@#$%^&*-"
      );
    return password;
  }

  checkAddress(address) {
    const { state, country, city, street, houseNumber, zip } = address;
    if (
      typeof country !== "string" ||
      country.length < 2 ||
      city.length < 2 ||
      street.length < 2 ||
      typeof houseNumber !== "number" ||
      houseNumber <= 0 ||
      typeof zip !== "number" ||
      zip <= 0
    )
      throw new Error("Please enter a valid address!");

    return { state: state || "", country, city, street, houseNumber, zip };
  }

  changeBizStatus(user) {
    if (user._id !== this.#id && !user.isAdmin)
      throw new Error("User must be the registered user or admin!");
    this.#isBusiness = !this.#isBusiness;
  }

  static findOneAndUpdate(user, users) {
    if (typeof user !== "object") throw new Error("Please enter a valid user!");
    if (Array.isArray(users) !== true || !users.length)
      throw new Error("Please enter array of users");

    const userInArray = users.find(item => item._id === user._id);
    if (!userInArray) throw new Error("this user in not in the database!");

    const { address, phone, name, email, isBusiness } = user;
    userInArray.#name = userInArray.setName(name);
    userInArray.#address = userInArray.checkAddress(address);
    userInArray.#phone = userInArray.checkPhone(phone);
    userInArray.#email =
      email === userInArray.#email
        ? userInArray.#email
        : userInArray.checkUniqEmail(email, users);
    userInArray.#isBusiness = isBusiness ? isBusiness : userInArray.#isBusiness;

    return users;
  }

  changePassword() {}

  get _id() {
    return this.#id;
  }
  get isAdmin() {
    return this.#isAdmin;
  }
  get name() {
    return this.#name;
  }
  get address() {
    return this.#address;
  }
  get phone() {
    return this.#phone;
  }
  get email() {
    return this.#email;
  }
  get password() {
    return this.#password;
  }
  get createdAt() {
    return this.#createdAt;
  }
}

export default User;

// const test = {
//   email: "regular@gmail.co.il",
//   password: "Aa1234!",
//   address: {
//     state: "usa",
//     country: "new-york",
//     city: "new-york",
//     street: "broadway",
//     houseNumber: 5,
//     zip: 123456,
//   },
//   phone: "050-0000000",
//   name: {
//     first: "regular",
//     last: "user",
//   },
// };

// try {
//   const user = new User(test);

//   const userToUpdate = {
//     _id: user._id,
//     name: { first: "shula", last: "zaken" },
//     phone: "054-9999999",
//     address: {
//       state: "",
//       country: "israel",
//       city: "tel-aviv",
//       street: "shoham",
//       houseNumber: 5,
//       zip: 123456,
//     },
//     email: "walla@gmail.co.il",
//   };

//   const array = [user];
//   User.findOneAndUpdate(userToUpdate, array);

//   console.log(array);
// } catch (error) {
//   console.log(error.message);
// }

// try {
//   const user = new User(test);
//   user.changeBizStatus(user);

//   user.update(
// {
//   _id: user._id,
//   name: { first: "shula", last: "zaken" },
//   phone: "054-9999999",
//   address: {
//     state: "",
//     country: "israel",
//     city: "tel-aviv",
//     street: "shoham",
//     houseNumber: 5,
//     zip: 123456,
//   },
//   email: "walla@gmail.co.il",
// },
// array
//   );
//   console.log(user);
// } catch (error) {
//   console.log(error.message);
// }

// const array = ["one", "two", "three"];
// const obj = {};

// const testIsArray = arrayFromClient => {
//   console.log(typeof arrayFromClient);
//   console.log(Array.isArray(arrayFromClient));
// };

// testIsArray(array);
// testIsArray(obj);
