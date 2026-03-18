#!/bin/bash

input=$(cat)

tool_name=$(echo "$input" | jq -r '.tool_name // empty')
server=$(echo "$input" | jq -r '.server // empty')
command_field=$(echo "$input" | jq -r '.command // empty')

ALLOWED_SERVERS="z-mcp-yapi cursor-ide-browser"

is_allowed=false
for s in $ALLOWED_SERVERS; do
  if [[ "$server" == "$s" ]] || [[ "$command_field" == *"$s"* ]] || [[ "$tool_name" == *"$s"* ]]; then
    is_allowed=true
    break
  fi
done

if $is_allowed; then
  echo '{"permission":"allow"}'
else
  echo "{\"permission\":\"ask\",\"user_message\":\"MCP tool \\\"$tool_name\\\" from server \\\"$server\\\" requests approval.\"}"
fi
