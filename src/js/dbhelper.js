function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Common database helper functions.
 */
var DBHelper =
    /*#__PURE__*/
    function () {
      function DBHelper() {
        _classCallCheck(this, DBHelper);
      }

      _createClass(DBHelper, null, [{
        key: "fetchRestaurants",

        /**
         * Fetch all restaurants.
         */
        value: function fetchRestaurants(callback) {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', DBHelper.DATABASE_URL);

          xhr.onload = function () {
            if (xhr.status === 200) {
              // Got a success response from server!
              var json = JSON.parse(xhr.responseText);
              var restaurants = json.restaurants;
              callback(null, restaurants);
            } else {
              // Oops!. Got an error from server.
              var error = "Request failed. Returned status of ".concat(xhr.status);
              callback(error, null);
            }
          };

          xhr.send();
        }
        /**
         * Fetch a restaurant by its ID.
         */

      }, {
        key: "fetchRestaurantById",
        value: function fetchRestaurantById(id, callback) {
          // fetch all restaurants with proper error handling.
          DBHelper.fetchRestaurants(function (error, restaurants) {
            if (error) {
              callback(error, null);
            } else {
              var restaurant = restaurants.find(function (r) {
                return r.id == id;
              });

              if (restaurant) {
                // Got the restaurant
                callback(null, restaurant);
              } else {
                // Restaurant does not exist in the database
                callback('Restaurant does not exist', null);
              }
            }
          });
        }
        /**
         * Fetch restaurants by a cuisine type with proper error handling.
         */

      }, {
        key: "fetchRestaurantByCuisine",
        value: function fetchRestaurantByCuisine(cuisine, callback) {
          // Fetch all restaurants  with proper error handling
          DBHelper.fetchRestaurants(function (error, restaurants) {
            if (error) {
              callback(error, null);
            } else {
              // Filter restaurants to have only given cuisine type
              var results = restaurants.filter(function (r) {
                return r.cuisine_type = cuisine;
              });
              callback(null, results);
            }
          });
        }
        /**
         * Fetch restaurants by a neighborhood with proper error handling.
         */

      }, {
        key: "fetchRestaurantByNeighborhood",
        value: function fetchRestaurantByNeighborhood(neighborhood, callback) {
          // Fetch all restaurants
          DBHelper.fetchRestaurants(function (error, restaurants) {
            if (error) {
              callback(error, null);
            } else {
              // Filter restaurants to have only given neighborhood
              var results = restaurants.filter(function (r) {
                return r.neighborhood == neighborhood;
              });
              callback(null, results);
            }
          });
        }
        /**
         * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
         */

      }, {
        key: "fetchRestaurantByCuisineAndNeighborhood",
        value: function fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
          // Fetch all restaurants
          DBHelper.fetchRestaurants(function (error, restaurants) {
            if (error) {
              callback(error, null);
            } else {
              var results = restaurants;

              if (cuisine != 'all') {
                // filter by cuisine
                results = results.filter(function (r) {
                  return r.cuisine_type == cuisine;
                });
              }

              if (neighborhood != 'all') {
                // filter by neighborhood
                results = results.filter(function (r) {
                  return r.neighborhood == neighborhood;
                });
              }

              callback(null, results);
            }
          });
        }
        /**
         * Fetch all neighborhoods with proper error handling.
         */

      }, {
        key: "fetchNeighborhoods",
        value: function fetchNeighborhoods(callback) {
          // Fetch all restaurants
          DBHelper.fetchRestaurants(function (error, restaurants) {
            if (error) {
              callback(error, null);
            } else {
              // Get all neighborhoods from all restaurants
              var neighborhoods = restaurants.map(function (v, i) {
                return restaurants[i].neighborhood;
              }); // Remove duplicates from neighborhoods

              var uniqueNeighborhoods = neighborhoods.filter(function (v, i) {
                return neighborhoods.indexOf(v) == i;
              });
              callback(null, uniqueNeighborhoods);
            }
          });
        }
        /**
         * Fetch all cuisines with proper error handling.
         */

      }, {
        key: "fetchCuisines",
        value: function fetchCuisines(callback) {
          // Fetch all restaurants
          DBHelper.fetchRestaurants(function (error, restaurants) {
            if (error) {
              callback(error, null);
            } else {
              // Get all cuisines from all restaurants
              var cuisines = restaurants.map(function (v, i) {
                return restaurants[i].cuisine_type;
              }); // Remove duplicates from cuisines

              var uniqueCuisines = cuisines.filter(function (v, i) {
                return cuisines.indexOf(v) == i;
              });
              callback(null, uniqueCuisines);
            }
          });
        }
        /**
         * Restaurant page URL.
         */

      }, {
        key: "urlForRestaurant",
        value: function urlForRestaurant(restaurant) {
          return "./restaurant.html?id=".concat(restaurant.id);
        }
        /**
         * Restaurant image URL.
         */

      }, {
        key: "imageUrlForRestaurant",
        value: function imageUrlForRestaurant(restaurant) {
          return "/img/".concat(restaurant.photograph);
        }
        /**
         * Map marker for a restaurant.
         */

      }, {
        key: "mapMarkerForRestaurant",
        value: function mapMarkerForRestaurant(restaurant, map) {
          // https://leafletjs.com/reference-1.3.0.html#marker
          var marker = new L.marker([restaurant.latlng.lat, restaurant.latlng.lng], {
            title: restaurant.name,
            alt: restaurant.name,
            url: DBHelper.urlForRestaurant(restaurant)
          });
          marker.addTo(newMap);
          return marker;
        }
        /* static mapMarkerForRestaurant(restaurant, map) {
          const marker = new google.maps.Marker({
            position: restaurant.latlng,
            title: restaurant.name,
            url: DBHelper.urlForRestaurant(restaurant),
            map: map,
            animation: google.maps.Animation.DROP}
          );
          return marker;
        } */

      }, {
        key: "DATABASE_URL",

        /**
         * Database URL.
         * Change this to restaurants.json file location on your server.
         */
        get: function get() {
          var port = 8000; // Change this to your server port

          return "http://localhost:".concat(port, "/data/restaurants.json");
        }
      }]);

      return DBHelper;
    }();