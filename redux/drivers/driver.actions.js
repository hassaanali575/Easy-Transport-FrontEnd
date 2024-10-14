import driverActionTypes from "./driver.types";

  export function getDrivers(payload, callback) {
  
    return { type: driverActionTypes.GET_DRIVERS, payload, callback };
  }
  export function getDriversSuccess(driversResult) {
    
    return { type: driverActionTypes.GET_DRIVERS_SUCCESS, driversResult };
  }
  export function driverBooking(payload, callback) {
    return { type: driverActionTypes.DRIVER_BOOKING, payload, callback };
  }
  export function getDriverBookings(payload, callback) {
  
    return { type: driverActionTypes.GET_DRIVER_BOOKINGS, payload, callback };
  }
  export function getDriverBookingsSuccess(bookingsResult) {
    
    return { type: driverActionTypes.GET_DRIVER_BOOKINGS_SUCCESS, bookingsResult };
  }
  export function updateDriverStatus(payload, callback) {
  
    return { type: driverActionTypes.UPDATE_DRIVER_STATUS, payload, callback };
  }
  export function makeDriverAvailable(payload, callback) {
  
    return { type: driverActionTypes.MAKE_DRIVER_AVAILABLE, payload, callback };
  }
  export function rejectDriverBooking(payload, callback) {
  
    return { type: driverActionTypes.REJECT_DRIVER_BOOKING, payload, callback };
  }
  export function cancelDriverBooking(payload, callback) {
  
    return { type: driverActionTypes.CANCEL_DRIVER_BOOKING, payload, callback };
  }
  export function releaseDriver(payload, callback) {
  
    return { type: driverActionTypes.RELEASE_DRIVER, payload, callback };
  }