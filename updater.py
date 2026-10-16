import os
import subprocess
import sys

def check_and_update():
    """
    Checks for latest changes on GitHub and pulls them automatically.
    Students will always get the latest version on launch without re-downloading!
    """
    print("[1/4] Checking for updates from GitHub...")
    try:
        # Check if git is available in this folder
        if os.path.exists(".git"):
            # Fetch silently with a 4-second timeout
            fetch_result = subprocess.run(
                ["git", "fetch", "origin", "master"],
                capture_output=True,
                text=True,
                timeout=5
            )
            
            # Check status against origin/master
            status_result = subprocess.run(
                ["git", "status", "-uno"],
                capture_output=True,
                text=True,
                timeout=5
            )
            
            if "Your branch is behind" in status_result.stdout:
                print(">>> New update found on GitHub! Downloading latest features...")
                pull_result = subprocess.run(
                    ["git", "pull", "origin", "master"],
                    capture_output=True,
                    text=True,
                    timeout=10
                )
                print("[SUCCESS] Application updated to the latest version automatically!")
            else:
                print("[OK] Your application is up to date!")
        else:
            print("[INFO] Standalone mode (No .git folder). Skipping auto-pull.")
    except Exception as e:
        print(f"[NOTE] Offline or skipping update check: {e}")

if __name__ == "__main__":
    check_and_update()
