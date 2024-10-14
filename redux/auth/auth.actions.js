import actionTypes from "./auth.actionTypes";

export function loginRequest(payload, callback) {
  return { type: actionTypes.LOGIN_REQUEST, payload, callback };
}

export function userSignUpRequest(payload, callback) {
  return { type: actionTypes.USER_SIGNUP_REQUEST, payload, callback };
}

export function loginSuccess(user, token) {
  return { type: actionTypes.LOGIN_SUCCESS, user, token };
}

export function updateSuccess(results) {
  return { type: actionTypes.UPDATE_SUCCESS, results };
}

export function signUpSuccess() {
  return { type: actionTypes.SIGNUP_SUCCESS };
}

export function logOutRequest(callback) {
  return { type: actionTypes.LOGOUT, callback };
}

export function logOutSuccess() {
  return { type: actionTypes.LOGOUT_SUCCESS };
}

export function forgotpasswordrequests(payload, callback) {
  return {
    type: actionTypes.FORGOTPASSWORD_REQUEST,
    payload,
    callback,
  };
}

export function resetPasswordRequests(payload, callback) {
  return {
    type: actionTypes.RESETPASSWORD_REQUEST,
    payload,
    callback,
  };
}

export function verifyEmail(payload, callback) {
  return {
    type: actionTypes.VERIFY_EMAIL,
    payload,
    callback,
  };
}
export function contactUs(payload, callback) {
  return {
    type: actionTypes.CONTACT_US,
    payload,
    callback,
  };
}
