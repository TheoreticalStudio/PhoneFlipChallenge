source "https://rubygems.org"

# Установка кодировки
Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8

gem "jekyll", "~> 4.3.0"
gem "webrick"
gem "em-websocket", "~> 0.5.3"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-seo-tag", "~> 2.6"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
platforms :mingw, :x64_mingw, :mswin do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.0", :platforms => [:mingw, :x64_mingw, :mswin]
