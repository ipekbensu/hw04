// Homework 4: Data mapping for MBTA Route 1 buses
// repo: https://github.com/ipekbensu/hw04

// Part 2: Count entries

// NPM lowdb
// doc: https://www.npmjs.com/package/lowdb

var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);

db.defaults({vehicles: []}) // init store
    .write();

// count entries
var entriesCount = db.get('vehicles').size().value();

// log number
console.log('# of entries: ' + entriesCount);