var mqtt = require('mqtt')
var request = require('ajax-request');
var servidor  = mqtt.connect('tcp://127.0.0.1:1883')
 
servidor.on('connect', function () {
  servidor.subscribe('mqtt/hackaton/enviar/#')
})
 
servidor.on('message', function (topic, message) {
  console.log(message)
  var messageArray = message.toString().split(";")
  var latitude = messageArray[0]
  var longitude = messageArray[1]
  console.log("Latitude recebida = "+latitude)
  console.log("Longitude recebida = "+longitude)

  var topicArray = topic.toString().split("/")
  topicArray[2] = "receber"
  var topicReceber = topicArray[0]+"/"+topicArray[1]+"/"+topicArray[2]+"/"+topicArray[3]
  
  var urlGet = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&APPID=7e971e70f53fdfbf312f38bfef0772c4";
  //console.log(urlGet)
  request({ 
    method: 'GET', 
    url: urlGet, 
    
  }, function(err, res, body){
    var jsonPrased = JSON.parse(body.toString())
    var temperatura = jsonPrased.main.temp - 273.15
    var pressao = jsonPrased.main.pressure
    var umidade = jsonPrased.main.humidity
    console.log("temperatura = "+Math.round(temperatura*10)/10)
    console.log("pressao = "+pressao)
    console.log("umidade = "+umidade)
  });
  
  servidor.publish(topicReceber, 'nao irrigue')

})