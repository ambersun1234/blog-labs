set title "Cursor Based Pagination multiple field benchmark testing"
set term png enhanced font 'Verdana,10'
set output 'benchmark-sort.png'
set xlabel "start index"
set ylabel "execution time(nanoseconds)"
set autoscale
set grid

plot 'benchmark-sort0.txt' using 1:2 with linespoints title 'without sort', \
'benchmark-sort1.txt' using 1:2 with linespoints title 'sort 1 field', \
'benchmark-sort2.txt' using 1:2 with linespoints title 'sort 2 field' \