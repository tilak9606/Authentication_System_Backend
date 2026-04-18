import * as authService from "./auth.services.js";
import ApiResponse from "../../common/utils/api-response.js";

const register = async (req, res) => {
    const user = await authService.register(req.body);
    ApiResponse.created(res, "User registered successfully, Verify your Email", user,);
};

const login = async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.login(req.body);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  ApiResponse.ok(res, "Login successful", { user, accessToken });
};

const refreshToken = async (req, res) => {
    const token = req.cookies?.refreshToken;
    const { accessToken } = await authService.refreshToken(token);
    ApiResponse.ok(res, "Token refreshed successfully", { accessToken });
};

const logout = async (req, res) => {
    await authService.logout(req.user.id);
    res.clearCookie("refreshToken");
    ApiResponse.ok(res, "Logout successful");
};

const verifyEmail = async (req, res) => {
    await authService.verifyEmail(req.params.token);
    ApiResponse.ok(res, "Email verified successfully");
};

const forgotPassword = async (req, res) => {
    await authService.forgotPassword(req.body.email);
    ApiResponse.ok(res, "Password reset email sent if the email is registered");
};

const resetPassword = async (req, res) => {
    await authService.resetPassword(req.params.token, req.body.password);
    ApiResponse.ok(res, "Password reset successful");
};

const getMe = async (req, res) => {
    const user = await authService.getMe(req.user.id);
    ApiResponse.ok(res, "User profile retrieved successfully", user);
};

export {
    register,
    login,
    refreshToken,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword,
    getMe,
};