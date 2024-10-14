import Repository, {baseUrl, getError} from "./genericRepository";

const routes = {
    getDrivers:"/v1/users/drivers?limit=100",
    driverBooking:"/v1/users/vehicle_request",
    getBookings:"/v1/users/get_vehicle_request?limit=100",
    acceptBooking:"/v1/vehicle/post_accept_booking",
    makeDriverAvailable: "/v1/vehicle/make_vehicle_available",
    rejectBooking:"/v1/vehicle/reject_Request",
    releaseDriver:"/v1/vehicle/vehicle_release",
    deleteBooking:"/v1/users/delete_reject_request",
  };

  class DriverRepository {
    async getDrivers(payload) {
      
      try {
        const request = await Repository.post(
         `${baseUrl}${routes.getDrivers}`,
          payload,
        );
        const {data} = request;
        return {
          results: data.results,
        };
      } catch (error) {
       
        throw getError(error);
       
      }
    }
    async driverBooking(payload) {
      try {
        const request = await Repository.post(
          `${baseUrl}${routes.driverBooking}`,
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
    async getDriverBookings(payload) {
      
      try {
        const request = await Repository.post(
         `${baseUrl}${routes.getBookings}`,
          payload,
        );
        const {data} = request;
        return {
          results: data.results,
        };
      } catch (error) {
       
        throw getError(error);
       
      }
    }
    async updateDriverStatus(payload) {
      
      try {
        const request = await Repository.post(
         `${baseUrl}${routes.acceptBooking}`,
          payload,
        );
        const {data} = request;
        return {
          results: data.results,
        };
      } catch (error) {
       
        throw getError(error);
       
      }
    }
    async makeDriverAvailable(payload) {
      
      try {
        const request = await Repository.post(
         `${baseUrl}${routes.makeDriverAvailable}`,
          payload,
        );
        const {data} = request;
        return {
          results: data.results,
        };
      } catch (error) {
       
        throw getError(error);
       
      }
    }
    async rejectDriverBooking(payload) {
      try {
        const request = await Repository.post(
          `${baseUrl}${routes.rejectBooking}`,
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
    async cancelDriverBooking(payload) {
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
    async releaseDriver(payload) {
      try {
        const request = await Repository.post(
          `${baseUrl}${routes.releaseDriver}`,
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
  
  export default new DriverRepository();