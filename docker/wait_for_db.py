"""Wait until MySQL accepts connections (Docker startup)."""
import os
import sys
import time

try:
    import MySQLdb
except ImportError:
    sys.exit(0)

host = os.environ.get("DB_HOST", "127.0.0.1")
port = int(os.environ.get("DB_PORT", "3306"))
user = os.environ.get("DB_USER", "root")
password = os.environ.get("DB_PASSWORD", "")
database = os.environ.get("DB_NAME", "wah_tour_db")

for attempt in range(1, 31):
    try:
        conn = MySQLdb.connect(
            host=host,
            port=port,
            user=user,
            passwd=password,
            database=database,
        )
        conn.close()
        print("MySQL is ready.")
        sys.exit(0)
    except Exception as exc:
        print(f"  attempt {attempt}/30: {exc}")
        time.sleep(2)

print("MySQL did not become ready in time.", file=sys.stderr)
sys.exit(1)
