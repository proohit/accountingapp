#!/bin/bash
VERSION=$1
cd frontend
npm --no-git-tag-version version $VERSION
cd ../backend
npm --no-git-tag-version version $VERSION
