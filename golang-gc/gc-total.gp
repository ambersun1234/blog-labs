set title "Golang Garbage Collection Total GC Time"
set term png enhanced font 'Verdana,10'
set output './golang-gc-total.png'
set xlabel "Goroutine Count"
set ylabel "Total GC Time(nanoseconds)"
set autoscale
set grid

plot \
'./gc-benchmark.txt' using 1:2 with linespoints title 'Total GC Time(Flood GC)', \
'./gc-greentea-benchmark.txt' using 1:2 with linespoints title 'Total GC Time(GreenTea GC)'