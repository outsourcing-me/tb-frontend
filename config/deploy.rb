require 'mina/bundler'
# require 'mina/rails'
require 'mina/git'
# require 'mina/rbenv'  # for rbenv support. (http://rbenv.org)
# require 'mina/rvm'    # for rvm support. (http://rvm.io)

# Basic settings:
#   domain       - The hostname to SSH to.
#   deploy_to    - Path to deploy into.
#   repository   - Git repo to clone from. (needed by mina/git)
#   branch       - Branch name to deploy. (needed by mina/git)

if ENV['stage'].nil?
  puts 'Please specify a stage name to deploy!'
  exit
end

set :app_repository, 'git@gitlab.fnsudai.com:frontend/tbj-app.git'
set :repository, 'git@gitlab.fnsudai.com:frontend/tbj-frontend.git'
# set :app_branch, 'master'

load File.expand_path("../deploy/#{ENV['stage']}.rb", __FILE__)

if ENV['stage'] == 'dev' && !ENV['br'].nil?
  set :branch, ENV['br']
end

if ENV['stage'] == 'dev' && !ENV['appbr'].nil?
  set :app_branch, ENV['appbr']
end


# For system-wide RVM install.
#   set :rvm_path, '/usr/local/rvm/bin/rvm'

# Manually create these paths in shared/ (eg: shared/config/database.yml) in your server.
# They will be linked in the 'deploy:link_shared_paths' step.
set :shared_paths, ['log', 'node_modules']

# Optional settings:

#   set :user, 'deploy'    # Username in the server to SSH to.
#   set :port, '30000'     # SSH port number.
#   set :forward_agent, true     # SSH forward_agent.

# This task is the environment that is loaded for most commands, such as
# `mina deploy` or `mina rake`.
task :environment do
  # If you're using rbenv, use this to load the rbenv environment.
  # Be sure to commit your .ruby-version or .rbenv-version to your repository.
  # invoke :'rbenv:load'

  # For those using RVM, use this to load an RVM version@gemset.
  # invoke :'rvm:use[ruby-1.9.3-p125@default]'
end

# Put any custom mkdir's in here for when `mina setup` is ran.
# For Rails apps, we'll make some of the shared paths that are shared between
# all releases.
task :setup => :environment do
  queue! %[mkdir -p "#{deploy_to}/#{shared_path}/log"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/#{shared_path}/log"]

  queue! %[mkdir -p "#{deploy_to}/#{shared_path}/config"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/#{shared_path}/config"]

  queue! %[mkdir -p "#{deploy_to}/#{shared_path}/node_modules"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/#{shared_path}/node_modules"]

  queue! %[mkdir -p "#{deploy_to}/app_released"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/app_released"]

  # queue! %[touch "#{deploy_to}/#{shared_path}/config/database.yml"]
  # queue  %[echo "-----> Be sure to edit '#{deploy_to}/#{shared_path}/config/database.yml'."]
end

desc "Deploys the current version to the server."
task :deploy => :environment do
  to :before_hook do
    # Put things to run locally before ssh
  end
  deploy do
    # Put things that will set up an empty directory into a fully set-up
    # instance of your project.
    invoke :'git:clone'
    # invoke :'deploy:link_shared_paths'
    # invoke :'git:pullApp'
    # invoke :'npm:install'
    # invoke :'rails:db_migrate'
    # invoke :'rails:assets_precompile'
    invoke :'deploy:cleanup'

    to :launch do
      # queue "grunt server"
    end
  end
end

namespace :git do
  task :pullApp => :environment do
    in_directory '../tbj-app' do
      queue %{echo `pwd`}
      queue! %[git checkout -- .]
      # queue! %[echo #{app_branch}]
      queue! %[git checkout #{app_branch}]
      queue! %[git pull]
      queue %{echo "app code update!"}
      queue! %[cnpm install]
    end
  end
end

namespace :npm do
  task :install => :environment do
    queue! %[cnpm install]
    queue! %[npm run build:#{ENV['stage']}]
    in_directory '../tbj-app' do
      queue %{echo `pwd`}
      queue! %[npm run build:andr:publish:#{ENV['stage']}]
      queue %{echo "app build success!"}
    end
  end
end

# For help in making your deploy script, see the Mina documentation:
#
#  - http://nadarei.co/mina
#  - http://nadarei.co/mina/tasks
#  - http://nadarei.co/mina/settings
#  - http://nadarei.co/mina/helpers

