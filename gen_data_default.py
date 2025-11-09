import csv
import random
import time
import os
from datetime import datetime

# def post_data():


# Define CPU architectures and their characteristics
cpu_profiles = {
    "Intel i3": {"base_power": 15, "cpu_coeff": 0.25, "mem_coeff": 0.1},
    "Ryzen 5":  {"base_power": 25, "cpu_coeff": 0.35, "mem_coeff": 0.15},
    "Intel i7": {"base_power": 30, "cpu_coeff": 0.45, "mem_coeff": 0.2}
}

output_file = "cpu_memory_power_data.csv"

# If file doesn't exist, create it with a header
if not os.path.exists(output_file):
    with open(output_file, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["Timestamp", "CPU_Architecture", "CPU_Usage(%)", "Memory_Usage(%)", "Power_Consumption(W)"])


try:
    while True:
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        with open(output_file, mode="a", newline="") as file:
            writer = csv.writer(file)

            for cpu_name, params in cpu_profiles.items():
                # Simulate CPU and memory usage
                cpu_usage = random.uniform(5, 95)
                mem_usage = max(0, min(100, cpu_usage * random.uniform(0.7, 1.2) + random.uniform(-10, 10)))

                # Compute realistic power consumption
                power = (
                    params["base_power"]
                    + params["cpu_coeff"] * cpu_usage
                    + params["mem_coeff"] * mem_usage
                    + random.gauss(0, 2)
                )

                row = [timestamp, cpu_name, round(cpu_usage, 2), round(mem_usage, 2), round(power, 2)]
                writer.writerow(row)

                # Print to console for visibility
                print(f"[{timestamp}] {cpu_name} | CPU: {cpu_usage:.1f}% | MEM: {mem_usage:.1f}% | Power: {power:.2f} W")

        # Wait 1 minute before next reading
        time.sleep(60)

except KeyboardInterrupt:
    print("\n Data generation stopped by user.")

