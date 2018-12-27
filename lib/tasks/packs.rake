namespace :packs do
  desc 'Delete everything from public/packs'
  task :clear => :environment do
    sh 'rm public/packs/*'
  end
end

