set title "Golang Goroutine Memory Footprint"
set term png enhanced font 'Verdana,10'
set output './golang-memory.png'
set xlabel "Goroutine Count"
set ylabel "Memory Footprint"
set autoscale
set grid

plot \
'./gc-benchmark.txt' using 1:3 with linespoints title 'Heap(Flood GC)', \
'./gc-greentea-benchmark.txt' using 1:3 with linespoints title 'Heap(GreenTea GC)', \
'./gc-benchmark.txt' using 1:4 with linespoints title 'Stack(Flood GC)', \
'./gc-greentea-benchmark.txt' using 1:4 with linespoints title 'Stack(GreenTea GC)'