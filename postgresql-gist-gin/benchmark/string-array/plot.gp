set title "PostgreSQL Array Overlap Index Benchmark - 10w data with size 10"
set term png enhanced font 'Verdana,10'
set output './benchmark/string-array/benchmark-string-array.png'
set xlabel "iteration"
set ylabel "execution time(nanoseconds)"
set autoscale
set grid

plot \
'./benchmark/string-array/benchmark-string-array.txt' using 1:2 with linespoints title 'No index', \
'./benchmark/string-array/benchmark-string-array.txt' using 1:3 with linespoints title 'GIST index', \
'./benchmark/string-array/benchmark-string-array.txt' using 1:4 with linespoints title 'GIN index'