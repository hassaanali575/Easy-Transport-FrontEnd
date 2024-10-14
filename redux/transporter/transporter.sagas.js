import TransporterService from "../../repositories/TransporterRepository";
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
import transporterActionTypes from "./transporter.types";
import {
  successNotification,
  errorNotification,
  infoNotification,
} from "../../components/notification/notification";
import {
  getVehicles,
  transporterBookingsSuccess,
  getVehiclesSuccess,
} from "./transporter.actions";
import { updateSuccess } from "../auth/auth.actions";
import { appName } from "../../repositories/genericRepository";

function* registerVehicleSaga(action) {
  try {
    const { results } = yield call(
      TransporterService.registerVehicle,
      action.payload
    );
    successNotification("Success", "Vehicle Added Successfully");
    Router.push("/transporter/vehicles");
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
function* updateVehicleSaga(action) {
  try {
    const { results } = yield call(
      TransporterService.updateVehicle,
      action.payload,
      action.vehicleId
    );
    successNotification("Success", "Vehicle Updated Successfully");
    Router.push("/transporter/vehicles");
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
function* updateProfileSaga(action) {
  try {
    const { results } = yield call(
      TransporterService.updateProfile,
      action.payload,
      action.userId
    );
    yield put(updateSuccess(results));
    successNotification("Success", "Profile Updated Successfully");
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

function* getVehiclesSaga(action) {
  try {
    let _transporterVehicles;
    const { results } = yield call(
      TransporterService.getVehicles,
      action.payload
    );
    _transporterVehicles = results;
    yield put(getVehiclesSuccess(_transporterVehicles));
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
function* transporterBookingsSaga(action) {
  try {
    let _transporterBookings;
    const { results } = yield call(
      TransporterService.transporterBookings,
      action.payload
    );
    _transporterBookings = results;
    yield put(transporterBookingsSuccess(_transporterBookings));
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

function* deleteVehicleSaga(action) {
  try {
    const { results } = yield call(
      TransporterService.deleteVehicle,
      action.payload
    );
    successNotification("Success", "Vehicle Deleted Successfully");
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
function* updateBookingStatusSaga(action) {
  try {
    const { results } = yield call(
      TransporterService.updateBookingStatus,
      action.payload
    );
    successNotification("Success", "Booking Accepted Successfully");
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
function* makeVehicleAvailableSaga(action) {
  try {
    const { results } = yield call(
      TransporterService.makeVehicleAvailable,
      action.payload
    );
    successNotification("Success", "Vehicle Updated Successfully");
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
function* rejectVehicleBookingSaga(action) {
  try {
    const { results } = yield call(
      TransporterService.rejectVehicleBooking,
      action.payload
    );
    successNotification("Success", "Request Rejected Successfully");
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
function* releaseVehicleSaga(action) {
  try {
    const { results } = yield call(
      TransporterService.releaseVehicle,
      action.payload
    );
    successNotification("Success", "Vehicle Released Successfully");
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
  yield all([
    takeEvery(transporterActionTypes.REGISTER_VEHICLE, registerVehicleSaga),
  ]);
  yield all([
    takeEvery(transporterActionTypes.UPDATE_VEHICLE, updateVehicleSaga),
  ]);
  yield all([
    takeEvery(transporterActionTypes.UPDATE_PROFILE, updateProfileSaga),
  ]);
  yield all([takeEvery(transporterActionTypes.GET_VEHICLES, getVehiclesSaga)]);
  yield all([
    takeEvery(
      transporterActionTypes.TRANSPORTER_BOOKINGS,
      transporterBookingsSaga
    ),
  ]);
  yield all([
    takeEvery(transporterActionTypes.DELETE_VEHICLE, deleteVehicleSaga),
  ]);
  yield all([
    takeEvery(
      transporterActionTypes.UPDATE_BOOKING_STATUS,
      updateBookingStatusSaga
    ),
  ]);
  yield all([
    takeEvery(
      transporterActionTypes.MAKE_VEHICLE_AVAILABLE,
      makeVehicleAvailableSaga
    ),
  ]);
  yield all([
    takeEvery(
      transporterActionTypes.REJECT_VEHICLE_BOOKING,
      rejectVehicleBookingSaga
    ),
  ]);
  yield all([
    takeEvery(transporterActionTypes.RELEASE_VEHICLE, releaseVehicleSaga),
  ]);
}
