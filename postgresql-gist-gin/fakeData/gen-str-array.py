import os
import csv
import random
from multiprocessing import Process

unique_name = set()
root = 'path/to/names'

# downloads name list from https://www.ssa.gov/oact/babynames/names.zip

for file in os.listdir(root):
    with open(os.path.join(root, file), 'r') as f:
        for line in f:
            split = line.split(',')
            unique_name.add(split[0])

def gen(round, target):
    with open(target, 'w') as f:
        writer = csv.writer(f, quoting=csv.QUOTE_MINIMAL)

        for i in range(100000):
            row_set = set()
            while len(row_set) < round:
                row_set.add(random.choice(tuple(unique_name)))
            final_str = '{'
            for name in row_set:
                final_str += f'"{name}",'
            final_str = final_str[:-1]
            final_str += '}'
            writer.writerow([final_str])

p1 = Process(target=gen, args=(10, 'str-array.csv'))
p2 = Process(target=gen, args=(20, 'str-array-large.csv'))

p1.start()
p2.start()

p1.join()
p2.join()