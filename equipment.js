module.exports = {

  getEquipmentFromLocation: function(shopLocationId,res,c)
  {

    var that = this;
    var equipmentResponse = [];
    var equipmentIds = [];
    var equipFromSublocationUrl = '/api/sublocation/'+ shopLocationId +'/equipment/';

    var noOfHours = 24;

    var endTime = new Date();
    //endTime.setHours(23);
    //endTime.setMinutes(0);
    endTime.setSeconds(0);

    //	var endTime = new Date(2016,03,10,23,00,00);
    var endTimeFormatted = endTime.toISOString().substring(0,19)+'Z';

    var startTime =  new Date( endTime.getTime() - noOfHours*60*60*1000);
    var startTimeFormatted = startTime.toISOString().substring(0,19)+'Z';
    console.log('the time that is showing is')
    console.log(startTimeFormatted);
    console.log(endTimeFormatted);

    var equipmentsInShop = c.apiCall(equipFromSublocationUrl, function(equipmentsInShop){
      var parsedData = JSON.parse(equipmentsInShop);
      var equipmentLength = parsedData.length;


      for(var i=0;i<parsedData.length;i++)
      {
        equipmentIds[i] = parsedData[i]["id"];
        that.getEquipmentData(i, equipmentIds[i],c,equipmentResponse,equipmentLength,res, startTimeFormatted, endTimeFormatted
        );
      }
    });
  },

  sayHello: function() {
    console.log('saying hello');
  },

  getEquipmentData: function(index, equipmentId, c, equipmentResponse, noOfEquipments,res, startTimeFormatted, endTimeFormatted)
  {
	  var detailOfEquipmentUrl = '/api/equipment/' + equipmentId + '/data/?fromTime=' + startTimeFormatted +'&toTime='+ endTimeFormatted + '&interval=min&cost=false';

    var equipmentData = c.apiCall(detailOfEquipmentUrl, function(equipmentData){
  		var parsedData = JSON.parse(equipmentData);
      //console.log(parsedData);
      if(parsedData.data.length>0)
      {
    		var keyName =  Object.keys(parsedData.data[0])[1];
        console.log('obtaining data for -- ' + keyName );

        var equipmentEnergy = [];
        var totalEnergyOffPeak = 0;
        var totalEnergyPeak = 0;
        for(var i =0;i<parsedData.data.length;i++)
        {
          equipmentEnergy[i] = {x:i,y:parsedData.data[i][keyName]*1000};
          if(i%96<40)
          {
            totalEnergyOffPeak += parsedData.data[i][keyName]*1000;
          }
          else
          {
            totalEnergyPeak += parsedData.data[i][keyName]*1000;
          }

        }

        equipmentResponse.push({name:keyName,value: equipmentEnergy,totalEnergyOffPeak: totalEnergyOffPeak, totalEnergyPeak: totalEnergyPeak});

      }
      else{

      }

      if(equipmentResponse.length == noOfEquipments)
      {
        res.send(equipmentResponse);
      }
      else{

      }

  	});


  }
};
