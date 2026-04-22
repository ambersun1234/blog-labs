set title "PostgreSQL Connection Pool: Queuing Analysis (Concurrent)" font "Verdana,14,Bold"
set term pngcairo size 1000,600 enhanced font 'Verdana,10'
set output 'concurrent-benchmark.png'

set datafile separator whitespace
set grid y lc rgb "#e0e0e0" lt 1
set border 3 back lc rgb "#555555"
set tics nomirror

set ylabel "Execution Time (nanoseconds)"
set xlabel "Sequence (Sorted per 10 requests)"

set autoscale x
set offset 0, 0, 0, 0

do for [i=0:10] {
    if (i % 2 == 1) {
        set object i+1 rect from (i*10 + 0.5), graph 0 to (i*10 + 10.5), graph 1 \
        fc rgb "#f0f0f0" fs solid 1.0 noborder behind
    }
}

process_cmd = "< awk '{print int((NR-1)/10), $2}' conn.txt | sort -k1,1n -k2,2n | awk '{print NR, $2}'"

stats process_cmd using 2 name "S" nooutput

if (exists("S_mean")) {
    plot process_cmd using 1:($2/1e6) with impulses lc rgb "#a0b0ff" notitle, \
         process_cmd using 1:($2/1e6) with points pt 7 ps 0.6 lc rgb "#4060c0" title 'Request Latency (Group Sorted)' 
} else {
    print "Error: Data processing failed. Make sure 'conn.txt' is in the current directory."
}