$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$baseDir = 'C:\Users\ravit\Documents\Codex\2026-05-22\https-camera-animation-standalone-vercel-app'

$htmlNew = Join-Path $baseDir "AI_Dynamic_Cam_User_Guide.html"
$pdfNew = Join-Path $baseDir "AI_Dynamic_Camera_App_User_Guide.pdf"

$htmlOld = Join-Path $baseDir "User_Guide_PDF_Template.html"
$pdfOld = Join-Path $baseDir "Camera_Animation_Tool_User_Guide.pdf"

Write-Host "Rendering NEW PDF from $htmlNew to $pdfNew..."
Start-Process -FilePath $edge -ArgumentList "--headless", "--disable-gpu", "--no-pdf-header-footer", "--print-to-pdf=$pdfNew", "$htmlNew" -Wait -NoNewWindow

if (Test-Path $pdfNew) {
    $item = Get-Item $pdfNew
    Write-Host "SUCCESS: Created NEW PDF ($($item.Length) bytes) at $($item.LastWriteTime)"
} else {
    Write-Host "ERROR: NEW PDF file not found."
}

Start-Sleep -Seconds 2

Write-Host "Rendering Standard PDF from $htmlOld to $pdfOld..."
Start-Process -FilePath $edge -ArgumentList "--headless", "--disable-gpu", "--no-pdf-header-footer", "--print-to-pdf=$pdfOld", "$htmlOld" -Wait -NoNewWindow

if (Test-Path $pdfOld) {
    $itemOld = Get-Item $pdfOld
    Write-Host "SUCCESS: Updated Standard PDF ($($itemOld.Length) bytes) at $($itemOld.LastWriteTime)"
}
