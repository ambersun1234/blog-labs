set title "PostgreSQL Golang Connection Pool benchmark testing"
set term png enhanced font 'Verdana,10'
set output 'benchmark.png'
set xlabel "iteration"
set ylabel "execution time(nanoseconds)"
set autoscale
set grid

plot 'pool.txt' using 1:2 with linespoints title 'connection pool', \
'nopool.txt' using 1:2 with linespoints title 'non connection pool'