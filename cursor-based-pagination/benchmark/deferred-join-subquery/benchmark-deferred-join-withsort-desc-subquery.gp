set title "Deferred Join Subquery with order DESC benchmark testing"
set term png enhanced font 'Verdana,10'
set output 'benchmark-deferred-join-withsort-desc-subquery.png'
set xlabel "start index"
set ylabel "execution time(nanoseconds)"
set autoscale
set grid

plot 'deferred-join-subquery-pi-withsort-desc-benchmark.txt' using 1:2 with linespoints title 'deferred join with primary index', \
'deferred-join-subquery-si-withsort-desc-benchmark.txt' using 1:2 with linespoints title 'deferred join with secondary index'
