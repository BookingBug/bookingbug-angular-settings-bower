angular.module("BB").run(["$templateCache", function($templateCache) {$templateCache.put("admin-table/admin_form.html","<div class=\"modal-header\">\n  <h3 class=\"modal-title\">{{title}}</h3>\n</div>\n<form name=\"administrator_form\" ng-submit=\"submit(administrator_form)\">\n  <div class=\"modal-body\" sf-schema=\"schema\" sf-form=\"form\" sf-model=\"admin\"></div>\n  <div class=\"modal-footer\">\n    <input type=\"submit\" class=\"btn btn-primary\" value=\"OK\">\n    <button class=\"btn btn-default\" ng-click=\"cancel($event)\">Cancel</button>\n  </div>\n</form>");
$templateCache.put("admin-table/admin_table_main.html","<button class=\"btn btn-default\" ng-click=\"newAdministrator()\">New Administrator</button>\n<table tr-ng-grid=\"\" items=\"administrators\">\n   <tbody>\n    <tr>\n      <td>\n        <button class=\"btn btn-default btn-sm\" ng-click=\"edit(gridDisplayItem.id)\">Edit</button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n");}]);