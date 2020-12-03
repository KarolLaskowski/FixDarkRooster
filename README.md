# FixDarkRooster
JS script and simple CSS to fix missing colors and highlights of text, and editor background in RoosterJS rich text editor in dark moded Azure DevOps panel.

How to use it:

Copy JS script to your browser's custom JS script manager, like Tampermonkey extension for Chrome/Opera.
What it does:
- adds '!important' to all custom CSS color and background-color styles for texts inside editor fields (editable Descriptions, Comments and else). Dark Mode for Azure DevOps uses '!important' excessively in many places.
- injects CSS that stops editors background color to switch to white, when you start editing text. Flashing light colors in Dark mode were annoying.

... or ...

Copy CSS file to your browser's custom CSS rules manager, like Stylus extension for Chrome/Opera.
What it does:
- just overrides some Dark mode styles. Works the same as injected CSS from script above.
