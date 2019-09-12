var mongoose = require('mongoose');
var Listing = require('./ListingSchema.js');
var config = require('./config');

mongoose.set('useFindAndModify', false);
mongoose.connect(config.db.uri, { useNewUrlParser: true });

var findLibraryWest = function() {
  Listing.findOne({'code' : 'LBW'}, function(err, query) {
    if (err) {
      throw err;
    }
    else {
      console.log('---------------------------------------Find LBW---------------------------------------');

      if (query.code) {
        var cde = query.code;
        console.log("Code: %s", cde);
      }

      if (query.name) {
        var nme = query.name;
        console.log("Name: %s", nme);
      }

      if (query.coordinates) {
        var lat = query.coordinates.latitude;
        var long = query.coordinates.longitude;
        console.log("Latitude: %d", lat);
        console.log("Longitude: %d", long);
      }

      if (query.address) {
        var addr = query.address;
        console.log("Address: %s", addr);
      }
    }
  });
};

var removeCable = function() {
  Listing.findOneAndRemove({'code' : 'CABL'}, function(err) {
    if (err) {
      throw err;
    }
    else {
      console.log('--------------------------------------Remove CABL-------------------------------------');
      console.log('Removing CABL from listings...');
    }
  });
};

var updatePhelpsLab = function() {
  Listing.findOneAndUpdate({'code' : 'PHL'}, {'address' : '1953 Museum Rd, Gainesville, FL 32603, United States'}, function(err, query) {
    if (err) {
      throw err;
    }
    else {
      console.log('--------------------------------------Update PHL--------------------------------------');
      console.log('Updating PHL from listings...');
    }
  });
};

var retrieveAllListings = function() {
  Listing.find({}, function(err, queries) {
    if (err) {
      throw err;
    }
    else {
      console.log('---------------------------------------Find All---------------------------------------');

      queries.forEach(function(query) {
        if (query.code) {
          var cde = query.code;
          console.log("Code: %s", cde);
        }
  
        if (query.name) {
          var nme = query.name;
          console.log("Name: %s", nme);
        }
  
        if (query.coordinates.latitude && query.coordinates.latitude) {
          var lat = query.coordinates.latitude;
          var long = query.coordinates.longitude;
          console.log("Latitude: %d", lat);
          console.log("Longitude: %d", long);
        }
  
        if (query.address) {
          var addr = query.address;
          console.log("Address: %s", addr);
        }

        console.log();
      });
    }
  });
};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
