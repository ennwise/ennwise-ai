$PathToSearch = '.\' # Or any other path you are searching
$ResolvedPath = (Resolve-Path -LiteralPath $PathToSearch).ProviderPath
$Timestamp = Get-Date -Format 'yyyyMMddHHmmss'
$OutFile = "all_documents-$Timestamp.txt" # Output file will be in the current working directory

# Define the full path to the "target" folder that might exist at the root of $ResolvedPath
$PotentialRootTargetFolder = Join-Path -Path $ResolvedPath -ChildPath "target"
$PathToExcludePrefix = $null # This will store the prefix to check against, if the folder exists

# Check if the "target" folder exists at the root and is actually a directory
if (Test-Path -Path $PotentialRootTargetFolder -PathType Container) {
    # If it exists, create a path prefix string.
    # Files whose full path starts with this prefix are inside the root "target" folder.
    # The trailing directory separator is crucial for matching items *within* this folder correctly.
    $PathToExcludePrefix = $PotentialRootTargetFolder + [System.IO.Path]::DirectorySeparatorChar
    Write-Host "INFO: Will skip processing files within the root folder: '$PotentialRootTargetFolder'"
}

Get-ChildItem -Path $ResolvedPath -Filter *.json -Recurse -File | Where-Object {
    $processItem = $true # Default to processing the item

    if ($null -ne $PathToExcludePrefix) {
        # If $PathToExcludePrefix is set (meaning .\target exists as a directory),
        # check if the current file's full path starts with this prefix.
        if ($_.FullName.StartsWith($PathToExcludePrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
            $processItem = $false # Mark item to be skipped
            # You can uncomment the line below for verbose logging of each skipped file:
            # Write-Host "Skipping file in root 'target' folder: $($_.FullName)"
        }
    }
    return $processItem # Return $true to keep the file, $false to filter it out
} | ForEach-Object {
    # Calculate the path relative to the $ResolvedPath for the output file
    $RelativePath = $_.FullName.Substring($ResolvedPath.Length).TrimStart([System.IO.Path]::DirectorySeparatorChar, [System.IO.Path]::AltDirectorySeparatorChar)

    # Add file marker and content to the output file
    Add-Content -Path $OutFile -Value "################## NEW FILE: $RelativePath ##################"
    Add-Content -Path $OutFile -Value (Get-Content -LiteralPath $_.FullName -Raw)
}

Write-Host "Processing complete. Output written to '$OutFile'"