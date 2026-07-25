import os
import sys
import subprocess

def find_browser():
    candidates = [
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
        os.path.expanduser(r"~\AppData\Local\Google\Chrome\Application\chrome.exe"),
        os.path.expanduser(r"~\AppData\Local\Microsoft\Edge\Application\msedge.exe"),
    ]
    for path in candidates:
        if os.path.exists(path):
            return path
    return None

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    html_file = os.path.join(base_dir, "User_Guide_PDF_Template.html")
    pdf_file = os.path.join(base_dir, "Camera_Animation_Tool_User_Guide.pdf")

    if not os.path.exists(html_file):
        print(f"Error: HTML template not found at {html_file}")
        sys.exit(1)

    browser_path = find_browser()
    if not browser_path:
        print("Error: Could not find Edge or Chrome executable for PDF generation.")
        sys.exit(1)

    print(f"Using browser: {browser_path}")
    print(f"Rendering {html_file} -> {pdf_file} ...")

    cmd = [
        browser_path,
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_file}",
        html_file
    ]

    try:
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if os.path.exists(pdf_file) and os.path.getsize(pdf_file) > 0:
            print(f"SUCCESS: PDF created successfully ({os.path.getsize(pdf_file)} bytes)!")
            print(f"PDF Location: {pdf_file}")
        else:
            print("Failed to generate PDF. Output:", result.stdout, result.stderr)
    except Exception as e:
        print("Exception occurred:", e)

if __name__ == "__main__":
    main()
