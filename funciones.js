// Voy a definir las variables donde se va a escribir 
// los campos individuales de RANDOM USER GENERATOR
const foto = document.getElementById('foto');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById("apellido");
const tipoDocu = document.getElementById("tipoDocu");
const numDocumento = document.getElementById("numDocumento");
const sexo = document.getElementById("sexo");
const fechaNacimiento = document.getElementById("fechaNacimiento");
const celular = document.getElementById("celular");
const eMail = document.getElementById("eMail");
const pais = document.getElementById("pais");
const estado = document.getElementById("estado");
const ciudad = document.getElementById("ciudad");
const codigoPostal = document.getElementById("codigoPostal");
const calle = document.getElementById("calle");
const numCalle = document.getElementById("numCalle");
const numPiso = document.getElementById("numPiso");
const departamento = document.getElementById("departamento");


// Esta funcion va a hacer uso de la API RANDOM USER GENERATOR
const ObtenerUsuario = async () => {
        try {
                const direccion = 'https://randomuser.me/api/';
                //direccion web donde obtener datos personales ficticios

                const contestacion = await fetch('https://randomuser.me/api/');
                //constestacion es el bloque devuelto

                const { results } = await contestacion.json();
                //solo me importa el registro result y lo transformo en un .json

                const persona = results[0];
                //pesona es un registro con datos personales ficticios

                //Escribo los registros obtenidos del sitio web
                foto.src = persona.picture.large;
                nombre.innerHTML = "Nombre:   " + persona.name.first;
                apellido.innerHTML = "Apellido: " + persona.name.last;
                tipoDocu.innerHTML = "Tipo Documento: " + persona.id.name;
                numDocumento.innerHTML = "Numero Documento: " + persona.id.value;
                sexo.innerHTML = "Sexo: " + persona.gender;
                fechaNacimiento.innerHTML = "Fecha Nacimiento: " + persona.dob.date.slice(0, 10);
                celular.innerHTML = "Celular: " + persona.cell;
                eMail.innerHTML = "eMail: " + persona.email;
                pais.innerHTML = "Pais: " + persona.location.country;
                estado.innerHTML = "Estado: " + persona.location.state;
                ciudad.innerHTML = "Ciudad: " + persona.location.city;
                codigoPostal.innerHTML = "Codigo Postal: " + persona.location.postcode;
                calle.innerHTML = "Calle: " + persona.location.street.name
                numCalle.innerHTML = "Numero: " + persona.location.street.number
        } catch (error) {
                console.log(error)
        }
}

//Cada vez que se recarga la pagina se carga un nuevo Curricilum
document.addEventListener("DOMContentLoaded", ObtenerUsuario);

//llama a la funcion localizar
localizar();

//Agrege funcion de geolocalizacion a la pagina
function localizar() {        
        if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(mostrarPosicionEnConsola, siHayError);
        } else {
                console.log("La geolocalizacion no es soportada por este navegador.");
        }        
}

//muestra los resultados en consola
function mostrarPosicionEnConsola(position) {
        console.log("Latitud: " + position.coords.latitude +
                "    Longitud: " + position.coords.longitude +
                "    Con una presicion de: " + position.coords.accuracy + " metros");

        localStorage.latutud = position.coords.latitude;
        localStorage.longitud = position.coords.longitude;
        localStorage.presicion = position.coords.accuracy;
}

//muestra errores de localizacion en la consola 
function siHayError(error) {
        switch (error.code) {
                case error.PERMISSION_DENIED:
                        console.log("Usuario denegó la solicitud de Geolocalización.");
                        break;
                case error.POSITION_UNAVAILABLE:
                        console.log("La información de ubicación no está disponible.");
                        break;
                case error.TIMEOUT:
                        console.log("Se agotó el tiempo de espera de la solicitud para obtener la ubicación del usuario.");
                        break;
                case error.UNKNOWN_ERROR:
                        console.log("Un error desconocido ocurrió.");
                        break;
        }
}