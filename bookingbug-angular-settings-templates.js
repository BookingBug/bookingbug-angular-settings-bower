angular.module("BB").run(["$templateCache", function($templateCache) {$templateCache.put("admin_form.html","<div class=\"modal-header\">\r\n  <h3 class=\"modal-title\">{{title}}</h3>\r\n</div>\r\n<form name=\"administrator_form\" ng-submit=\"submit(administrator_form)\">\r\n  <div class=\"modal-body\" sf-schema=\"schema\" sf-form=\"form\" sf-model=\"admin\"></div>\r\n  <div class=\"modal-footer\">\r\n    <input type=\"submit\" class=\"btn btn-primary\" value=\"OK\">\r\n    <button class=\"btn btn-default\" ng-click=\"cancel($event)\" translate=\"PROGRESS_CANCEL\"></button>\r\n  </div>\r\n</form>\r\n");
$templateCache.put("admin_table_main.html","<button class=\"btn btn-default\" ng-click=\"newAdministrator()\" translate=\"NEW_ADMINISTRATOR\"></button>\r\n<table tr-ng-grid=\"\" items=\"administrators\">\r\n   <tbody>\r\n    <tr>\r\n      <td>\r\n        <button class=\"btn btn-default btn-sm\" ng-click=\"edit(gridDisplayItem.id)\" translate=\"EDIT\"></button>\r\n      </td>\r\n    </tr>\r\n  </tbody>\r\n</table>\r\n");}]);