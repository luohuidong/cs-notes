# tmux

## session

1. start a new session: `tmux`
1. detach the current session: `Ctrl + b d`
1. list all sessions: `tmux ls`
1. attach previous session: `tmux a` or `tmux attach`
1. attach to a session: `tmux attach -t <session-name>`
1. change session: `Ctrl + b s`
1. rename session
   1. `Ctrl + b :`
   1. `rename-session <new-name>`

## windows

1. create a new window: `Ctrl + b c`
1. switch to the next window: `Ctrl + b n`
1. switch to the previous window: `Ctrl + b p`
1. switch to the window by index: `Ctrl + b 0-9`
1. rename windows
   1. `Ctrl + b :`
   1. `rename-window <new-name>`

## panes

1. split the current pane horizontally: `Ctrl + b %`
1. split the current pane vertically: `Ctrl + b "`
1. navigating panes: `Ctrl + b <arrow-key>`
1. close the current pane: `Ctrl + b d`
