import argparse
import random
import string
from datetime import datetime, timedelta

def generate_random_string(length=10):
    return ''.join(random.choices(string.ascii_letters, k=length))

def generate_random_timestamp():
    start = datetime(2023, 1, 1)
    end = datetime(2026, 12, 31)
    delta = end - start
    random_days = random.randrange(delta.days)
    random_seconds = random.randrange(86400)
    random_millis = random.randrange(1000)
    dt = start + timedelta(days=random_days, seconds=random_seconds)
    return dt.strftime(f"%Y-%m-%d %H:%M:%S.{random_millis:03d}")

def main():
    parser = argparse.ArgumentParser(description="Generate mock CSV data matching the format.")
    parser.add_argument("--count", type=int, required=True, help="Number of rows to generate")
    parser.add_argument("--output", type=str, required=True, help="Output file path")
    
    args = parser.parse_args()
    
    row_id = 0
    with open(args.output, "w", encoding="utf-8") as f:
        for i in range(args.count):
            row_id = row_id + 1
            random_str = generate_random_string(10)
            timestamp = generate_random_timestamp()
            f.write(f"{row_id},{random_str},{timestamp}\n")

if __name__ == "__main__":
    main()