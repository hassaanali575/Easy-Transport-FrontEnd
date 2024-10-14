import driverActionTypes from "./driver.types";

export const initState = {
  driversResult: null,
  driverBookings:null,
};

function DriverReducer(state = initState, action) {
  switch (action.type) {
    case driverActionTypes.GET_DRIVERS_SUCCESS:
      return {
        ...state,
        ...{driversResult: action.driversResult},
      };
      case driverActionTypes.GET_DRIVER_BOOKINGS_SUCCESS:
        return {
          ...state,
          ...{driverBookings: action.bookingsResult},
        };
   
    default:
      return state;
  }
}

export default DriverReducer;
