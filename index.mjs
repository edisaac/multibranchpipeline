export const handler = async (event, context) => {
    // Obtener los valores de las variables de entorno
    const apiKeyLambda = process.env.API_KEY_LAMBDA;
    const modalidades = process.env.MODALIDADES;
    const apiKeyGestorNotificaciones = process.env.API_KEY_GESTOR_NOTIFICACIONES;
    
    // Construir la respuesta
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            apiKeyLambda: apiKeyLambda,
            modalidades: modalidades,
            apiKeyGestorNotificaciones: apiKeyGestorNotificaciones
        })
    };
    
    return response;
};

