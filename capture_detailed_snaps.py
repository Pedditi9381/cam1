import os
import subprocess

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
        print("Edge executable not found")
        return

    base_dir = os.path.dirname(os.path.abspath(__file__))
    app_url = f"file:///{os.path.join(base_dir, 'index.html').replace('\\', '/')}"

    snaps = [
        {"name": "snap_01_landing_import.png", "width": 1280, "height": 800},
        {"name": "snap_02_viewport_timeline.png", "width": 1400, "height": 900},
        {"name": "snap_03_camera_ranges.png", "width": 1400, "height": 900},
        {"name": "snap_04_ai_director.png", "width": 1400, "height": 900},
        {"name": "snap_05_camera_controls_lens.png", "width": 1400, "height": 900},
        {"name": "snap_06_cinematic_fx_audio.png", "width": 1400, "height": 900},
    ]

    for s in snaps:
        out_path = os.path.join(base_dir, s["name"])
        cmd = [
            edge,
            "--headless",
            "--disable-gpu",
            f"--window-size={s['width']},{s['height']}",
            f"--screenshot={out_path}",
            app_url
        ]
        print(f"Capturing {s['name']}...")
        subprocess.run(cmd)
        if os.path.exists(out_path):
            print(f"Captured {s['name']} ({os.path.getsize(out_path)} bytes)")

if __name__ == "__main__":
    main()
