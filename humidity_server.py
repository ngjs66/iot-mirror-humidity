# Import libraries
import time
from datetime import datetime
#import board                       # Board module - for CircuitPython to identify boards
import adafruit_dht                 # Adafruit library for reading DHT series sensors
from influxdb import InfluxDBClient 

# Declaration and initialization 
pin = 27    # GPIO pin number 
dhtDevice = adafruit_dht.DHT22(pin) 

# Logging data to InfluxDB
def send_to_influxdb(measurement, season, humidity, temperature): # take out timestamp
    payload = [
         {"measurement": measurement,
             "tags": {
                 "season": season,
              },
              #"time": timestamp,
              "fields": {
                  "humidity": humidity,
                  "temperature" : temperature
              }
          }
        ]
    client.write_points(payload)

# Read sensor (CircuitPython)
while True:
    try:
        # Print the values to console
        temperature = dhtDevice.temperature
        humidity = dhtDevice.humidity
        
        print("Temperature: {:.1f}°C".format(temperature))
        print("Humidity: {}%".format(humidity))
        print()
    except RuntimeError as error:
        # Errors happen fairly often, DHT's are hard to read, just keep going
        print(error.args[0])
        time.sleep(2.0)     # needs 2 seconds to collect reading (0.5Hz sampling rate)
        continue
    except Exception as error:
        dhtDevice.exit()
        raise error
    # Set up InfluxDB
    host = 'localhost'  # Change to RasPi ip
    port = 8086
    username = 'grafana'   # Grant admin privileges to Grafana: user 
    password = 'grafana' # and password.
    db = 'readings'  

    # InfluxDB client to write to
    client = InfluxDBClient(host, port, username, password, db)

    measurement = "sensor_data"  
    season = "summer"  
    timestamp = datetime.now() 
    print(timestamp)
    # Log the data
    send_to_influxdb(measurement, season, humidity, temperature) # params sequence MUST follow declaration
    print("Sending Data from RasPi to database")                 # take out timestamp
    print()
    # Notify polling time 
    print("Please wait 30 minutes for next reading")
    print("=======================================")
    print()
    
    time.sleep(1800) # wait 30 mins before collecting reading
    


