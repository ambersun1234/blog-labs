set title "Golang Garbage Collection STW(Stop-The-World) Time"
set term png enhanced font 'Verdana,10'
set output './golang-gc-swt.png'
set xlabel "Goroutine Count"
set ylabel "STW(Stop-The-World) Time(nanoseconds)"
set autoscale
set grid

plot \
'./gc-benchmark.txt' using 1:5 with linespoints title 'STW Time(Flood GC)', \
'./gc-greentea-benchmark.txt' using 1:5 with linespoints title 'STW Time(GreenTea GC)'