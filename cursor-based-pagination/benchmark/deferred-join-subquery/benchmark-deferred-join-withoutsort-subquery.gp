set title "Deferred Join Subquery without order benchmark testing"
set term png enhanced font 'Verdana,10'
set output 'benchmark-deferred-join-withoutsort-subquery.png'
set xlabel "start index"
set ylabel "execution time(nanoseconds)"
set autoscale
set grid

plot 'deferred-join-subquery-pi-withoutsort-benchmark.txt' using 1:2 with linespoints title 'deferred join with primary index', \
'deferred-join-subquery-si-withoutsort-benchmark.txt' using 1:2 with linespoints title 'deferred join with secondary index'
