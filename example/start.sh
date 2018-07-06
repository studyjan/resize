#!/usr/bin/env bash

trap 'pkill dnsmasq; nginx -s stop; exit' SIGINT SIGTERM STOP

dnsmasq -u root
nginx -g 'daemon off;' &
sleep_pid=$!
wait
