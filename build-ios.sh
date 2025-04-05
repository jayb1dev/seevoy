#!/bin/bash
#
# Build ios app
#

start_time=$(date)

#
# Get current version. Increment current minor version.
#
MAJOR_VERSION=$(cat version.txt | sed 's/\.[0-9]*$//')
MINOR_VERSION=$(cat version.txt | sed 's/[0-9]\.[0-9].//')
MINOR_VERSION=$((${MINOR_VERSION} + 1))

FULL_VERSION="${MAJOR_VERSION}.${MINOR_VERSION}"

echo ${FULL_VERSION} > version.txt

#
# Inject new version number into build files and app details page.
#

cat ios/App/App.xcodeproj/project.pbxproj.template | \
    sed "s/__INJECT_VERSION/${FULL_VERSION}/g" > \
    ios/App/App.xcodeproj/project.pbxproj

cat src/routes/pages/settings/about/AppDetails.tsx.template | \
    sed "s/__INJECT_VERSION/${FULL_VERSION}/g" > \
    src/routes/pages/settings/about/AppDetails.tsx


#
# Start build
#

export BUILD_FOSS_ONLY=true

corepack enable
pnpm install

pushd ios/App
pod install
popd

echo
echo "Install workbox-window..."
echo

pnpm i -D workbox-window

echo
echo "Installed workbox-window..."
echo

echo
echo "Begin: pnpm exec ionic capacitor build ios"
echo

pnpm exec ionic capacitor build ios

echo
echo "Completed: pnpm exec ionic capacitor build ios"
echo

end_time=$(date)

#
# See:
# https://github.com/aeharding/voyager/blob/main/CONTRIBUTING.md
#

echo
echo
echo Xcode should automatically open. You can then run the project with CMD+R.
echo
echo "Start time:   ${start_time}"
echo "End time:     ${end_time}"
echo 
echo 

say -v Bells "beep"



