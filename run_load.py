import csv
import random
import time
import os
from datetime import datetime

# CPU architecture characteristics
cpu_profiles = {
    "Intel i3": {"base_power": 15, "cpu_coeff": 0.3, "mem_coeff": 0.12},
    "Ryzen 5":  {"base_power": 25, "cpu_coeff": 0.4, "mem_coeff": 0.18},
    "Intel i7": {"base_power": 30, "cpu_coeff": 0.5, "mem_coeff": 0.25}
}

output_file = "cpu_memory_power_high_load.csv"

# If file doesn't exist, create it with a header
if not os.path.exists(output_file):
    with open(output_file, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["Timestamp", "CPU_Architecture", "CPU_Usage(%)", "Memory_Usage(%)", "Power_Consumption(W)"])

print("🔥 Starting HIGH LOAD data generation (CPU & Memory 70–100%). Press Ctrl+C to stop.\n")

try:
    while True:
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        with open(output_file, mode="a", newline="") as file:
            writer = csv.writer(file)

            for cpu_name, params in cpu_profiles.items():
                # Simulate high CPU and memory usage (70–100%)
                cpu_usage = random.uniform(70, 100)

                # Memory usage is correlated but can slightly vary
                mem_usage = max(70, min(100, cpu_usage * random.uniform(0.9, 1.1) + random.uniform(-5, 5)))

                # Compute power usage — higher sensitivity at high loads
                power = (
                    params["base_power"]
                    + params["cpu_coeff"] * cpu_usage
                    + params["mem_coeff"] * mem_usage
                    + random.gauss(0, 2)
                )

                row = [timestamp, cpu_name, round(cpu_usage, 2), round(mem_usage, 2), round(power, 2)]
                writer.writerow(row)

                print(f"[{timestamp}] {cpu_name} | CPU: {cpu_usage:.1f}% | MEM: {mem_usage:.1f}% | Power: {power:.2f} W")

        # Wait for 1 minute before next reading
        time.sleep(60)

except KeyboardInterrupt:
    print("\n Data generation stopped by user.")
