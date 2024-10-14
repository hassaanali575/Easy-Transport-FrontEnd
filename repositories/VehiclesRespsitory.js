import Repository, {baseUrl, getError} from "./genericRepository";

const routes = {
    getVehicles:"/v1/vehicle/get_vehicles?limit=100",
    vehicleBooking:"/v1/users/vehicle_request",
    getUserBookings:"/v1/users/get_Customer_Booking_List?limit=100",
    deleteBooking:"/v1/users/delete_reject_request",
  };

  class VehiclesRepository {
    async getUserCars(payload) {
     
      try {
        const request = await Repository.post(
          `${baseUrl}${routes.getVehicles}`,
          payload,
         
        );
        const {data} = request;
        const cars=data.results;
        return {
          cars,
        };
      } catch (error) {
        throw getError(error);
      }
  
    }
    async getUserVans(payload) {
     
      try {
        const request = await Repository.post(
          `${baseUrl}${routes.getVehicles}`,
          payload,
         
        );
        const {data} = request;
        const vans=data.results;
        return {
          vans,
        };
      } catch (error) {
        throw getError(error);
      }
  
    }
    async getUserBuses(payload) {
     
      try {
        const request = await Repository.post(
          `${baseUrl}${routes.getVehicles}`,
          payload,
         
        );
        const {data} = request;
        const buses=data.results;
        return {
          buses,
        };
      } catch (error) {
        throw getError(error);
      }
  
    }
    async getUserSmTrucks(payload) {
     
      try {
        const request = await Repository.post(
          `${baseUrl}${routes.getVehicles}`,
          payload,
         
        );
        const {data} = request;
        const smTrucks=data.results;
        return {
          smTrucks,
        };
      } catch (error) {
        throw getError(error);
      }
  
    }
    async getUserLgTrucks(payload) {
     
      try {
        const request = await Repository.post(
          `${baseUrl}${routes.getVehicles}`,
          payload,
         
        );
        const {data} = request;
        const lgTrucks=data.results;
        return {
          lgTrucks,
        };
      } catch (error) {
        throw getError(error);
      }
  
    }
    async vehicleBookingRequest(payload) {
      try {
        const request = await Repository.post(
          `${baseUrl}${routes.vehicleBooking}`,
          payload
        );
        const {data} = request;
        return {
          results: data.results,
        };
      } catch (error) {
        throw getError(error);
      }
    }
    async getUserBookings(payload) {
     
      try {
        const request = await Repository.post(
          `${baseUrl}${routes.getUserBookings}`,
          payload,
         
        );
        const {data} = request;
        const userbookings=data.results;
        return {
          userbookings,
        };
      } catch (error) {
        throw getError(error);
      }
  
    }
    async getUserVehicleBookings(payload) {
     
      try {
        const request = await Repository.post(
          `${baseUrl}${routes.getUserBookings}`,
          payload,
         
        );
        const {data} = request;
        const uservehiclebookings=data.results;
        return {
          uservehiclebookings,
        };
      } catch (error) {
        throw getError(error);
      }
  
    }
    async cancelVehicleBooking(payload) {
      try {
        const request = await Repository.post(
          `${baseUrl}${routes.deleteBooking}`,
          payload
        );
        const {data} = request;
        return {
          results: data.results,
        };
      } catch (error) {
        throw getError(error);
      }
    }
    
    
  }
  
  export default new VehiclesRepository();