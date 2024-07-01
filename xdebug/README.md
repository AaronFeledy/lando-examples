# Xdebug Example Configuration for Lando
With on/off tooling, optional WSL2 configuration, and a php script to help with
debugging your Xdebug configuration.

*__Note:__ Don't forget to install and enable the Xdebug browser extension to
trigger Xdebug sessions in your IDE.

## Xdebug On/Off Switch

When working with PHP applications, Xdebug is a useful tool allowing you to 
step through your code and inspect values at run time. Lando gives you the
ability to add a single line to your PHP based recipe configuration to enable
Xdebug. However, this comes at a cost. Enabling Xdebug adds overhead to your
PHP requests and can slow down your application. Enabling the Xdebug option
only when needed might sound like a good way to deal with this performance
cost, however, making such a change to your `.lando.yml` requires a
`lando rebuild` each time you turn it on or off. The rebuild might take much
longer than the time you would save.

Disabling Xdebug in your Lando config and instead toggling it with the tooling
definitions included in this example will allow you a quick command to turn
Xdebug on or off quickly and painlessly. You can now enjoy the benefits of
Xdebug when you need it, and you are free from the performance cost when you
don't.

Use `lando xdebug-on` to enable Xdebug and `lando xdebug-off` to disable Xdebug.

## Xdebug Status Script

This example includes a [PHP script](xdebug.php) that will help you determine if
Xdebug is enabled and properly configured in your Lando environment. The script
will output the status of Xdebug and the configuration settings that are in use
to help you troubleshoot any issues you might have with Xdebug. Just drop it in
your webroot and visit the xdebug.php file in your browser to get useful info
about your Xdebug configuration.

## WSL2 Configuration

Check out the included [.lando.local.yml](.lando.local.yml) file for an example of how to configure
Xdebug for use with WSL2 when you want your browser in Windows to trigger an
Xdebug session in your WSL2 integrated IDE.

