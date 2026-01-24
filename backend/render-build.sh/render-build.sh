#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install Python dependencies
pip install --no-cache-dir -r requirements.txt

# Download FFmpeg binary
mkdir -p ffmpeg
curl -L https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-linux64-gpl.tar.xz | tar -xJ --strip-components=1 -C ./ffmpeg

# Add FFmpeg to the PATH so Whisper can find it
export PATH=$PATH:$(pwd)/ffmpeg/bin