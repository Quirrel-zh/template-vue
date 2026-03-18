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

deduped=$(sort -u "$tracking_file")
tmp_list="/tmp/cursor-format-list-${conv_id}.txt"
: > "$tmp_list"

echo "$deduped" | while IFS= read -r f; do
  [[ -f "$f" ]] && echo "$f" >> "$tmp_list"
done

if [[ ! -s "$tmp_list" ]]; then
  rm -f "$tracking_file" "$tmp_list"
  exit 0
fi

cd "$project_dir" || exit 0

xargs pnpm exec prettier --write < "$tmp_list" 2>/dev/null
xargs pnpm exec eslint --fix < "$tmp_list" 2>/dev/null

rm -f "$tmp_list"

rm -f "$tracking_file"

exit 0
