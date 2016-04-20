var moment = require('moment');
/******************************************************
FILE TO GET THE DATA ON ITP FLOOR GIVEN A TIME RANGE
******************************************************/
// Depending on the time entered by the person, the api will call the proper time intervals
// if <= 2 days - run in minutes only
// if > 2 days and <= 7 days - run in 15 min + min
// if > 7 days and <= 100 days - run in hours + 15 min(?) + min
// if > 100 days and <= 1 yr - run in days

//Caveats :
// For 'day' the API runs from 4/5 AM UTC
// For 'hour' the API runs from 00:00 of the hour starting after current time. I
// I.e if you want to run from 23:12 - 9:07 next day, it will give data only for 23:00 - 9:00
// For '15min' the API runs from the start time minute, but only till the 15 min block ends. I.e, if you run 15 min for a 20 min block, it will give data only of the first 15 minutes.
// ADDITIONAL Caveat - Although 15 min runs from the start time, it WILL NOT give data unless it starts at 00,15,30,45
// 'min' is peaceful.

module.exports = {

  getFloorOverAllEnergy: function(startTime, endTime, locationId,c,res)
  {
    console.log('in here -- getting floor data');

    var startTimeFormatted = startTime.toString().substring(0,19)+'Z';
    var endTimeFormatted = endTime.toString().substring(0,19)+'Z';

    var endTime = moment(new Date(endTime)); //todays date
    var startTime = moment(new Date(startTime)); // another date

    var duration = moment.duration(endTime.diff(startTime));

    var hourDiff = duration.asHours();
    var minDiff = duration.asMinutes();
    var secDiff = duration.asSeconds();

    console.log('time difference is -- hours -- ' + hourDiff + ' : min -- ' + minDiff + ' : sec -- ' + secDiff);

    /*****************************************
        if <= 2 days - run in minutes only
    *****************************************/
    if(minDiff <= 2880)
    {
      var detailOfRoomUrl = '/api/location/' + locationId + '/data/?fromTime=' + startTimeFormatted +'&toTime='+ endTimeFormatted + '&interval=min&cost=false';
      //
      var roomData = c.apiCall(detailOfRoomUrl, function(roomData){
        //console.log(roomData);
        res.send(roomData);
    	});
    }
    /*****************************************
    if > 2 days and <= 7 days - run in 15 min + min
    *****************************************/
    else if(minDiff > 2880 && minDiff<=10080 )
    {
      var detailOfRoomUrl = [];
      var fullRoomData = [];
      var roomData ;
      var noComplete = 0;
      var orgStartTime = startTime;
      var orgStartTimeFormatted = orgStartTime.toISOString().substring(0,19)+'Z'
      var orgEndTime = endTime;

      // data in 15 min
      var minTemp = startTime.get('minute');
      if(minTemp>0&&minTemp<=15)
      {
        startTime.minutes(15);
      }
      else if(minTemp>15&&minTemp<=30)
      {
        startTime.minutes(30);
      }
      else if(minTemp>30&&minTemp<=45)
      {
        startTime.minutes(45);
      }
      else if(minTemp>45)
      {
        startTime.minutes(0);
        startTime.add(1,'hour');
      }

      startTimeFormatted = startTime.toISOString().substring(0,19)+'Z';

      console.log(' -- ' + startTimeFormatted + ' -- ' + endTimeFormatted + ' -- ');
      console.log(' -- ' + orgStartTimeFormatted + ' -- ' + startTimeFormatted + ' -- ');

      detailOfRoomUrl[0] = '/api/location/' + locationId + '/data/?fromTime=' + startTimeFormatted +'&toTime='+ endTimeFormatted + '&interval=15min&cost=false';
      //data in 1 min for the beginning data
      detailOfRoomUrl[1] = '/api/location/' + locationId + '/data/?fromTime=' + orgStartTimeFormatted +'&toTime='+ startTimeFormatted + '&interval=min&cost=false';
      for(var i=0;i<detailOfRoomUrl.length;i++)
      {
        roomData = c.apiCall(detailOfRoomUrl[i], function(roomData){
          //console.log(roomData);
          noComplete++;
          fullRoomData.push(roomData);
          //res.send(roomData);
          if(noComplete == 2)
          {
            console.log('yaay'+noComplete);
            console.log(fullRoomData[0]);
            var a = JSON.parse(fullRoomData[0]);
            var b = JSON.parse(fullRoomData[1]);
            //console.log(a.data);
            a.data = b.data.concat(a.data);
            res.send(a);
          }
          else
          {
            console.log('not yet complete'+noComplete);
          }
      	});


      }


      console.log('MATHURA');
      console.log(startTimeFormatted);

    }
    /*****************************************
    if > 7 days and <= 100 days - run in hours + 15 min(?) + min
    *****************************************/
    else if(hourDiff > 168 && hourDiff <= 2400 )
    {
      var detailOfRoomUrl = '/api/location/' + locationId + '/data/?fromTime=' + startTimeFormatted +'&toTime='+ endTimeFormatted + '&interval=hour&cost=false';
      //
      var roomData = c.apiCall(detailOfRoomUrl, function(roomData){
        //console.log(roomData);
        res.send(roomData);
    	});
    }
    /*****************************************
      if > 100 days and <= 1 yr - run in days
    *****************************************/
    else if(hourDiff > 2400 && hourDiff <= 45260 )
    {
      var detailOfRoomUrl = '/api/location/' + locationId + '/data/?fromTime=' + startTimeFormatted +'&toTime='+ endTimeFormatted + '&interval=day&cost=false';
      //
      var roomData = c.apiCall(detailOfRoomUrl, function(roomData){
        //console.log(roomData);
        res.send(roomData);
    	});
    }
    else
    {
      res.send(1);
    }
  }
};


/****************
sa= moment.utc(new Date('2016-04-15T23:41:18Z'));
a = a.toISOString();
//a = a.get('hour');
//a = a.add(1,'hour');

//a = a.get('minute');
document.getElementById('hi').innerHTML = a;

 ***************/
