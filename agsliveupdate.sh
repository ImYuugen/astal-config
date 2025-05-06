#!/usr/bin/env bash

trap 'echo "Killing ags" && ags quit 2>/dev/null' SIGINT

nix-shell -p inotify-tools --run '
  function execute() {
    clear
    echo "Config changed, relaunching ags ($1)"
    ags quit
    ags run . &
  }

  ags quit 2>/dev/null
  ags run . &
  inotifywait --event modify --recursive --monitor ./ --exclude "\.git/|\.direnv/" \
  | while read changed; do
    execute "$changed"
  done
'
