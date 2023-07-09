set title "Cursor Based Pagination benchmark testing"
set term png enhanced font 'Verdana,10'
set output 'benchmark.png'
set xlabel "start index"
set ylabel "execution time(nanoseconds)"
set autoscale
set grid

plot 'slow-benchmark.txt' using 1:2 with linespoints title 'offset based', \
'fast-benchmark.txt' using 1:2 with linespoints title 'cursor based'