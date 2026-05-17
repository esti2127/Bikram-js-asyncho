/**Parte 1---->conseguir las razas en un array */

const getAllBreeds = async () => {
  try {
    /** La URL tiene que ser la de la raza de los perros, no la de la página principal(https://dog.ceo/dog-api/)*/
    const resp = await fetch("https://dog.ceo/api/breeds/list/all");
    /**Se valida la respuesta */
    if (!resp.ok) {
      throw (resp.status);
    } const data = await resp.json();

    /**Las razas están en la propiedad message, que además es un objeto (no un array). Las llaves ("keys") son los nombres de las razas, por eso se usa Object.keys para conseguir el array con los nombres de las razas. */
    const arrayPerros = Object.keys(data.message);
    return arrayPerros;

  } catch (error) {
    console.log(`Error ${error}`);
  }

};

getAllBreeds()
  .then((respuesta) => {
    console.log(respuesta);
  })
  .catch((error) => {
    console.log(error)
  })





/**Parte 2: conseguir una foto random de un perro */

const getRandomDog = async () => {
  try {
    const img = await fetch("https://dog.ceo/api/breeds/image/random");
    /**Se valida la respuesta */
    if (!img.ok) {
      throw (img.status);
    } const data2 = await img.json();


    /**message tiene la url de la foto del perro*/
    const fotoPerro = data2.message;

    return fotoPerro;

  } catch (error2) {
    console.log(`Error ${error2}`);
  }

};

getRandomDog().then((respuesta2) => { console.log(respuesta2) }).catch((error2) => console.error(error2));





const getAllImagesByBreed = async () => {
  try {
    const resp2 = await fetch("https://dog.ceo/api/breed/komondor/images");
    /**Se valida la respuesta */
    if (!resp2.ok) {
      throw (resp2.status);
    }

    const data3 = await resp2.json();

    return data3.message;

  } catch (error3) {
    console.log(`Error ${error3}`);
  }

};

getAllImagesByBreed().then(respuesta3 => { console.log(respuesta3) }).catch((error3) => console.error(error3));



/**Ejercicio 4: Devuelve las fotos del perro que el usuario quiere ver */



const getAllImagesByBreed2 = async (breed) => {
  try {
    /**la raza la da el usuario, así que en la url tiene que "entrar" la raza que la persona decida */
    const resp3 = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    /**Se valida la respuesta */
    if (!resp3.ok) {
      throw (`No se encontró la raza ${breed}`);
    }

    const data3 = await resp3.json();

    return data3.message;

  } catch (error3) {
    console.log(`Error ${error3}`);
  }

};

/**Hay que meter el nombre en minuscula, sino da error */

getAllImagesByBreed2('akita').then(fotoPerroUsuario => { console.log("Fotos de akita:", fotoPerroUsuario) }).catch((error3) => console.error(error3));



/** Ejercicio 5: Declarara una función getGitHubUserProfile(username) que obtenga el perfil de usuario de github a partir de su nombre de usuario*/

const getGitHubUserProfile = async (username) => {
  try {
    const resp4 = await fetch(`https://api.github.com/users/${username}`);

    if (!resp4.ok) {
      throw (`No se encontró al usuario ${username}`);
    }

    const data4 = await resp4.json();

    return data4;

  } catch (error4) {
    console.log(`Error ${error4}`);
  }
}

getGitHubUserProfile("esti2127").then(perfilUsuario => { console.log("Perfil de usuario:", perfilUsuario) }).catch((error4) => console.error(error4));


/**Ejercicio 6:Declara una función printGithubUserProfile(username) que reciba como argumento el nombre de un usuario (username), retorne {img, name} y pinte la foto y el nombre en el DOM */

const printGithubUserProfile = async (username) => {
  try {
    const resp5 = await fetch(`https://api.github.com/users/${username}`);

    if (!resp5.ok) {
      throw (`No se encontró al usuario ${username}`);
    }

    const data5 = await resp5.json();

    const perfil = {
      /**URL de la foto de perfil */
      img: data5.avatar_url,
      /**nombre visible del usuario */
      name: data5.name,
    }

    const imagen = document.createElement('img');

    imagen.src = perfil.img;

    const nombre = document.createElement("h2");
    nombre.textContent = perfil.name;

    document.body.append(imagen);
    document.body.append(nombre);

    return perfil;

  } catch (error5) {
    console.log(`Error ${error5}`);
  }

}

// printGithubUserProfile("esti2127").then(perfilUsuario => { console.log("Perfil de usuario:", perfilUsuario) }).catch((error5) => console.error(error5));


/**Ejercicio 7: Crea una función getAndPrintGitHubUserProfile(username) que contenga una petición a la API para obtener información de ese usuario y devuelva un string que represente una tarjeta HTML como en el ejemplo, la estructura debe ser exactamente la misma: */

const getAndPrintGitHubUserProfile = async(username) => {
  try {
    const resp6 = await fetch(`https://api.github.com/users/${username}`);

    if (!resp6.ok) {
      throw `No se encontró al usuario ${username}`;
    }

    const data6 = await resp6.json();

    // Guardamos los datos que necesitamos de la API
    const img = data6.avatar_url;
    /**Uso login porque la propiedad alt no existe en github */
    const name = data6.name || data6.login; 
    const repos = data6.public_repos;

    // Se crea  y se devuelve el string HTML con la estructura pedida
    return `<section>
      <img src="${img}" alt="${name}">
      <h1>${name}</h1>
      <p>Public repos: ${repos}</p>
    </section>`;

  } catch (error6) {
    console.log(`Error ${error6}`);
    return `<p>Error: No se pudo cargar el perfil </p>`;
  }
};


/**Ejercicio 8: Manipulación del DOM: Crea un input de tipo texto, y un botón buscar. El usuario escribirá en el input el nombre de usuario de GitHub que quiera buscar. Después llamaremos a la función getAndPrintGitHubUserProfile(username) que se ejecute cuando se pulse el botón buscar. */

const inputTexto = document.createElement('input');
inputTexto.type = 'text';
inputTexto.placeholder = 'Escribe un usuario de GitHub';

const botonBuscar = document.createElement('button');
botonBuscar.type = 'button';
botonBuscar.textContent = "buscar";

document.body.append(inputTexto);
document.body.append(botonBuscar);



botonBuscar.addEventListener('click', () => {
    const username = inputTexto.value
    
    if (username !== "") {
        // Se llama a la función del ejercicio anterior pasándole el usuario
        getAndPrintGitHubUserProfile(username).then(tarjetaHTML => {
        
        // Para pintar la tarjeta en la web, se crea  un contenedor y se mete el string 
        let contenedorPerfil = document.getElementById('contenedorPerfil');
        if (!contenedorPerfil) {
            contenedorPerfil = document.createElement('div');
            contenedorPerfil.id = 'contenedorPerfil';
            document.body.append(contenedorPerfil);
        }
        // contenedorPerfil.innerHTML = tarjetaHTML;

        // const resultadoParaTest = [`https://github.com/${username}`, username];
        // return resultadoParaTest;

      }).catch(err => {
            console.log(err);
      });
    }
});






/**Ejercicio 9: Dada una lista de usuarios de github guardada en una array,crea una funcion fetchGithubUsers(userNames) que utilice 'https://api.github.com/users/${name}' para obtener el nombre de cada usuario. */

async function fetchGithubUsers(userNames) {

  try{
    const promesas = userNames.map(name => fetch(`https://api.github.com/users/${name}`));

    const respuestas = await Promise.all(promesas);

    const datosUsuarios = await Promise.all(respuestas.map(res => res.json()));

    datosUsuarios.forEach(user => {
      console.log(`URL del repositorio: ${user.html_url}`); 
      console.log(`Nombre de usuario: ${user.name || user.login}`); 
    });

  }catch(error7){
    console.log(`Error ${error7}`);
  }
  
}

// const usuariosRealesDePrueba = ['octocat', 'midudev', 'mouredev', 'gaearon', 'esti2127'];

// fetchGithubUsers(usuariosRealesDePrueba);














// const getAndPrintGitHubUserProfile = async(username) => {
//   try{
//     const resp6 = await fetch(`https://api.github.com/users/${username}`);

//     if(!resp6.ok){
//       throw (`No se encontró al usuario ${username}`);
//     }

//     const data6 = await resp6.json();

//     const perfil2 = {

//       img: data6.avatar_url,
//       alt: data6.login,
//       name: data6.name,
//       repos: data6.public_repos

//     }

//     const section = document.createElement('section');
//     const imagen = document.createElement('img');

//     imagen.src = perfil2.img;
//     imagen.alt = perfil2.alt;
//     const titulo = document.createElement('h1');
//     titulo.textContent=perfil2.name;
//     const texto = document.createElement('p');
//     texto.textContent= `Public repos: perfil2.repos`;

//     section.append(imagen);
//     section.append(titulo);
//     section.append(texto);
    

//     return json.stringify(perfil2);

//   }catch (error6){
//     console.log(`Error ${error6}`);
//   }

// }

