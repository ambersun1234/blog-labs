set title "PostgreSQL Fuzzy Search Index Benchmark - 10w unique data"
set term png enhanced font 'Verdana,10'
set output 'benchmark-unique.png'
set xlabel "iteration"
set ylabel "execution time(nanoseconds)"
set autoscale
set grid

plot \
'benchmark-unique.txt' using 1:2 with linespoints title 'No index', \
'benchmark-unique.txt' using 1:3 with linespoints title 'Secondary index', \
'benchmark-unique.txt' using 1:4 with linespoints title 'GIST index', \
'benchmark-unique.txt' using 1:5 with linespoints title 'GIN index'