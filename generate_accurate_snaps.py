import os
import subprocess
import time

def find_edge():
    candidates = [
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    ]
    for c in candidates:
        if os.path.exists(c):
            return c
    return None

def main():
    edge = find_edge()
    if not edge:
        print("Edge not found")
        return

    base_dir = os.path.dirname(os.path.abspath(__file__))

    configs = [
        {"name": "snap_01_landing_import", "mode": "import"},
        {"name": "snap_02_viewport_timeline", "mode": "viewport"},
        {"name": "snap_03_camera_ranges", "mode": "ranges"},
        {"name": "snap_04_ai_director", "mode": "ai_director"},
        {"name": "snap_05_camera_controls_lens", "mode": "lens"},
        {"name": "snap_06_cinematic_fx_audio", "mode": "fx"},
    ]

    for cfg in configs:
        out_png = os.path.join(base_dir, f"{cfg['name']}.png")
        url = f"http://127.0.0.1:4173/index.html?snap={cfg['mode']}"
        cmd = [
            edge,
            "--headless",
            "--disable-gpu",
            "--window-size=1400,900",
            f"--screenshot={out_png}",
            url
        ]
        print(f"Generating screenshot for {cfg['name']} (mode={cfg['mode']})...")
        subprocess.run(cmd)
        time.sleep(1)
        if os.path.exists(out_png):
            print(f"Captured {cfg['name']}.png ({os.path.getsize(out_png)} bytes)")

if __name__ == "__main__":
    main()
