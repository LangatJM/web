Param(
  [string]$OutputDir = "backup",
  [string]$DataDir = "data"
)

if (-not (Test-Path $OutputDir)) { New-Item -ItemType Directory -Path $OutputDir | Out-Null }
$timestamp = Get-Date -Format "yyyyMMddHHmmss"
$archive = Join-Path $OutputDir "data-$timestamp.zip"
Compress-Archive -Path $DataDir\* -DestinationPath $archive -Force
Write-Output "Backup created: $archive"
