<!DOCTYPE html>
<html>
  <head>
    <title><%= patternName %> Pattern</title>
    <script src="components/requirejs/require.js"></script>
    <script src="config.js"></script>
    <script>
       require(['jquery', 'mockup-registry','plone-patterns-<%= patternNameLower %>'],
         function($, registry) {
           $(document).ready(function (){
             registry.scan($('body'));
           });
       });
     </script>
  </head>

  <body data-pat-<%= patternNameLower %>="bgcolor:orange">
  <label class="pat-<%= patternNameLower %>"
        data-pat-<%= patternNameLower %>="color:white; bgcolor:black">(no greeting yet)</label>
    <br>
    <label class="pat-<%= patternNameLower %>"
        data-pat-<%= patternNameLower %>="color:green">(no greeting yet)</label>
  </body>
</html>
