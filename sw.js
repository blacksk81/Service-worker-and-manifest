/*
Name_ luis bernal
web_ lbernal.com.ve
mail_ blacksk81@gmail.com
phone_peru_ +51 921966985
Asossiate_ gist.github.com/kosamari/7c5d1e8449b2fbc97d372675f16b566e
*/


var nameapp = 'AppService_woker'     // Identificador de esta aplicación (esto debe ser coherente en cada actualización de caché)
var versions = 'version_01'              // Versión de la memoria caché fuera de línea (cambie este valor cada vez que desee actualizar la memoria caché)
var CACHE_NAME = nameapp + versions
var URLS = [                            // Agregue la URL que desea almacenar en caché en esta lista.
  './',                     // Si tiene archivos JS / CSS separados,
  './index.html',
  './sw.js'            // agregar ruta a esos archivos aquí
]

// Responder con recursos en caché
self.addEventListener('fetch', function (e) {
  console.log('fetch request : ' + e.request.url)
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { // Si el caché está disponible, responda con caché
        console.log('Respondiendo al Cache : ' + e.request.url)
        return request
      } else {       // Si no hay caché, intente recuperar la solicitud
        console.log('Los Archivos no se han guardado en cache : ' + e.request.url)
        return fetch(e.request)
      }

      // Puede omitir si / else para console.log y poner una línea debajo también como esto.
      // return request || fetch(e.request)
    })
  )
})

// Recursos de Cache
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Instalando en Cache : ' + CACHE_NAME)
      return cache.addAll(URLS)
    })
  )
})

// Eliminar cachés obsoletos
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      // `keyList` contiene todos los nombres de caché bajo tu nombre de usuario.github.io
      // filtre los que tienen este prefijo de aplicación para crear la lista blanca
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      // agregar el nombre de caché actual a la lista blanca
      cacheWhitelist.push(CACHE_NAME)

      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('Borrando del Cache : ' + keyList[i] )
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})