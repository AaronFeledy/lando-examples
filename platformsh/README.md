# Platform.sh

This example demonstrates installing the Platform.sh CLI and some useful tooling
for interacting with Platform.sh.

## Instructions
1. Acquire your Platform.sh project ID. It can be found in the URL when viewing
   your project in the Platform.sh
   [Management Console](https://console.platform.sh/).
1. Paste the project ID as the value of the PLATFORMSH_PROJECT_ID environment 
   variable in the services overrides section of your `lando.yml`.
1. Generate an API token for Platform CLI in your Platform.sh
   [account settings](https://accounts.platform.sh/user/api-tokens).
1. Copy the `.env.default` file to a new file named `.env` and place your API
   token as the value of PLATFORMSH_CLI_TOKEN in that file.

You should now be able to run `lando platform list` to see the available
Platform CLI commands.

## Included Tooling
`lando platform` - Run Platform CLI commands.
`lando alias-dl` - Download Drush alias files for your environments.
`lando db-dl` - Download a database dump from your master environment.
`lando files-dl` Download files from your master environment.
