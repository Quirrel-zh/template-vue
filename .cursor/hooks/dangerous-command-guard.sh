#!/bin/bash

input=$(cat)

command=$(echo "$input" | jq -r '.command // empty')

if [[ -z "$command" ]]; then
  echo '{"permission":"allow"}'
  exit 0
fi

danger_msg=""

# rm -rf with root/home/wildcard targets
if echo "$command" | grep -qE 'rm\s+(-[a-zA-Z]*f[a-zA-Z]*\s+|.*--force\s+)(/|~|\.\.|/\*|\*)\b'; then
  danger_msg="高危删除操作: rm -rf 指向根目录/主目录/上级目录"
elif echo "$command" | grep -qE 'rm\s+-[a-zA-Z]*r[a-zA-Z]*f'; then
  danger_msg="递归强制删除: $command"
fi

# sudo
if [[ -z "$danger_msg" ]] && echo "$command" | grep -qE '(^|\s|;|&&|\|\|)sudo\s'; then
  danger_msg="检测到 sudo 提权命令"
fi

# git push --force
if [[ -z "$danger_msg" ]] && echo "$command" | grep -qE 'git\s+push\s+.*(-f|--force|--force-with-lease)'; then
  danger_msg="检测到 git force push"
fi

# git reset --hard
if [[ -z "$danger_msg" ]] && echo "$command" | grep -qE 'git\s+reset\s+--hard'; then
  danger_msg="检测到 git reset --hard，可能丢失未提交的更改"
fi

# chmod 777
if [[ -z "$danger_msg" ]] && echo "$command" | grep -qE 'chmod\s+(-[a-zA-Z]+\s+)*777'; then
  danger_msg="检测到 chmod 777，过于宽松的权限设置"
fi

# curl/wget piped to shell
if [[ -z "$danger_msg" ]] && echo "$command" | grep -qE '(curl|wget)\s.*\|\s*(ba)?sh'; then
  danger_msg="检测到从网络下载并直接执行脚本"
fi

# SQL destructive operations
if [[ -z "$danger_msg" ]] && echo "$command" | grep -qiE '(DROP\s+(DATABASE|TABLE|SCHEMA)|TRUNCATE\s+TABLE|DELETE\s+FROM\s+\S+\s*;?\s*$)'; then
  danger_msg="检测到破坏性 SQL 操作"
fi

# Disk operations
if [[ -z "$danger_msg" ]] && echo "$command" | grep -qE '(mkfs\.|dd\s+if=)'; then
  danger_msg="检测到磁盘级操作 (mkfs/dd)"
fi

# Fork bomb
if [[ -z "$danger_msg" ]] && echo "$command" | grep -qF '(){'; then
  danger_msg="检测到疑似 fork bomb"
fi

# Format disk / wipe
if [[ -z "$danger_msg" ]] && echo "$command" | grep -qE '(diskutil\s+eraseDisk|wipefs)'; then
  danger_msg="检测到磁盘擦除操作"
fi

if [[ -n "$danger_msg" ]]; then
  cat <<EOF
{"permission":"ask","user_message":"⚠️ $danger_msg\n命令: $command","agent_message":"The command \"$command\" was flagged as potentially dangerous: $danger_msg. Please wait for user approval."}
EOF
else
  echo '{"permission":"allow"}'
fi
