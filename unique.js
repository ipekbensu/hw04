// Homework 4: Data mapping for MBTA Route 1 buses
// repo: https://github.com/ipekbensu/hw04

// Part 3: Count unique IDs

// NPM lowdb
// doc: https://www.npmjs.com/package/lowdb

var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);

db.defaults({vehicles: []}) // init store
    .write();

// list/count IDs
var IDs = db.get('vehicles').map('id').value();
// var IDCount = IDs.length;
// console.log('IDs: ' + IDs);
// console.log('# of IDs: ' + IDCount);

// list/count unique IDs
var uniqueIDs = [...new Set(IDs)];
var uniqueIDCount = uniqueIDs.length;

// log
console.log('unique IDs: ' + uniqueIDs);
console.log('# of unique IDs: ' + uniqueIDCount);