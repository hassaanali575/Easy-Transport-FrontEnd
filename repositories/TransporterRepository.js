import Repository, { baseUrl, getError } from "./genericRepository";

const routes = {
  registerVehicle: "/v1/vehicle/register",
  getVehicles: "/v1/vehicle/get_vehicles_by_id?limit=100",
  getBookings: "/v1/users/get_vehicle_request?limit=100",
  deleteVehicle: "/v1/vehicle/delete_vehicle?limit=1000",
  acceptBooking: "/v1/vehicle/post_accept_booking",
  makeVehicleAvailable: "/v1/vehicle/make_vehicle_available",
  rejectBooking: "/v1/vehicle/reject_Request",
  releaseVehicle: "/v1/vehicle/vehicle_release",
  updateVehicle: "/v1/vehicle/update_vehicle?vehicleId=",
  updateProfile: "/v1/users/",
};

class TransporterRepository {
  async registerVehicle(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.registerVehicle}`,
        payload
      );
      const { data } = request;
      return {
        results: data.results,
      };
    } catch (error) {
      throw getError(error);
    }
  }
  async updateVehicle(payload, vehicleId) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.updateVehicle}${vehicleId}`,
        payload
      );
      const { data } = request;
      return {
        results: data.results,
      };
    } catch (error) {
      throw getError(error);
    }
  }
  async updateProfile(payload, userId) {
    try {
      const request = await Repository.patch(
        `${baseUrl}${routes.updateProfile}${userId}`,
        payload
      );
      const { data } = request;
      return {
        results: data,
      };
    } catch (error) {
      throw getError(error);
    }
  }
  async getVehicles(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.getVehicles}`,
        payload
      );
      const { data } = request;
      return {
        results: data.results,
      };
    } catch (error) {
      throw getError(error);
    }
  }
  async transporterBookings(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.getBookings}`,
        payload
      );
      const { data } = request;
      return {
        results: data.results,
      };
    } catch (error) {
      throw getError(error);
    }
  }
  async deleteVehicle(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.deleteVehicle}`,
        payload
      );
      const { data } = request;
      return {
        results: data.results,
      };
    } catch (error) {
      throw getError(error);
    }
  }
  async updateBookingStatus(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.acceptBooking}`,
        payload
      );
      const { data } = request;
      return {
        results: data.results,
      };
    } catch (error) {
      throw getError(error);
    }
  }
  async makeVehicleAvailable(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.makeVehicleAvailable}`,
        payload
      );
      const { data } = request;
      return {
        results: data.results,
      };
    } catch (error) {
      throw getError(error);
    }
  }
  async rejectVehicleBooking(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.rejectBooking}`,
        payload
      );
      const { data } = request;
      return {
        results: data.results,
      };
    } catch (error) {
      throw getError(error);
    }
  }
  async releaseVehicle(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.releaseVehicle}`,
        payload
      );
      const { data } = request;
      return {
        results: data.results,
      };
    } catch (error) {
      throw getError(error);
    }
  }
}

export default new TransporterRepository();
