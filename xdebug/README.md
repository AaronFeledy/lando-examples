# Xdebug On/Off Switch

When working with PHP applications, Xdebug is a useful tool allowing you to step
through your code and inspect values at run time. Lando gives you the ability
to add a single line to your PHP based recipe configuration to enable Xdebug.
However, this comes at a cost. Enabling Xdebug means that lots of debug data is
being generated for every PHP request. This can make loading pages in Drupal or
running Drush commands *significantly* slower.

Enabling the Xdebug option only when needed might sound like a good way to deal
with this performance issue, however, making such a change to your `.lando.yml`
requires a `lando rebuild` each time you turn it on or off. The rebuild might
take much longer than the time you would save. 

Disabling Xdebug in your Lando config and instead toggling it with the tooling
definitions included in this example will allow you a quick command to turn
Xdebug on or off quickly and painlessly. You can now enjoy the benefits of
Xdebug when you need it, and you are free from the performance cost when you
don't.

Use `lando xdebug-on` to enable Xdebug and `lando xdebug-off` to disable Xdebug.

*__Note:__ Older versions of Xdebug that shipped with Lando worked without the
Xdebug browser extension. Since Lando services added Xdebug 3, you must now have
the browser extension installed and have it in debug mode when you would like to
debug.*
