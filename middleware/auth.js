import jwt from "jsonwebtoken";
import AdminModel from "../models/AdminModal.js";
import sendResponse from "../helpers/sendResponse.js";

const verifyAdminToken = async (req, res, next) => {
  try {
    const bearerToken = req?.headers?.authorization;
    console.log(bearerToken,"verify admi ttt")
    const token = bearerToken?.split(" ")[1];
    if (!token) return sendResponse(res, 403, null, true, "Token not provided");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("decoded=>", decoded)

    if (decoded) {
      const user = await AdminModel.findById(decoded._id).lean();
      if (!user) return sendResponse(res, 403, null, true, "Admin not found");
      req.user = user;
      next();
    } else {
      sendResponse(res, 500, null, true, "Something went wrong");
    }
  } catch (err) {
    sendResponse(res, 500, null, true, "Something went wrong");
  }
};

export default verifyAdminToken;
