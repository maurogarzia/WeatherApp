// Funcion para que el texto devuelva la primer letra en mayuscula
export const capitalize = (text : string) => {
        return text.charAt(0).toUpperCase() + text.slice(1)
    }