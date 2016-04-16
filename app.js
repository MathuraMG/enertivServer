var express = require('express');
var client1 = require('./client.js');
var cors = require('cors');
var equipmentObject = require('./equipment.js');

var app = express();
var c = new client1;

var noComplete = 0;


//To use static HTML pages
app.use(express.static('public'));
app.use(cors());

// Examples using Enertiv node module with Express
// See https://api.enertiv.com/docs/#!/api/ for available endpoints

/*
	*
	*		Important Info
	*
	*		Must hit '/login' first to authenticate
	*			- Follow setup in 'client.js'
	*		Most API endpoints use client info (client/location uuid)
	*		So, use '/client' to save that info for later use
	*
*/


// A couple boxes to push our API responses into
var clientData = {};
var topData = [];
var energyData = [];
var equipData = [];


// Hit this first to authenticate and get current data
app.get('/login', function (req,res){
	var data = c.login(function (data){
		console.log("YOU ARE AUTHENTICATED");
		res.send(data);
	});
});


//*****************************************
// ROOMS THAT ARE PRESENT BELOW
//  1) KITCHEN
//  2) SHOP
//  3) PCOMP
//	4) CLASSROOMS
//			a) ROOM 20
//*****************************************

//*****************************************
//
// 								KITCHEN
//
//*****************************************
app.get('/kitchen', function (req,res){

	//console.log('potato');

	var apiClient = c.apiCall('/api/client/', function (apiClient){

		var clientInfo = JSON.parse(apiClient);
		console.log(clientInfo);
		clientData.uuid = clientInfo[0].id;

		var kitchenLocationId = 'efa01903-ca25-4501-9920-d34fa61de5e9';

		equipmentObject.getEquipmentFromLocation(kitchenLocationId,res,c);

	});
});

//*****************************************
//
// 								SHOP
//
//*****************************************
// Go to this link to get data for shop
app.get('/shop', function (req,res){

	//console.log('potato');

	var apiClient = c.apiCall('/api/client/', function (apiClient){

		var clientInfo = JSON.parse(apiClient);
		console.log(clientInfo);
		clientData.uuid = clientInfo[0].id;

		var shopLocationId = 'b121b9e6-44e6-40b3-b787-ee667bfa084d';

		equipmentObject.getEquipmentFromLocation(shopLocationId,res,c);

	});
});

//*****************************************
//
// 								PCOMP
//
//*****************************************
app.get('/physComp', function (req,res){

	//console.log('potato');

	var apiClient = c.apiCall('/api/client/', function (apiClient){

		var clientInfo = JSON.parse(apiClient);
		console.log(clientInfo);
		clientData.uuid = clientInfo[0].id;

		var physCompLocationId = 'ce007293-7a34-4a61-80a1-d92312e6cfa9';
		equipmentObject.getEquipmentFromLocation(physCompLocationId,res,c);

	});
});

//*****************************************
//
// 					CLASSROOM -ROOM 20
//
//*****************************************
app.get('/room20', function (req,res){

	//console.log('potato');

	var apiClient = c.apiCall('/api/client/', function (apiClient){

		var clientInfo = JSON.parse(apiClient);
		console.log(clientInfo);
		clientData.uuid = clientInfo[0].id;

		var room20LocationId = '2b9e3545-b62f-4b9f-9053-254b99e14c9c';
		equipmentObject.getEquipmentFromLocation(room20LocationId,res,c);

	});
});

//*****************************************
//
// 					CLASSROOM -ROOM 15
//
//*****************************************
app.get('/room15', function (req,res){

	//console.log('potato');

	var apiClient = c.apiCall('/api/client/', function (apiClient){

		var clientInfo = JSON.parse(apiClient);
		console.log(clientInfo);
		clientData.uuid = clientInfo[0].id;

		var room15LocationId = 'd0b102ee-e0a4-40f6-9795-ab8745f0ef33';
		equipmentObject.getEquipmentFromLocation(room15LocationId,res,c);

	});
});

//*****************************************
//
// 					CLASSROOM -ROOM 50
//
//*****************************************
app.get('/room50', function (req,res){

	//console.log('potato');

	var apiClient = c.apiCall('/api/client/', function (apiClient){

		var clientInfo = JSON.parse(apiClient);
		console.log(clientInfo);
		clientData.uuid = clientInfo[0].id;

		var room50LocationId = '773eece8-c7c6-425a-9d4f-93a2c4954c66';
		equipmentObject.getEquipmentFromLocation(room50LocationId,res,c);

	});
});

//*****************************************
//
// 					CLASSROOM - MEETING ROOM
//
//*****************************************
app.get('/meetingRoom', function (req,res){

	//console.log('potato');

	var apiClient = c.apiCall('/api/client/', function (apiClient){

		var clientInfo = JSON.parse(apiClient);
		console.log(clientInfo);
		clientData.uuid = clientInfo[0].id;

		var meetingRoomLocationId = '80a0c045-1f6e-4b8c-96a3-5d2865ea5f6e';
		equipmentObject.getEquipmentFromLocation(meetingRoomLocationId,res,c);

	});
});


//*****************************************
//
// 					CLASSROOM - CONF ROOM
//
//*****************************************
app.get('/conferenceRoom', function (req,res){

	//console.log('potato');

	var apiClient = c.apiCall('/api/client/', function (apiClient){

		var clientInfo = JSON.parse(apiClient);
		console.log(clientInfo);
		clientData.uuid = clientInfo[0].id;

		var conferenceRoomLocationId = '4b6a1f2e-b40d-4cc6-8119-217259a75249';
		equipmentObject.getEquipmentFromLocation(conferenceRoomLocationId,res,c);

	});
});


// Start our server
var server = app.listen(process.env.PORT || 5000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('app listening at http://%s:%s', host, port);
});
