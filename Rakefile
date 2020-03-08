abort('Please run this using `bundle exec rake`') unless ENV["BUNDLE_BIN_PATH"]
require 'html-proofer'

desc "Test the website"
task :test => [:build, 'html:check'] do
  options = {
    :check_sri => true,
    :check_external_hash => true,
    :check_html => true,
    :check_img_http => true,
    :check_opengraph => true,
    :enforce_https => true,
    :cache => {
      :timeframe => '6w'
    }
  }
  begin
    HTMLProofer.check_directory("./_posts/2020/03/03", options).run
  rescue => msg
    puts "#{msg}"
  end
end

task :default => [:test]
