const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	countryName: { type: String, required: true },
	cityName: { type: String, required: true },
	mobileNumber: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
    admin :{type: Boolean, default: true},
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		countryName: Joi.string().required().label("Country Name"),
        mobileNumber: Joi.string().required().label("mobile Number"),
		cityName: Joi.string().required().label("city Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };