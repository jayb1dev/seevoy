#!/bin/sh
#
# Run after "capacitor sync ios"
# by using
# "capacitor:sync:after"
# in package.json
#

#
# See:
# https://forum.ionicframework.com/t/run-script-after-cap-sync-in-appflow/212962/3
#
# In the scripts section of your package.json you add "capacitor:sync:after": "command or script to run"
#

#
# Workaround to override app icon
#

cp ./ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-1024@4x.png ./ios/App/App/public/logo.png


