#!/bin/bash
VERSION=$1
cd frontend
npm --no-git-tag-version version $VERSION
cd ../accountingapp-backend
npm --no-git-tag-version version $VERSION
cd ../shared
npm --no-git-tag-version version $VERSION
cd ..
git add .
git commit -m "Bump version $1"
