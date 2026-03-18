#!/bin/bash

input=$(cat)

file_path=$(echo "$input" | jq -r '.file_path // empty')
conv_id=$(echo "$input" | jq -r '.conversation_id // empty')

if [[ -z "$file_path" ]] || [[ -z "$conv_id" ]]; then
  exit 0
fi

if ! echo "$file_path" | grep -qE '\.(js|ts|vue|css|scss|json|md)$'; then
  exit 0
fi

tracking_file="/tmp/cursor-edited-files-${conv_id}.txt"
echo "$file_path" >> "$tracking_file"

exit 0
