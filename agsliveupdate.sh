#!/usr/bin/env bash

trap 'echo "Killing ags" && ags quit 2>/dev/null' SIGINT

nix-shell -p inotify-tools dart-sass --run '
  function execute() {
    clear
    echo "Config changed, relaunching ags ($1)"
    ags quit
    ags run -d $PWD &
  }

  ags quit 2>/dev/null
  ags run -d $PWD &
  inotifywait --event modify --recursive --monitor ./ --exclude .git/ \
  | while read changed; do
    execute "$changed"
  done
'
