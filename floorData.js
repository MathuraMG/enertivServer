/******************************************************
FILE TO GET THE DATA ON ITP FLOOR GIVEN A TIME RANGE
******************************************************/
module.exports = {

  getFloorOverAllEnergy: function(startTimeFormatted, endTimeFormatted, locationId,c,res)
  {
    console.log('in here -- getting floor data');
    var detailOfRoomUrl = '/api/location/' + locationId + '/data/?fromTime=' + startTimeFormatted +'&toTime='+ endTimeFormatted + '&interval=min&cost=false';
    //
    var roomData = c.apiCall(detailOfRoomUrl, function(roomData){
      console.log(roomData);
      res.send(roomData);
  	});
  }
};
