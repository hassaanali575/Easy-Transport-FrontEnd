import AuthService from "../../repositories/AuthenticationRepository";
import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
  cancel,
  cancelled,
} from "redux-saga/effects";
import Router from "next/router";
import actionTypes from "./auth.actionTypes";
import {
  successNotification,
  errorNotification,
  infoNotification,
} from "../../components/notification/notification";
import { loginSuccess, logOutSuccess } from "./auth.actions";
import { appName } from "../../repositories/genericRepository";

function* userSignUpSaga(action) {
  try {
    const { message, description } = yield call(
      AuthService.userRegister,
      action.payload
    );
    Router.push("/");
    action.callback();
    successNotification("Success", "Account Created Successfully");
  } catch (error) {
    if (action && action.callback) {
      console.log("Error: ", error);
      action.callback();
      errorNotification("Error", error);
    }
  } finally {
    yield cancel();
  }
}

function* loginSaga(action) {
  try {
    let _tokens;
    let _user;
    if (action.payload.tokens) {
      _tokens = action.payload.tokens;
    } else {
      const { user, tokens } = yield call(AuthService.login, action.payload);
      _tokens = {
        accessToken: tokens.access.token,
        refreshToken: tokens.refresh.token,
      };
      _user = user;
    }
    if (_user.isEmailVerified) {
      yield put(loginSuccess(_user, _tokens));
      for (const key of Object.keys(_tokens))
        localStorage.setItem(`user_${key}`, _tokens[key]);

      for (const key of Object.keys(_user))
        localStorage.setItem(`user_${key}`, _user[key]);
      action.callback();
      Router.push("/dashboard");
      successNotification("Welcome Back", "Logged In successfully");
    } else {
      action.callback();
      errorNotification(
        "Verify Your Email First",
        "Check your mailbox to verify email"
      );
    }
  } catch (error) {
    if (action && action.callback) {
      action.callback();
      errorNotification("Error", error);
    }
  } finally {
    yield cancel();
  }
}

function* logOutSaga(action) {
  try {
    // const payload = {
    //   refreshToken: localStorage.getItem(`user_refreshToken`),
    // };

    // yield call(AuthService.logout, payload);
    localStorage.removeItem(`user_accessToken`);
    localStorage.removeItem(`user_refreshToken`);
    successNotification("Success", "Logout Successfully");
    action.callback();
    Router.push("/login");
    yield put(logOutSuccess());
  } catch (err) {
    console.log(err);
    errorNotification("Error", err);
  }
}

function* forgotpasswordSaga({ payload, callback }) {
  try {
    yield call(AuthService.forgetPassword, payload);
    infoNotification("Success", "Please check your email to reset password");
    if (callback) callback();
  } catch (error) {
    errorNotification("Failed", error);
    if (callback) callback(true);
  } finally {
    yield cancel();
  }
}

function* resetPasswordSaga({ payload, callback }) {
  try {
    const token = Router.query.token;
    yield call(AuthService.resetPassword, payload, `token=${token}`);
    infoNotification("Success", "Your password has been changed successfully!");
    if (callback) callback();
    Router.replace("/login");
  } catch (error) {
    errorNotification("Failed", error);
    if (callback) callback(true);
  } finally {
    yield cancel();
  }
}
function* verifyEmailSaga({ payload, callback }) {
  try {
    yield call(AuthService.verifyEmail, payload);
    successNotification(
      "Success",
      "Your Email has been verified successfully!"
    );
    if (callback) callback();
    Router.replace("/login");
  } catch (error) {
    errorNotification("Failed", error);
    if (callback) callback(true);
  } finally {
    yield cancel();
  }
}
function* contactUsSaga(action) {
  try {
    yield call(AuthService.contactUs, action.payload);
    successNotification("Success", "Your message has been sent successfully!");
    action.callback();
  } catch (error) {
    errorNotification("Failed", error);
    action.callback();
  } finally {
    yield cancel();
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actionTypes.USER_SIGNUP_REQUEST, userSignUpSaga)]);
  yield all([takeEvery(actionTypes.LOGIN_REQUEST, loginSaga)]);
  yield all([takeEvery(actionTypes.LOGOUT, logOutSaga)]);
  yield all([
    takeLatest(actionTypes.FORGOTPASSWORD_REQUEST, forgotpasswordSaga),
  ]);
  yield all([takeLatest(actionTypes.RESETPASSWORD_REQUEST, resetPasswordSaga)]);
  yield all([takeLatest(actionTypes.VERIFY_EMAIL, verifyEmailSaga)]);
  yield all([takeEvery(actionTypes.CONTACT_US, contactUsSaga)]);
}
