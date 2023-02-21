export const sendToken = async (user, message, res) => {
  const token = await user.getJWTToken();
  const options = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  res
    .status(201)
    .cookie("token", token, options)
    .json({
      success: true,
      message: message,
      user: user,
      username: user.email.split("@")[0],
    });
};
