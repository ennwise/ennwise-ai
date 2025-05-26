<#
.SYNOPSIS
    Splits tasks from a single JSON file into individual JSON files.
.DESCRIPTION
    This script reads a JSON file containing a "tasks" object, where each key
    is a task ID and its value is the task object. It then creates a new
    JSON file for each task, named 'task-<taskID>.json'.
.PARAMETER InputFile
    The path to the input JSON file.
.EXAMPLE
    .\Split-JsonTasks.ps1 -InputFile ".\tasks.json"
    This command will process 'tasks.json' in the current directory and create
    individual task files (e.g., task-1.json, task-2.json) in the same directory.
.NOTES
    Author: Your Name/AI
    Date: 2025-05-23
#>
param (
    [Parameter(Mandatory=$true, ValueFromPipeline=$false, HelpMessage="Path to the input JSON file.")]
    [string]$InputFile
)

# Check if the input file exists
if (-not (Test-Path $InputFile)) {
    Write-Error "Input file not found: $InputFile"
    exit 1
}

# Read the JSON file content
try {
    $jsonContent = Get-Content -Path $InputFile -Raw | ConvertFrom-Json
}
catch {
    Write-Error "Error parsing JSON file: $($_.Exception.Message)"
    exit 1
}

# Check if the 'tasks' property exists
if (-not $jsonContent.PSObject.Properties.Name -contains 'tasks') {
    Write-Error "The JSON file does not contain a 'tasks' property at the root level."
    exit 1
}

$tasks = $jsonContent.tasks

# Check if tasks is an object with properties
if ($tasks -isnot [System.Management.Automation.PSCustomObject] -and $tasks -isnot [hashtable]) {
    Write-Warning "The 'tasks' property is not an object or hashtable. No tasks to process."
    exit 0
}

# Get the directory of the input file to save output files in the same location
$outputDirectory = Split-Path -Path $InputFile -Parent
if ([string]::IsNullOrEmpty($outputDirectory)) {
    $outputDirectory = Get-Location # Default to current directory if input file is in the root
}

Write-Host "Processing tasks from '$InputFile'..."

# Iterate through each task by its property name (ID)
$tasks.PSObject.Properties | ForEach-Object {
    $taskID = $_.Name
    $taskData = $_.Value

    $outputFileName = "task-$taskID.json"
    $outputFilePath = Join-Path -Path $outputDirectory -ChildPath $outputFileName

    try {
        $taskData | ConvertTo-Json -Depth 100 | Set-Content -Path $outputFilePath
        Write-Host "Successfully created '$outputFilePath'"
    }
    catch {
        Write-Error "Error writing file '$outputFilePath': $($_.Exception.Message)"
    }
}

Write-Host "Task splitting complete."