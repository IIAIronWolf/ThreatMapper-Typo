#!/bin/bash
DEEPFENCE_URL=
DEEPFENCE_APIKEY=
DF_DEEPFENCE_CTL_PATH="${DF_DEEPFENCE_CTL_PATH:-../../deepfence_ctl}"
DF_BENCH_COUNT="${DF_BENCH_COUNT:-5}"
DEEPFENCE_URL=$DEEPFENCE_URL DF_DEEPFENCE_CTL_PATH=$DF_DEEPFENCE_CTL_PATH DEEPFENCE_APIKEY=$DEEPFENCE_APIKEY go run ./main.go -bench $DF_BENCH_COUNT

