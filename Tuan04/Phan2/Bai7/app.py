import os

env = os.getenv("APP_ENV", "not set")

print(f"APP_ENV = {env}")