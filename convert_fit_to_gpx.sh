#!/bin/bash

DIR="$(dirname "$0")"

ARCHIVE="$DIR/fit archive"
mkdir -p "$ARCHIVE"

for f in "$DIR"/*.fit; do
    [ -e "$f" ] || continue

    gpsbabel -i garmin_fit -f "$f" -o gtrnctr -F "${f%.fit}.tcx"

    if [ -f "${f%.fit}.tcx" ]; then
        mv "$f" "$ARCHIVE/"
    fi
done
