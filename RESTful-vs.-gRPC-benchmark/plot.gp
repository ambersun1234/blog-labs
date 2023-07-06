set title "RESTful API vs. gRPC speed benchmark testing"
set term png enhanced font 'Verdana,10'
set output 'benchmark.png'
set xlabel "iteration"
set ylabel "execution time(nanoseconds)"
set autoscale
set grid

plot 'benchmark.txt' using 1:2 with linespoints title 'gRPC', \
'benchmark.txt' using 1:3 with linespoints title 'rest'