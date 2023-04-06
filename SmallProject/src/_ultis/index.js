"use strict";

const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
const PASSWORD_REGEX = /^[A-Za-z\d@$!%*#?&]{6,}$/
const PHONE_NUMBER_REGEX = /^[0-9\s- \+]{8,13}$/
const USERNAME_REGEX = /^(?=.{4,32}$)[a-zA-Z0-9._@]+$/

export {
    EMAIL_REGEX,
    PASSWORD_REGEX,
    PHONE_NUMBER_REGEX,
    USERNAME_REGEX
};