@echo off
echo Starting Jekyll server with LiveReload...
set JEKYLL_ENV=development
bundle exec jekyll serve --livereload --trace
pause
