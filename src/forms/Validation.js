class Validation {
  data;
  errors = [];

  constructor(data) {
    this.data = data;
  }

  string() {
    if (typeof this.data !== "string" || !this.data.length)
      this.errors.push("The data you enter is not a valid string");
    return this;
  }

  number() {
    if (typeof +this.data !== "number" || this.data <= 0)
      this.errors.push("The data you enter is not a number");
    return this;
  }

  boolean() {
    if (typeof this.data !== "boolean")
      this.errors.push("The data you enter is not boolean");
    return this;
  }

  object() {
    if (typeof this.data !== "object" || Array.isArray(this.data) === true)
      this.errors.push("The data you enter is not an object");
    return this;
  }

  array() {
    if (Array.isArray(this.data) === false)
      this.errors.push("The data you enter is not an array");
    return this;
  }

  trim() {
    if (this.data !== "string" && !this.data.length)
      this.errors.push("Trim can only work on strings with characters!");
    else this.data = this.data.trim();
    return this;
  }

  email() {
    if (typeof this.data !== "string") {
      this.errors.push("Email must be a valid email");
      return this;
    }
    this.data = this.data.trim();
    const regex = /.+@.+\..{2,}/g;
    const isExist = this.data.match(regex);
    if (!isExist) this.errors.push("Not a valid email");
    return this;
  }

  password() {
    if (typeof this.data !== "string") {
      this.errors.push(
        "Password must contain at least one uppercase letter in English. One lowercase letter in English. Four numbers and one of the following special characters !@#$%^&*-"
      );
      return this;
    }
    this.data = this.data.trim();
    const regex =
      /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/g;
    const isExist = this.data.match(regex);
    if (!isExist)
      this.errors.push(
        "Password must contain at least one uppercase letter in English. One lowercase letter in English. Four numbers and one of the following special characters !@#$%^&*-"
      );
    return this;
  }

  required() {
    if (!this.data) this.errors.push("This is a required field");
    return this;
  }

  url() {
    if (typeof this.data !== "string") {
      this.errors.push("Please enter a valid url");
      return this;
    }
    const regex =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g;
    const isExist = this.data.match(regex);
    if (!isExist) this.errors.push("Please enter a valid url");
    return this;
  }

  regex(regex) {
    if (!regex) {
      this.errors.push("Please enter a regular expression");
      return this;
    }
    if (typeof this.data !== "string") {
      this.errors.push("Regex check must be on a string");
      return this;
    }
    const isExist = this.data.match(regex);
    if (!isExist) this.errors.push("Regex check failed");
    return this;
  }

  min(num) {
    if (!num) {
      this.errors.push("Enter text");
      return this;
    }

    if (typeof this.data !== "string") {
      this.errors.push("The data you enter is not a string");
      return this;
    }
    if (this.data.length < num)
      this.errors.push(
        `The data you enter must be at least ${num} characters long`
      );
    return this;
  }

  max(num) {
    if (!num) {
      this.errors.push("Enter text");
      return this;
    }
    if (typeof this.data !== "string") {
      this.errors.push("The data you enter is not a string");
      return this;
    }
    if (this.data.length > num)
      this.errors.push(
        `The data you enter must be no larger then ${num} characters long`
      );
    return this;
  }

  static validate(data) {
    return new Validation(data);
  }
}

export default Validation;

// const val = new Validation(0).string();

// const val = Validation.validate(0).string();
// const val2 = Validation.validate("text").string();

// console.log(val);
// console.log(val.errors[0]);
// console.log(val2.data);
// console.log(val2.errors[0]);
