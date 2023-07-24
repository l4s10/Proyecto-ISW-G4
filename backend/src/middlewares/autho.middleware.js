// Autorizacion - Comprobar el rol del usuario
const User = require("../models/user.model.js");
const Role = require("../models/role.model.js");
const { respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");

async function isAdmin(req, res, next) {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }
    return respondError(req, res, 401, "Require Admin Role!");
  } catch (error) {
    handleError(error, "autho.middleware -> isAdmin");
  }
}
async function isUser(req, res, next) {
  try {
    const user = await User.findById(req.userId).populate("roles");
    if (user && user.roles.some(role => role.name === "user")) {
      req.user = {
        _id: user._id,
        roles: user.roles.map(role => role.name),
      };
      next();
    } else {
      return respondError(req, res, 401, "Require User Role!");
    }
  } catch (error) {
    handleError(error, "auth.middleware -> isUser");
  }
}
async function isAdminOrRelojControl(req, res, next) {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin" || roles[i].name === "reloj_control") {
        next();
        return;
      }
    }
    return respondError(req, res, 401, "Require Admin or Reloj_Control Role!");
  } catch (error) {
    handleError(error, "autho.middleware -> isAdminOrRelojControl");
  }
}

module.exports = {
  isAdmin,
  isUser,
  isAdminOrRelojControl,
};
