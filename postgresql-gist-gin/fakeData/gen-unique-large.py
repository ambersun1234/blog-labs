import os
import csv

unique = set()
root = 'path/to/names'

# downloads name list from https://www.ssa.gov/oact/babynames/names.zip

for file in os.listdir(root):
    with open(os.path.join(root, file), 'r') as f:
        for line in f:
            split = line.split(',')
            name = split[0]

            for i in range(len(name)):
                shuffled_name = name[i:] + name[:i]
                unique.add(shuffled_name)

with open('unique-large.csv', 'w') as f:
    writer = csv.writer(f)

    counter = 1
    for name in unique:
        writer.writerow([name, name, name, name])