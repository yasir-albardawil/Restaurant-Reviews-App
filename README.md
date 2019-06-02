
# # Restaurant Reviews App

## Table of Contents

-   [Project Overview](#project-overview-stage-1)
-	[Specification](#specification)
-	[Requirements](#requirements)
-	[How to run](#how-to-run)
-	[Leaflet and Mapbox](#leaflet-and-mapbox)
-	[Note aboute ES6](#note-about-es6)
-	[License](#license)

## Project Overview: Stage 1
For the  **Restaurant Reviews**  projects, you will incrementally convert a static webpage to a mobile-ready web application. In  **Stage One**, you will take a static design that lacks accessibility and convert the design to be responsive on different sized displays and accessible for screen reader use. You will also add a service worker to begin the process of creating a seamless offline experience for your users.

## Specification

You will be provided code for a restaurant reviews website. The code has a lot of issues. It’s barely usable on a desktop browser, much less a mobile device. It also doesn’t include any standard accessibility features, and it doesn’t work offline at all. Your job is to update the code to resolve these issues while still maintaining the included functionality.

## Requirements

**Make the provided site fully responsive.**  All of the page elements should be usable and visible in any viewport, including desktop, tablet, and mobile displays. Images shouldn't overlap, and page elements should wrap when the viewport is too small to display them side by side.

**Make the site accessible.**  Using what you've learned about web accessibility, ensure that  `alt`attributes are present and descriptive for images. Add screen-reader-only attributes when appropriate to add useful supplementary text. Use semantic markup where possible, and aria attributes when semantic markup is not feasible.

**Cache the static site for offline use.**  Using Cache API and a ServiceWorker, cache the data for the website so that any page (including images) that has been visited is accessible offline.


## How to run
```
$ git https://github.com/yasir-albardawil/Restaurant-Reviews-App.git
$ Restaurant-Reviews-App
```
- Run with this command:

`$ gulp serve-dist`

You can see your site live at port __8000__: [http://localhost:8000/](http://localhost:8000/)

---


## Leaflet and Mapbox:

This repository uses  [leafletjs](https://leafletjs.com/)  with  [Mapbox](https://www.mapbox.com/). You need to replace  `<your MAPBOX API KEY HERE>`  with a token from  [Mapbox](https://www.mapbox.com/). Mapbox is free to use, and does not require any payment information.

### Note about ES6

Most of the code in this project has been written to the ES6 JavaScript specification for compatibility with modern web browsers and future-proofing JavaScript code. As much as possible, try to maintain use of ES6 in any additional JavaScript you write.

## License

This project is licensed under the MIT License - see the  [LICENSE.md](LICENSE)  file for details
