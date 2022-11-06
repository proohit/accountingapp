#!/bin/bash
npm --no-git-tag-version version $1
npm --workspaces --no-git-tag-version version $1
git add .
git commit -m "Bump version $1"
