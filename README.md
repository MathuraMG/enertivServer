# enertiv server

A custom-made enertiv server to get the required data from enertiv into a phonegap app.

##List of API

#### /login?loginId=

Need to go into this at the start of any session
requires a loginId, please mail mmg542@nyu.edu if you would like access to these APIs

#### /floordata_itp

######Inputs

startTime - this need to be in the following format - 2016-04-20T21:41:18 - this is a compulsory ip
sublocationid - this can be the id of a specific room - not compulsory ( comma separated if you are sending multiple ids )
equipmentId - this can be the id of a specific equipment - not compulsory ( comma separated if you are sending multiple ids )
if equipmentId and subocationId are not present, it will automatically give floor numbers.

######Output

Data - time vs power
Total Energy in given time period

######Examples

http://localhost:5000/floordata_itp?startTime=2016-04-20T21:41:18&equipmentId=db954f1c-7602-45c9-85ae-55d555dced75
http://localhost:5000/floordata_itp?startTime=2016-04-20T21:41:18&sublocationId=ce007293-7a34-4a61-80a1-d92312e6cfa9
http://localhost:5000/floordata_itp?startTime=2016-04-20T21:41:18

The original clientjs code was developed by John Farell and can be found here - https://github.com/jefarrell/EnertivAPI
