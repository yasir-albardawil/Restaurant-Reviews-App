var restaurants,neighborhoods,cuisines,newMap,markers=[];function registerServiceWorker(){"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("sw.js").then(function(e){console.log("ServiceWorker registration successful with scope: ",e.scope)},function(e){console.log("ServiceWorker registration failed: ",e)})})}function currentYear(){var e=document.getElementById("current-year"),t=new Date;e.textContent=t.getFullYear().toString()}document.addEventListener("DOMContentLoaded",function(e){initMap(),fetchNeighborhoods(),fetchCuisines(),registerServiceWorker(),currentYear()}),fetchNeighborhoods=function(){DBHelper.fetchNeighborhoods(function(e,t){e?console.error(e):(self.neighborhoods=t,fillNeighborhoodsHTML())})},fillNeighborhoodsHTML=function(e){var t=0<arguments.length&&void 0!==e?e:self.neighborhoods,n=document.getElementById("neighborhoods-select");t.forEach(function(e){var t=document.createElement("option");t.setAttribute("aria-label",e),t.innerHTML=e,t.value=e,n.append(t)})},fetchCuisines=function(){DBHelper.fetchCuisines(function(e,t){e?console.error(e):(self.cuisines=t,fillCuisinesHTML())})},fillCuisinesHTML=function(e){var t=0<arguments.length&&void 0!==e?e:self.cuisines,n=document.getElementById("cuisines-select");t.forEach(function(e){var t=document.createElement("option");t.setAttribute("aria-label",e),t.innerHTML=e,t.value=e,n.append(t)})},initMap=function(){self.newMap=L.map("map",{center:[40.722216,-73.987501],zoom:12,scrollWheelZoom:!1}),L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}",{mapboxToken:"pk.eyJ1IjoiYnVhbW1hciIsImEiOiJjanZtZGw0Z2QxODFnNDNsMnV5Nm5qb3piIn0.DQlJK9ZS67myAqvmvs8ODg",maxZoom:18,attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',id:"mapbox.streets"}).addTo(newMap),updateRestaurants()},updateRestaurants=function(){var e=document.getElementById("cuisines-select"),t=document.getElementById("neighborhoods-select"),n=e.selectedIndex,r=t.selectedIndex,a=e[n].value,o=t[r].value;DBHelper.fetchRestaurantByCuisineAndNeighborhood(a,o,function(e,t){e?console.error(e):(resetRestaurants(t),fillRestaurantsHTML())})},resetRestaurants=function(e){self.restaurants=[],document.getElementById("restaurants-list").innerHTML="",self.markers&&self.markers.forEach(function(e){return e.remove()}),self.markers=[],self.restaurants=e},fillRestaurantsHTML=function(e){var t=0<arguments.length&&void 0!==e?e:self.restaurants,n=document.getElementById("restaurants-list");t.forEach(function(e){n.append(createRestaurantHTML(e))}),addMarkersToMap()},createRestaurantHTML=function(e){var t=document.createElement("li"),n=document.createElement("img");n.className="restaurant-img",n.src=DBHelper.imageUrlForRestaurant(e),n.alt="Restaurant image",t.append(n);var r=document.createElement("h1");r.innerHTML=e.name,t.append(r);var a=document.createElement("p");a.innerHTML=e.neighborhood,t.append(a);var o=document.createElement("p");o.innerHTML=e.address,t.append(o);var s=document.createElement("a");return s.setAttribute("aria-label","View details"),s.innerHTML="View Details",s.href=DBHelper.urlForRestaurant(e),t.append(s),t},addMarkersToMap=function(e){(0<arguments.length&&void 0!==e?e:self.restaurants).forEach(function(e){var t=DBHelper.mapMarkerForRestaurant(e,self.newMap);t.on("click",function(){window.location.href=t.options.url}),self.markers.push(t)})};