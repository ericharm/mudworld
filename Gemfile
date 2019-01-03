source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '~> 5.1.6'

gem 'webpacker', '~> 3.5'
gem 'react-rails'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.2'
gem 'turbolinks', '~> 5'

gem 'bcrypt', '~> 3.1.7'
gem 'sqlite3'
gem 'puma', '~> 3.7'
gem 'jbuilder', '~> 2.5'

gem 'figaro'
# gem 'capistrano-rails', group: :development
gem 'capistrano3-nginx', '~> 2.0'
# gem "capistrano", "~> 3.10", require: false
gem "capistrano-rails", "~> 1.4", require: false
gem 'capistrano-rvm'
gem 'capistrano-bundler', '~> 1.3'
gem 'capistrano-passenger'
gem 'capistrano'
gem 'capistrano-figaro-yml', '~> 1.0.2'

group :production do
  gem 'pg'
end

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'capybara', '~> 2.13'
  gem 'selenium-webdriver'
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
