import actionTypes from "./vehicles.types";

export const initState = {
  userCars: null,
  userVans: null,
  userBuses:null,
  userSmTrucks:null,
  userLgTrucks:null,
  userBookings:null,
  userVehicleBookings:null,
};

function UserVehiclesReducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.GET_USER_CARS_SUCCESS:
      return {
        ...state,
        ...{userCars: action.result},
      };
      case actionTypes.GET_USER_VANS_SUCCESS:
      return {
        ...state,
        ...{userVans: action.result},
      };
      case actionTypes.GET_USER_BUSES_SUCCESS:
      return {
        ...state,
        ...{userBuses: action.result},
      };
      case actionTypes.GET_USER_SMTRUCKS_SUCCESS:
      return {
        ...state,
        ...{userSmTrucks: action.result},
      };
      case actionTypes.GET_USER_LGTRUCKS_SUCCESS:
      return {
        ...state,
        ...{userLgTrucks: action.result},
      };
      case actionTypes.GET_USER_BOOKINGS_SUCCESS:
        return {
          ...state,
          ...{userBookings: action.result},
        };
        case actionTypes.GET_USER_VEHICLE_BOOKINGS_SUCCESS:
        return {
          ...state,
          ...{userVehicleBookings: action.result},
        };
    default:
      return state;
  }
}

export default UserVehiclesReducer;
