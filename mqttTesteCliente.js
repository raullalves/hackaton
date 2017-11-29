var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')
 
client.on('connect', function () {
  client.publish('mqtt/hackaton/enviar/id5', '-23.5505199;-46.6333094')
  client.subscribe('mqtt/hackaton/receber/#')
})
 
client.on('message', function (topic, message) {
    console.log(message.toString())
    
    client.end()
})
