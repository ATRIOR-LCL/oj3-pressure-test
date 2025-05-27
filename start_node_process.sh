#!/bin/sh

# 设置要启动的进程数量
PROCESS_COUNT=10

i=1
while [ "$i" -le "$PROCESS_COUNT" ]; do
  echo "Starting node index process #$i..."
  node index > "output_$i.log" 2>&1 &
  i=`expr $i + 1`
done



echo "All $PROCESS_COUNT node processes started in the background."
