"""
Gmail OTP test — project root se chalayein:  py setup_email.py
App Password .env mein lagane ke baad SUCCESS dikhega.
"""
import os
import sys

import MySQLdb  # noqa: F401 — project already uses mysqlclient


def load_env(env_path):
    if os.path.exists(env_path):
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#"):
                    continue
                if "=" in line:
                    k, v = line.split("=", 1)
                    os.environ[k.strip()] = v.strip()


def main():
    root = os.path.dirname(os.path.abspath(__file__))
    load_env(os.path.join(root, ".env"))

    user = os.environ.get("EMAIL_HOST_USER", "")
    password = os.environ.get("EMAIL_HOST_PASSWORD", "")
    to = user or "test@example.com"

    print("=" * 50)
    print("Wah Tour — Gmail OTP Setup Test")
    print("=" * 50)
    print(f"Sender: {user or '(missing)'}")

    if not user or not password:
        print("\nFAIL: .env mein EMAIL_HOST_USER aur EMAIL_HOST_PASSWORD likhein.")
        return 1

    if len(password.replace(" ", "")) < 16:
        print("\nFAIL: Normal Gmail password SMTP par kaam nahi karta.")
        print("Fix: https://myaccount.google.com/apppasswords")
        print("     16-digit App Password copy karke .env mein EMAIL_HOST_PASSWORD=... paste karein")
        return 1

    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
    sys.path.insert(0, os.path.join(root, "backend"))
    import django

    django.setup()
    from django.core.mail import send_mail
    from django.conf import settings

    try:
        send_mail(
            "Wah Tour — OTP Test",
            "Agar yeh email aayi to har user ko real OTP jayega.\nTest OTP: 999999",
            settings.DEFAULT_FROM_EMAIL,
            [to],
            fail_silently=False,
        )
        print(f"\nSUCCESS: Test email bhej di -> {to}")
        print("Inbox + Spam check karein. Ab signup par real OTP jayega.")
        return 0
    except Exception as e:
        print(f"\nFAIL: {e}")
        print("\nFix:")
        print("  1. Google: 2-Step Verification ON")
        print("  2. https://myaccount.google.com/apppasswords - Mail - password copy")
        print("  3. .env → EMAIL_HOST_PASSWORD=paste (spaces hata dein)")
        print("  4. Dubara: py setup_email.py")
        return 1


if __name__ == "__main__":
    sys.exit(main())
