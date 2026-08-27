require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name = "tcconsent-react-native-swift"
  s.version = package["version"]
  s.summary = "Deprecated: use tcconsent-react-native instead"
  s.description = <<-DESC
                  This pod is deprecated. All functionality is now in tcconsent-react-native.
                   DESC
  s.homepage = "https://github.com/commandersact/tcconsent-react-native"
  s.license = { :type => "Commercial", :file => "LICENSE" }
  s.authors = { "CommandersAct" => "mobile@commandersact.com" }
  s.platforms = { :ios => "15.1" }
  s.source = { :git => "https://github.com/commandersact/tcconsent-react-native.git", :tag => "#{s.version}" }
  s.dependency 'tcconsent-react-native'
end