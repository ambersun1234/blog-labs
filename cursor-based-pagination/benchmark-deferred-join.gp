set title "Deferred Join benchmark testing"
set term png enhanced font 'Verdana,10'
set output 'benchmark-deferred-join.png'
set xlabel "start index"
set ylabel "execution time(nanoseconds)"
set autoscale
set grid

plot 'deferred-join-page-benchmark.txt' using 1:2 with linespoints title 'offset based', \
'deferred-join-cursor-benchmark.txt' using 1:2 with linespoints title 'cursor based', \
'deferred-join-pi-benchmark.txt' using 1:2 with linespoints title 'deferred join with primary index', \
'deferred-join-si-benchmark.txt' using 1:2 with linespoints title 'deferred join with secondary index'
