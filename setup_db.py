import os
import sys
import MySQLdb

# Load env variables from .env
def load_env(env_path):
    if os.path.exists(env_path):
        with open(env_path, 'r') as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith('#'):
                    continue
                if '=' in line:
                    key, val = line.split('=', 1)
                    os.environ[key.strip()] = val.strip()

# Run database setup
def setup():
    project_root = os.path.dirname(os.path.abspath(__file__))
    load_env(os.path.join(project_root, '.env'))
    
    db_name = os.environ.get('DB_NAME', 'wah_tour_db')
    db_user = os.environ.get('DB_USER', 'root')
    db_pass = os.environ.get('DB_PASSWORD', '')
    db_host = os.environ.get('DB_HOST', '127.0.0.1')
    db_port = int(os.environ.get('DB_PORT', '3306'))
    
    print(f"Connecting to MySQL server at {db_host}:{db_port} as user '{db_user}'...")
    
    try:
        # Connect to MySQL (without selecting a DB)
        conn = MySQLdb.connect(
            host=db_host,
            user=db_user,
            passwd=db_pass,
            port=db_port
        )
        cursor = conn.cursor()
        
        # Create database
        print(f"Checking if database '{db_name}' exists...")
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {db_name} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;")
        print(f"Success: Database '{db_name}' is ready!")
        
        cursor.close()
        conn.close()
        return True
    except Exception as e:
        print(f"Error: Failed to connect or create database. Details: {e}", file=sys.stderr)
        print("\nPossible solutions:", file=sys.stderr)
        print("1. Make sure your local MySQL server is running.", file=sys.stderr)
        print("2. Check if you need to provide a password in your .env file.", file=sys.stderr)
        return False

if __name__ == '__main__':
    success = setup()
    sys.exit(0 if success else 1)
