# Lando Examples

A repository of Example Lando Configurations.

## General App Enhancements
These examples provide useful functionality that can be added to any Lando configuration.

- [Landofile Changed Alert](landofile-changed-alert): 
  Alert users that a `lando rebuild` is necessary when the lando config has changed and is no longer in sync with the
  current environment.
- [Colorful Messages](colorful-messages): 
  Set variables to represent text colors and use them in your build steps, tooling, or events to produce colorful 
  messages in your terminal output.

## Environment-Specific Enhancements
These examples provide useful tooling for environment-specific use cases such as PHP-based applications.

- [Xdebug On/Off Switch](xdebug):
  Tooling to enable and disable Xdebug on demand to improve performance when not actively debugging your PHP app.

## Advanced Configurations
These examples demonstrate advanced configurations and tooling for specific use cases.

- [Storybook](storybook): 
  Configuration and tooling to power a sample Storybook/NextJS application.
- [Drupal Starter](drupal) - Configuration and tooling to improve the developer experience when working with Drupal.
- [Local Static Site Generator](tome): 
  Leverage Lando, Drupal, and the Tome module to run a local "App" that can be downloaded and run on demand.
- [Platform.sh ](platformsh):
  Demonstrates installing the Platform.sh CLI and some useful tooling for interacting with Platform.sh.
- [NestJS and EventStoreDB](nestjs-eventstoredb)
  Demonstrates using NestJS and EventStoreDB to implement a simple event sourcing system.
- Decoupled Drupal with Gatsby:
  Coming soon - A Lando environment for developing decoupled Drupal with a Gatsby front-end.
- Github Actions Tests:
  Coming soon - Use Lando to run tests using Github Actions
