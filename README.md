# Manni Spotter Desktop Client

## Setup 1
1. Clone ngManniSpotter
2. Install its dependencies
3. run ng build --aot --prod --base-href=./
4. copy the data inside the dist/manniweb folder to the dist/app folder inside this project
5. run "npm run start -- [DOMAIN AND PATH OF THE SERVICE]"
6. ... it should work

## Setup 2
1. Copy the latest app.asar file from the github releases page
2. And proceed with it as described in https://electronjs.org/docs/tutorial/application-distribution
3. Now run this app with the first parameter being the domain where to gether the data from