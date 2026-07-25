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

    pages = [
        {
            "name": "snap_main_editor.png",
            "url": f"file:///{os.path.join(base_dir, 'index.html').replace('\\', '/')}",
            "width": 1400,
            "height": 900
        },
        {
            "name": "snap_blender_builder.png",
            "url": f"file:///{os.path.join(base_dir, 'blender_scene_builder', 'web', 'index.html').replace('\\', '/')}",
            "width": 1400,
            "height": 900
        }
    ]

    for p in pages:
        out_path = os.path.join(base_dir, p["name"])
        cmd = [
            edge,
            "--headless",
            "--disable-gpu",
            f"--window-size={p['width']},{p['height']}",
            f"--screenshot={out_path}",
            p["url"]
        ]
        print(f"Capturing screenshot for {p['name']}...")
        subprocess.run(cmd)
        if os.path.exists(out_path):
            print(f"Captured {p['name']} ({os.path.getsize(out_path)} bytes)")

if __name__ == "__main__":
    main()
