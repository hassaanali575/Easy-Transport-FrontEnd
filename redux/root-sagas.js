import { all } from "redux-saga/effects";
import TransporterSagas from "./transporter/transporter.sagas";
import AuthSagas from "./auth/auth.saga";
import VehiclesSagas from "./vehicles/vehicles.saga"
import DriverSagas from "./drivers/driver.sagas"

export default function* rootSaga() {
  yield all([TransporterSagas(), AuthSagas(), VehiclesSagas(),DriverSagas()]);
}
