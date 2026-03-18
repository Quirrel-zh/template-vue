#!/bin/bash

input=$(cat)

conv_id=$(echo "$input" | jq -r '.conversation_id // empty')

if [[ -z "$conv_id" ]]; then
  exit 0
fi

tracking_file="/tmp/cursor-edited-files-${conv_id}.txt"

if [[ ! -f "$tracking_file" ]]; then
  exit 0
fi

project_dir="${CURSOR_PROJECT_DIR:-$(echo "$input" | jq -r '.workspace_roots[0] // empty')}"
if [[ -z "$project_dir" ]]; then
  rm -f "$tracking_file"
  exit 0
fi

mapfile -t files < <(sort -u "$tracking_file")

existing_files=()
for f in "${files[@]}"; do
  [[ -f "$f" ]] && existing_files+=("$f")
done

if [[ ${#existing_files[@]} -eq 0 ]]; then
  rm -f "$tracking_file"
  exit 0
fi

cd "$project_dir" || exit 0

pnpm exec prettier --write "${existing_files[@]}" 2>/dev/null
pnpm exec eslint --fix "${existing_files[@]}" 2>/dev/null

rm -f "$tracking_file"

exit 0
