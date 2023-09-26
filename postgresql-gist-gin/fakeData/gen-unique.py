import os
import csv

unique_name = set()
root = 'path/to/names'

# downloads name list from https://www.ssa.gov/oact/babynames/names.zip

for file in os.listdir(root):
    with open(os.path.join(root, file), 'r') as f:
        for line in f:
            split = line.split(',')
            unique_name.add(split[0])

with open('unique.csv', 'w') as f:
    writer = csv.writer(f)

    for name in unique_name:
        writer.writerow([name, name, name, name])