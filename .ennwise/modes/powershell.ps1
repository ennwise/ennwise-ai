# Get all .md files in the current directory
$files = Get-ChildItem -File -Filter "*.md"

if ($files.Count -eq 0) {
    Write-Host "No .md files found in the current directory."
    exit
}

foreach ($file in $files) {
    # Get the filename without the extension
    $fileNameWithoutExtension = $file.BaseName

    # Construct the prefixed folder name
    $prefixedFolderName = "rules-$fileNameWithoutExtension" # Changed this line

    # Construct the destination directory path
    $destinationDir = Join-Path -Path "..\..\.roo" -ChildPath $prefixedFolderName # Updated to use $prefixedFolderName
    
    # Construct the full destination file path
    $destinationFile = Join-Path -Path $destinationDir -ChildPath "rules.md"

    # Create the destination directory if it doesn't exist
    if (-not (Test-Path -Path $destinationDir -PathType Container)) {
        try {
            New-Item -ItemType Directory -Path $destinationDir -Force -ErrorAction Stop | Out-Null
            Write-Host "Created directory: $destinationDir"
        }
        catch {
            Write-Error "Failed to create directory: $destinationDir. Error: $($_.Exception.Message)"
            continue # Skip to the next file if directory creation fails
        }
    }

    # Copy the file
    try {
        Copy-Item -Path $file.FullName -Destination $destinationFile -Force -ErrorAction Stop
        Write-Host "Copied '$($file.Name)' to '$destinationFile'"
    }
    catch {
        Write-Error "Failed to copy '$($file.Name)' to '$destinationFile'. Error: $($_.Exception.Message)"
    }
}

Write-Host "File copy process complete. ✅"