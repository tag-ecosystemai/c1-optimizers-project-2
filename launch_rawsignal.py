import subprocess
import sys
import webbrowser
import time

print("=" * 50)
print("RawSignal - Bias Detection for News Articles")
print("=" * 50)
print("\nStarting backend...")

# Start backend
backend_proc = subprocess.Popen([
    sys.executable, "-m", "uvicorn", 
    "app.main:app", "--port", "8001"
], cwd="backend", stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

time.sleep(2)
print("✓ Backend running on http://localhost:8001")
print("\nNow load the extension in Chrome:")
print("1. Go to chrome://extensions/")
print("2. Enable 'Developer mode' (top right)")
print("3. Click 'Load unpacked'")
print("4. Select the 'extension' folder from this directory")
print("\nThen visit any news website and click the RawSignal icon!")
print("\nPress Ctrl+C to stop...")

try:
    backend_proc.wait()
except KeyboardInterrupt:
    print("\n\nStopping RawSignal...")
    backend_proc.terminate()
    print("Goodbye!")
