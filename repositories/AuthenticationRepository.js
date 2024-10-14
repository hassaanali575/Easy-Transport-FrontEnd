import Repository, { baseUrl, getError } from "./genericRepository";

const routes = {
  userRegister: "/v1/users",
  login: "/v1/auth/login",
  logout: "/v1/auth/logout",
  refreshTokens: "/v1/auth/refresh-tokens",
  sendVerifyEmail: "/v1/auth/send-verification-email",
  verifyEmail: "/v1/auth/verify-email",
  forgetPassword: "/v1/auth/forgot-password",
  resetPassword: "/v1/auth/reset-password",
  verifyEmail: "/v1/auth/verify-email",
  contactUs: "/v1/users/contact-us",
};

class AuthenticationRepository {
  async userRegister(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.userRegister}`,
        payload
      );
      const { data } = request;
      console.log(data);
      return {
        message: data.message,
        description: data.description,
      };
    } catch (error) {
      throw getError(error);
    }
  }

  async login(payload) {
    try {
      const postObject = { ...payload };
      const request = await Repository.post(
        `${baseUrl}${routes.login}`,
        postObject
      );
      const { data } = request;
      return {
        tokens: data.tokens,
        user: data.user,
      };
    } catch (error) {
      throw getError(error);
    }
  }

  async logout(payload) {
    try {
      await Repository.post(`${baseUrl}${routes.logout}`, payload);
    } catch (error) {
      throw getError(error);
    }
  }
  async forgetPassword(payload) {
    try {
      await Repository.post(`${baseUrl}${routes.forgetPassword}`, payload);
    } catch (error) {
      throw getError(error);
    }
  }
  async resetPassword(payload, token) {
    try {
      await Repository.post(
        `${baseUrl}${routes.resetPassword}?${token}`,
        payload
      );
    } catch (error) {
      throw getError(error);
    }
  }
  async contactUs(payload) {
    try {
      await Repository.post(`${baseUrl}${routes.contactUs}`, payload);
    } catch (error) {
      throw getError(error);
    }
  }

  async verifyEmail(payload) {
    try {
      await Repository.post(`${baseUrl}${routes.verifyEmail}`, payload);
    } catch (error) {
      throw getError(error);
    }
  }
}

export default new AuthenticationRepository();
