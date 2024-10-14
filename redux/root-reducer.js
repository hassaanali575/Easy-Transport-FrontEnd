import { combineReducers } from "redux";
import transporter from "./transporter/transporter.reducer";
import auth from "./auth/auth.reducer";
import vehicles from "./vehicles/vehicles.reducer"
import drivers from "./drivers/driver.reducer"

const rootReducer = combineReducers({
  transporter,
  auth,
  vehicles,
  drivers,
});

export default rootReducer;
