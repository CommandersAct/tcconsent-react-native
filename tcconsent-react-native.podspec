require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name = "tcconsent-react-native"
  s.version = package["version"]
  s.summary = package["description"]
  s.description = <<-DESC
                  Commanders Act React Native Bridge
                   DESC
  s.homepage = "https://github.com/commandersact/tcconsent-react-native"
  s.license = { :type => "Commercial", :file => "LICENSE" }
  s.authors = { "CommandersAct" => "mobile@commandersact.com" }
  s.platforms = { :ios => "11.0" }
  s.source = { :git => "https://github.com/commandersact/tcconsent-react-native.git", :tag => "#{s.version}" }
  s.source_files = "ios/**/*.{h,c,m,mm}"
  s.requires_arc = true
  s.swift_version = "5.0"
  s.pod_target_xcconfig = { 'DEFINES_MODULE' => 'YES' }

  s.dependency 'React-Core'
  s.dependency 'IOSV5-TCCore', '5.4.3'
  s.dependency 'TCConsent', '5.3.7'
  s.dependency 'TCIAB', '5.2.0'

end