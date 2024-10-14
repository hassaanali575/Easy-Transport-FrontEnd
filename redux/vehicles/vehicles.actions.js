import vehicleActionTypes from "./vehicles.types";

export function getUserCars(payload, callback) {
  
    return { type: vehicleActionTypes.GET_USER_CARS, payload, callback };
  }
  export function getUserCarsSuccess(result) {

    return { type: vehicleActionTypes.GET_USER_CARS_SUCCESS, result };
  }
  export function getUserVans(payload, callback) {
  
    return { type: vehicleActionTypes.GET_USER_VANS, payload, callback };
  }
  export function getUserVansSuccess(result) {
    
    return { type: vehicleActionTypes.GET_USER_VANS_SUCCESS, result };
  }
  export function getUserBuses(payload, callback) {
  
    return { type: vehicleActionTypes.GET_USER_BUSES, payload, callback };
  }
  export function getUserBusesSuccess(result) {
    
    return { type: vehicleActionTypes.GET_USER_BUSES_SUCCESS, result };
  }
  export function getUserSmTrucks(payload, callback) {
  
    return { type: vehicleActionTypes.GET_USER_SMTRUCKS, payload, callback };
  }
  export function getUserSmTrucksSuccess(result) {
    
    return { type: vehicleActionTypes.GET_USER_SMTRUCKS_SUCCESS, result };
  }
  export function getUserLgTrucks(payload, callback) {
  
    return { type: vehicleActionTypes.GET_USER_LGTRUCKS, payload, callback };
  }
  export function getUserLgTrucksSuccess(result) {
    
    return { type: vehicleActionTypes.GET_USER_LGTRUCKS_SUCCESS, result };
  }
  export function vehicleBookingRequest(payload, callback) {
    return { type: vehicleActionTypes.VEHICLE_BOOKING_REQUEST, payload, callback };
  }
  export function getUserBookings(payload, callback) {
  
    return { type: vehicleActionTypes.GET_USER_BOOKINGS, payload, callback };
  }
  export function getUserBookingsSuccess(result) {
    
    return { type: vehicleActionTypes.GET_USER_BOOKINGS_SUCCESS, result };
  }
  export function getUserVehicleBookings(payload, callback) {
  
    return { type: vehicleActionTypes.GET_USER_VEHICLE_BOOKINGS, payload, callback };
  }
  export function getUserVehicleBookingsSuccess(result) {
    
    return { type: vehicleActionTypes.GET_USER_VEHICLE_BOOKINGS_SUCCESS, result };
  }
  export function cancelVehicleBooking(payload, callback) {
  
    return { type: vehicleActionTypes.CANCEL_VEHICLE_BOOKING, payload, callback };
  }