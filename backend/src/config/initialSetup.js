// Importa el modelo de datos 'Role'
const Role = require("../models/role.model.js");
const User = require("../models/user.model.js");

/**
 * @name createRoles
 * @description Crea los roles por defecto en la base de datos
 * @returns {Promise<void>}
 */
async function createRoles() {
  try {
    // Busca todos los roles en la base de datos
    const count = await Role.estimatedDocumentCount();
    // Si no hay roles en la base de datos los crea
    if (count > 0) return;

    await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "admin" }).save(),
      new Role({ name: "jefe_cuadrilla" }).save(),
      new Role({ name: "reloj_control" }).save(),
      new Role({ name: "brigadista" }).save(),
    ]);
    console.log("* => Roles creados exitosamente");
  } catch (error) {
    console.error(error);
  }
}

/**
 * @name createUsers
 * @description Crea los usuarios por defecto en la base de datos
 * @returns {Promise<void>}
 */
async function createUsers() {
  try {
    const count = await User.estimatedDocumentCount();
    if (count > 0) return;

    const admin = await Role.findOne({ name: "admin" });
    const user = await Role.findOne({ name: "user" });
    const jefeCuadrilla = await Role.findOne({ name: "jefe_cuadrilla" });
    const relojControl = await Role.findOne({ name: "reloj_control" });
    const brigadista = await Role.findOne({ name: "brigadista" });


    await Promise.all([
      new User({
        name: "user",
        email: "user@email.com",
        roles: user._id,
      }).save(),
      new User({
        name: "admin",
        email: "admin@email.com",
        roles: admin._id,
      }).save(),
      new User({
        name: "jefe_cuadrilla",
        email: "jefe_cuadrilla@email.com",
        roles: [jefeCuadrilla._id],
      }).save(),
      new User({
        name: "reloj_control",
        email: "reloj_control@email.com",
        roles: [relojControl._id],
      }).save(),
      new User({
        name: "brigadista",
        email: "brigadista@email.com",
        roles: [brigadista._id],
      }).save(),
    ]);
    console.log("* => Users creados exitosamente");
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createRoles,
  createUsers,
};
