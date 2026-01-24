#!/usr/bin/env bash
set -o errexit

# Install Python packages from the CLEAN requirements.txt
pip install --no-cache-dir -r requirements.txt

# Download FFmpeg (The "Audio Engine")
mkdir -p ffmpeg
curl -L https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-linux64-gpl.tar.xz | tar -xJ --strip-components=1 -C ./ffmpeg