<?php
// A simple script to check if Xdebug is properly installed and configured.
// Place this file in your webroot and open it in your browser to see useful
// troubleshooting information.
// Created by: Aaron Feledy @AaronFeledy
// License: MIT
echo '<html lang="en">';
echo '<head>';
echo '<title>Xdebug Diag</title>';
echo '<style>';
echo 'body { font-family: sans-serif; }';
echo 'details { margin-left: 1em; }';
echo 'summary { cursor: pointer; color: blue; }';
echo '</style>';
echo '</head>';
echo '<body>';
echo '<h1>Xdebug Diag</h1>';

echo '<ul>';
// Check to see if Xdebug is installed
if (function_exists('xdebug_break')) {
  echo '<li>Xdebug php extension is installed and enabled</li>';
  if (isset($_COOKIE["XDEBUG_SESSION"])) {
    $session_start=$_COOKIE["XDEBUG_SESSION"];
    echo '<li>Debug session is activated by cookie</li>';
  }
  if (isset($_REQUEST["XDEBUG_SESSION_START"])) {
    $session_start=$_REQUEST["XDEBUG_SESSION_START"];
    echo '<li>Debug session is activated by URL query parameter</li>';
  }

  // Check to see if a debug session is enabled via Xdebug browser extension or query parameter
  if (xdebug_is_debugger_active()) {
    echo '<li><strong>Xdebug is active and successfully connected to your IDE!</strong></li>';
  } else {
    echo '<li>Debugging session not active</li>';
    // This will force-start an xdebug session
    xdebug_connect_to_client();
    // Try again to connect
    if (xdebug_is_debugger_active()) {
      echo '<li>Xdebug was able to connect to your IDE. However, debugging is not enabled.<br/>';
      if (isset($session_start)) {
        echo 'Is your IDE configured to only respond to a specic session name? Session started as: ' . $session_start . '</li>';
      } else {
        echo 'Be sure to enable debugging via the Xdebug browser extension or XDEBUG_SESSION_START=LANDO query parameter in the URL</li>';
      }
    } else {
      echo '<li>Could not connect. Is your IDE listening for Xdebug connections?</li>';
    }
  }

} else {
  echo '<li><strong>The Xdebug php extension is not enabled.</strong>';
  if (isset($_ENV['LANDO'])) {
    // Lando specific instructions
    echo '<br/>Ensure Xdebug is enabled in your Lando config.';
    echo '<br/>Some configurations enable it via the `lando xdebug-on` command.';
    echo '<br/>Otherwise, you can enable it by adding the following to your .lando.yml:';
    echo "<pre>config:\n  xdebug: debug,develop</pre>";
    echo '<br/>Then run `lando rebuild` to apply the changes.';
  } else {
    // Generic instructions
    echo '<br/>Ensure Xdebug is enabled in your php.ini file.';
    echo '<pre>';
    echo php_ini_loaded_file();
    echo php_ini_scanned_files();
    echo '</pre>';
  }
  echo '</li>';
}
echo '</ul>';

echo '<h2>Info</h2>';
echo '<ul>';
echo '<li>PHP Version: ' . phpversion() . '</li>';
echo '<li>Xdebug Version: ' . phpversion('xdebug') . '</li>';
echo '</ul>';
if (function_exists('xdebug_info')) {
  // Details element
  echo '<details><summary>Full Xdebug info</summary>';
  xdebug_info();
  echo '</details>';
}

echo '</body>';
echo '</html>';
