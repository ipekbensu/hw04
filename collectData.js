// Homework 4: Data mapping for MBTA Route 1 buses
// repo: https://github.com/ipekbensu/hw04

// Part 1: Collect data

// MBTA data
// key: b931eb2686024e9a8efca565d7c894e1
// url: https://api-v3.mbta.com/vehicles?api_key=b931eb2686024e9a8efca565d7c894e1&filter[route]=1&include=trip

var url = 'https://api-v3.mbta.com/vehicles?api_key=b931eb2686024e9a8efca565d7c894e1&filter[route]=1&include=trip';

// NPM node-fetch
// doc: https://www.npmjs.com/package/node-fetch

var fetch = require('node-fetch');

// NPM lowdb
// doc: https://www.npmjs.com/package/lowdb

var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);

db.defaults({vehicles: []}) // init store
    .write();

var data = [];
var count = 0;

function getData(){
    fetch(url)
        .then(res => res.json())
        .then(json => {
            data = json.data;
            addVehicles(data);
            // console.log('run data: ' + data);
            // console.log('database: ' + db.get('vehicles').value());
            count += 1;
            console.log('runs: ' + count);
            if(count<240){
                setTimeout(getData, 15000);
            }
        });
};
getData();

function addVehicles(data){
    data.forEach(function(item){
        db.get('vehicles')
            .push({
                'id': item.id,
                'label': item.attributes.label,
                'direction_id': item.attributes.direction_id,
                'latitude': item.attributes.latitude,
                'longitude': item.attributes.longitude
            })
            .write();
    });
};