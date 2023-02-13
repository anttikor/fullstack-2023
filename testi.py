import requests
import xml.etree.ElementTree as ET

# Define the base URL and parameters
base_url = "http://opendata.fmi.fi/wfs?"
parameters = {"parameters": "WindSpeedMS", "place": "kuopio"}

# Calculate the start and end times for the past 7 days
from datetime import datetime, timedelta
end_time = datetime.now()
start_time = end_time - timedelta(days=7)

# Format the start and end times as strings in the correct format
start_time_str = start_time.strftime("%Y-%m-%dT%H:%M:%SZ")
end_time_str = end_time.strftime("%Y-%m-%dT%H:%M:%SZ")

# Add the start and end times to the parameters
parameters["starttime"] = start_time_str
parameters["endtime"] = end_time_str

# Make the request and get the response
response = requests.get(base_url, params=parameters)

# Parse the XML response
root = ET.fromstring(response.text)

# Extract the wind speed data from the response
for data in root.iter("{http://www.opengis.net/gml/3.2}doubleOrNilReasonTupleList"):
    wind_speed_data = data.text.strip().split(" ")

# Print the wind speed data
print(wind_speed_data)
