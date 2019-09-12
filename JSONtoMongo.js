'use strict';

var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config'),
    listingData;

mongoose.connect(config.db.uri, { useNewUrlParser: true });

fs.readFile('listings.json', 'utf8', function(error, data) {
  if (error) {
    throw error;
  }

  listingData = JSON.parse(data);

  for (var i = 0; i < listingData.entries.length; i++) {
    /*if (listingData.entries[i].code) {
      var cde = listingData.entries[i].code;
      console.log("Code: %s", cde);
    }

    if (listingData.entries[i].name) {
      var nme = listingData.entries[i].name;
      console.log("Name: %s", nme);
    }

    if (listingData.entries[i].coordinates) {
      var lat = listingData.entries[i].coordinates['latitude'];
      var long = listingData.entries[i].coordinates['longitude'];
      console.log("Latitude: %d", lat);
      console.log("Longitude: %d", long);
    }

    if (listingData.entries[i].address) {
      var addr = listingData.entries[i].address;
      console.log("Address: %s", addr);
    }

    console.log();*/

    var list = new Listing({
      code: listingData.entries[i].code,
      name: listingData.entries[i].name,
      coordinates: listingData.entries[i].coordinates,
      address: listingData.entries[i].address,
    });

    list.save();
  }
});