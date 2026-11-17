#!/data/data/com.termux/files/usr/bin/sh
set -eu
case "${1:-status}" in
  start) sv up organizeon-d4 ;;
  stop) sv down organizeon-d4 ;;
  restart) sv restart organizeon-d4 ;;
  status) sv status organizeon-d4 ;;
  logs) tail -n 100 "$HOME/organizeon/d4/logs/current" ;;
  *) echo 'Uso: d4.sh start|stop|restart|status|logs' >&2; exit 2 ;;
esac
