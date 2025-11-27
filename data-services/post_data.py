import requests
import json
import random

def serialize_payload(data):
    # data= [timestamp, cpu_name, round(cpu_usage, 2), round(mem_usage, 2), round(power, 2)]
    payload = {    "json": {
        "organization_id":24,
        "server_name": random.choice(["production-web-server-01","production-web-server-02","production-web-server-03"]),
        "cpu_architecture":data[1],
        "cpu_utilization":data[2],
        "memory_utilization":data[3],
        "power_consumption":data[4]
            }
        }

    
    payload= json.dumps(payload,default=str, indent=4)
    return payload
    

def send_data(data=None):
    # data=["2025-11-08 23:54:51","Intel i7", 81.9 , 80.6 ,91.20]

    payload=serialize_payload(data=data)

    url="http://10.1.10.240:3000/api/trpc/webhook.server"

    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text)


# send_data() 

