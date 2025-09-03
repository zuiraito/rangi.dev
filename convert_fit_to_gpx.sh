#!/bin/bash

# Get the directory of the script
DIR="$(dirname "$0")"

# Loop over all .fit files in that directory
for f in "$DIR"/*.fit; do
    # Skip if no .fit files exist
    [ -e "$f" ] || continue
    gpsbabel -i garmin_fit -f "$f" -o gtrnctr -F "${f%.fit}.tcx"
done

