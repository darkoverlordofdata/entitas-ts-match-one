#!/usr/bin/env bash
exit


mkdir sm
for i in frame-*.png; do convert $i -scale 10% sm/$i; done


TexturePacker --png-opt-level 0 --algorithm "Basic" \
              --disable-rotation --trim-mode "None" \
              --format "json" --data monster.json   \
              --sheet monster.png                   \
              sources/monster/Transparent\ PNG/flying/sm/*