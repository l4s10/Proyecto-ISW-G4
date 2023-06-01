/**
 * @module roleMiddleware
 * @description Middleware para verificar el rol del usuario y restringir el acceso a ciertas rutas.
 */

/**
 * Verifica si el usuario tiene los roles necesarios para acceder a la ruta.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @param {Function} next - Función de siguiente middleware.
 * @returns {void}
 */
function checkRole(req, res, next) {
    // Verifica si req.user existe y luego accede a req.user.roles
    const userRoles = req.user && req.user.roles;
    console.log(userRoles);
    if (userRoles && (userRoles.includes("reloj_control") || userRoles.includes("admin"))) {
        next(); // Permite el acceso a la ruta siguiente
    } else {
        res.status(403).json({
            message: "Acceso denegado. No tienes permiso para acceder a esta ruta.",
        });
    }
}
module.exports = { checkRole };
