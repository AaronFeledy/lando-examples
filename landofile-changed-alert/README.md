# Landofile Changed Alert

![screenshot](https://raw.githubusercontent.com/AaronFeledy/lando-examples/master/landofile-changed-alert/screenshot.png)

When your landofile has changed, a `lando rebuild` is required to update the 
environment to match your new config. While this may be an obvious step when 
you are making the changes yourself, it may not be as obvious when other people
or tools make changes. When using version control software such as Git to merge
in a team member's latest work, or switching between your own branches, your
Lando environment may need to be updated to match the config.

This example saves a hash of the lando configuration used to build the
environment. On subsequent starts, the hash is compared against the current
landofile to see if the file has changed and a rebuild is required. If so, an 
alert message will be printed to the user's terminal.

```yaml
services:
  appserver:
    build:
      # Save a hash of our lando config for future integrity checking
      - sha1sum /app/.lando.yml > ~/.lando.yml.sha1

events:
  post-start:
    # Alert user if landofile and current environment are out of sync.
    - cd /app && sha1sum --status -c ~/.lando.yml.sha1 || echo $(echo $(tput setab 1 && tput setaf 7)Your Lando environment is outdated! Please run \"lando rebuild\" to update.$(tput sgr 0))
```

You may also find it useful to add the line from the `post-start` event to commonly used tooling so that the check is more frequent and more likely to be noticed.