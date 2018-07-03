# # Jewish Currents - Static Website
Jewish Currents is built using [React Static](https://github.com/nozzle/react-static) and [Netlify Lambda](https://www.netlify.com/docs/functions/). React Static is a progressive static site generator for React and Netlify Lambda allows us to create function endpoints to run back-end tasks from the client-side. Please reference their docs and the relevant config files: `static.config.js`, `webpack.config.js`, `postcss.config.js`  and of course, `package.json` for information about the scripts being run to build the website. The website is deployed with Netlify

## Setup
To set up your local machine for development. Make sure you have [Node](https://nodejs.org/en/) installed or use [NVM](https://github.com/creationix/nvm) to select the latest stable version.

1. Clone this repo, and `cd` into its directory.
2. Run `npm install`
3. Make sure the necessary [Environment Variables](#environment-variables) are setup 
4. Run `npm run start` to build the app for local development. This initiates two processes running concurrently:
	* `npm run start-app` - starts the react-static app
	* `npm run start-lambda` - serves the netlify lambda endpoints

## Environment Variables
Reference `.env.sample` file for the latest list of environment variables you will need to fully operate the site locally. 
```
# Required
export SITE_BASE_URL="http://localhost:3000"

# Stripe Subscriptions Variables
export LAMBDA_ENDPOINT="http://localhost:3000/.netlify/lambda" 
export STRIPE_PUBLISHABLE_KEY=""
export STRIPE_SECRET_KEY=""
export DOMESTIC_PLAN_KEY=""
export INTERNATIONAL_PLAN_KEY=""
```

## Data Sources
The Jewish Currents website's data is pulled primarily from [DatoCMS](https://jewish-currents-1.admin.datocms.com/editor). Reference the `/src/datocms` directory for the source files behind the build process. Data from our DatoCMS instance is pulled down together and run through a transformation process that links content model references and sorts content by models in order to compile static pages. The logic for this process and how these models are used can be referenced in `static.config.js` which is the main config file for React Static. All of the site's routes and other configuration is contained therein. 

## Site Host
Our site host is [Netlify](http://netlify.com/) for both [Production](https://jewishcurrents.org) and [Staging](https://jewishcurrents-staging.netlify.com) environments with environment variables for each configured in the portal. The site is deployed on code changes pushed to GitHub to the `master` branch (prod) or `staging` branch (staging). Redeployments may be triggered from the Netlify portal for each environment and easily rolled back to previous deployments as well.

## Scripts
Below is a brief descriptor of useful scripts included in `package.json`
1. `build`: production build command
2. `clean`: deletes the target directory `dist`
3. `copy`: copies `lambda-src` function source files to `lambda` directory
4. `format`: formats `js` files using prettier
5. `freshstart`: refreshes cache with latest data from DatoCMS
6. `lint`: lints `js` with eslint 
7. `precommit`: precommit hook to run linter 
8. `serve`: serves the target directory `dist` for local testing of prod / staging builds
9. `start`: starts local dev by triggering other `start-*` commands
10. `start-app`: runs just the react-static app
11. `start-lambda`: runs just the lambda function serve command
12. `stage`: staging build command
13. `migrate`: runs legacy migration script (deprecated: used just for running node scripts
