import DriverService from "../../repositories/DriversRepository";
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
import driverActionTypes from "./driver.types";
import {
  successNotification,
  errorNotification,
  infoNotification,
} from "../../components/notification/notification";
import {getDriversSuccess,getDriverBookingsSuccess} from "./driver.actions";
import {appName} from "../../repositories/genericRepository";

function* getDriversSaga(action) {
  try {
    let _drivers;
    const {results} = yield call(DriverService.getDrivers,action.payload,);
    _drivers=results;
    yield put(getDriversSuccess(_drivers));
    action.callback();
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
function* driverBookingSaga(action) {
  try {
    const {results} = yield call(
      DriverService.driverBooking,
      action.payload
    );
    successNotification("Success","Driver Booked Sucessfully");
    Router.push("/dashboard");
    action.callback();
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
function* getDriverBookingsSaga(action) {
  try {
    let _driverBookings;
    const {results} = yield call(DriverService.getDriverBookings,action.payload,);
    _driverBookings=results;
    yield put(getDriverBookingsSuccess(_driverBookings));
    action.callback();
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
function* updateDriverStatusSaga(action) {
  try {
    const {results} = yield call(
      DriverService.updateDriverStatus,
      action.payload
    );
    successNotification("Success","Request Accepted Sucessfully");
    Router.push("/dashboard");
    action.callback();
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
function* makeDriverAvailableSaga(action) {
  try {
    const {results} = yield call(
      DriverService.makeDriverAvailable,
      action.payload
    );
    successNotification("Success","Driver Status Updated Sucessfully");
    action.callback();
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
function* rejectDriverBookingSaga(action) {
  try {
    const {results} = yield call(
      DriverService.rejectDriverBooking,
      action.payload
    );
    successNotification("Success","Request Rejected Sucessfully");
    action.callback();
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
function* cancelDriverBookingSaga(action) {
  try {
    const {results} = yield call(
      DriverService.cancelDriverBooking,
      action.payload
    );
    successNotification("Success","Request Deleted Sucessfully");
    action.callback();
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
function* releaseDriverSaga(action) {
  try {
    const {results} = yield call(
      DriverService.releaseDriver,
      action.payload
    );
    successNotification("Success","Driver Released Sucessfully");
    action.callback();
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



export default function* rootSagas() {
  yield all([takeEvery(driverActionTypes.GET_DRIVERS, getDriversSaga)]);
  yield all([takeEvery(driverActionTypes.DRIVER_BOOKING, driverBookingSaga)]);
  yield all([takeEvery(driverActionTypes.GET_DRIVER_BOOKINGS, getDriverBookingsSaga)]);
  yield all([takeEvery(driverActionTypes.UPDATE_DRIVER_STATUS, updateDriverStatusSaga)]);
  yield all([takeEvery(driverActionTypes.MAKE_DRIVER_AVAILABLE, makeDriverAvailableSaga)]);
  yield all([takeEvery(driverActionTypes.REJECT_DRIVER_BOOKING, rejectDriverBookingSaga)]);
  yield all([takeEvery(driverActionTypes.CANCEL_DRIVER_BOOKING, cancelDriverBookingSaga)]);
  yield all([takeEvery(driverActionTypes.RELEASE_DRIVER, releaseDriverSaga)]);
  
}
