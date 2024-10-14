import transporterActionTypes from "./transporter.types";

export const initState = {
  transporterVehicles: null,
  transporterBookings: null,
};

function TransporterReducer(state = initState, action) {
  switch (action.type) {
    case transporterActionTypes.GET_VEHICLES_SUCCESS:
      return {
        ...state,
        ...{transporterVehicles: action.transporterVehicles},
      };
      case transporterActionTypes.TRANSPORTER_BOOKINGS_SUCCESS:
      return {
        ...state,
        ...{transporterBookings: action.bookingsResult},
      };
    default:
      return state;
  }
}

export default TransporterReducer;
