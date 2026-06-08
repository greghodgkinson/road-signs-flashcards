#!/bin/sh

set -eu

SOURCE="${1:-original/Learnership road.pdf}"
OUTPUT="${2:-public/signs/learnership}"
TMP="${TMPDIR:-/tmp}/learnership-road-signs.png"

mkdir -p "$OUTPUT"
pdftoppm -png -r 300 -f 1 -singlefile "$SOURCE" "${TMP%.png}"

# Coordinates are measured from the 300 DPI rendering. The top strip in each
# cell contains the question number, so crops begin below it.
crop() {
  number="$1"
  x="$2"
  y="$3"
  width="$4"
  height="$5"
  sips --cropToHeightWidth "$height" "$width" --cropOffset "$y" "$x" \
    "$TMP" --out "$OUTPUT/sign-$number.png" >/dev/null
}

# Regular eight-column rows: questions 1-38.
n=1
for row in 0 1 2 3; do
  for col in 0 1 2 3 4 5 6 7; do
    crop "$n" "$((78 + col * 290))" "$((129 + row * 367))" 270 310
    n=$((n + 1))
  done
done

# Compound and irregular cells in the final four rows.
crop 33 78 1597 270 310
crop 34 368 1597 270 310
crop 35 658 1597 270 310
crop 36 948 1597 560 310
crop 37 1528 1597 560 310
crop 38 2190 1597 270 310
crop 39 78 1966 560 310
crop 39a 78 1966 270 310
crop 39b 368 1966 270 310
crop 40 658 1966 270 310
crop 41 948 1966 560 310
crop 41a 948 1966 270 310
crop 41b 1238 1966 270 310
crop 42 1528 1966 270 310
crop 43 1818 1966 270 310
crop 44 2108 1966 270 310
crop 45 78 2334 270 310
crop 46 368 2334 560 310
crop 46a 368 2334 270 310
crop 46b 658 2334 270 310
crop 47 948 2334 560 310
crop 47a 1020 2334 75 310
crop 47b 1095 2334 75 310
crop 47c 1170 2334 75 310
crop 47d 1245 2334 75 310
crop 47e 1320 2334 75 240
crop 47f 1395 2334 100 310
crop 48 1528 2334 270 310
crop 49 1818 2334 270 310
crop 50 2108 2334 270 310
crop 51 78 2702 270 310
crop 52 368 2702 270 310
crop 53 658 2702 270 310
crop 54 948 2702 270 310
crop 55 1238 2702 560 310
crop 56 1818 2702 270 310
crop 57 2108 2702 270 310
crop 58 78 3070 270 310
crop 59 368 3070 270 310
crop 60 658 3070 270 310
crop 61 948 3070 270 310
crop 62 1238 3070 850 310

rm -f "$TMP"
echo "Extracted learnership signs and grouped-sign variants to $OUTPUT"
