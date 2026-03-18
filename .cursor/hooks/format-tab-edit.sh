#!/bin/bash

input=$(cat)

file_path=$(echo "$input" | jq -r '.file_path // empty')

if [[ -z "$file_path" ]] || [[ ! -f "$file_path" ]]; then
  exit 0
fi

if ! echo "$file_path" | grep -qE '\.(js|ts|vue|css|scss|json|md)$'; then
  exit 0
fi

project_dir="${CURSOR_PROJECT_DIR:-$(echo "$input" | jq -r '.workspace_roots[0] // empty')}"
if [[ -z "$project_dir" ]]; then
  exit 0
fi

cd "$project_dir" || exit 0

pnpm exec prettier --write "$file_path" 2>/dev/null

exit 0
