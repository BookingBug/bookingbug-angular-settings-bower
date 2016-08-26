(function() {
  'use strict';
  angular.module('BBAdminSettings', ['BB', 'BBAdmin.Services', 'BBAdmin.Filters', 'BBAdmin.Controllers', 'trNgGrid']);

  angular.module('BBAdminSettings').config(["$logProvider", function($logProvider) {
    return $logProvider.debugEnabled(true);
  }]);

  angular.module('BBAdminSettingsMockE2E', ['BBAdminSettings', 'BBAdminMockE2E']);

}).call(this);

(function() {
  'use strict';
  angular.module('BBAdminSettings').directive('adminTable', ["$log", "ModalForm", "BBModel", function($log, ModalForm, BBModel) {
    var controller, link;
    controller = function($scope) {
      $scope.getAdministrators = function() {
        var params;
        params = {
          company: $scope.company
        };
        return BBModel.Admin.Administrator.$query(params).then(function(administrators) {
          $scope.admin_models = administrators;
          return $scope.administrators = _.map(administrators, function(administrator) {
            return _.pick(administrator, 'id', 'name', 'email', 'role');
          });
        });
      };
      $scope.newAdministrator = function() {
        return ModalForm["new"]({
          company: $scope.company,
          title: 'New Administrator',
          new_rel: 'new_administrator',
          post_rel: 'administrators',
          success: function(administrator) {
            return $scope.administrators.push(administrator);
          }
        });
      };
      return $scope.edit = function(id) {
        var admin;
        admin = _.find($scope.admin_models, function(p) {
          return p.id === id;
        });
        return ModalForm.edit({
          model: admin,
          title: 'Edit Administrator'
        });
      };
    };
    link = function(scope, element, attrs) {
      if (scope.company) {
        return scope.getAdministrators();
      } else {
        return BBModel.Admin.Company.$query(attrs).then(function(company) {
          scope.company = company;
          return scope.getAdministrators();
        });
      }
    };
    return {
      controller: controller,
      link: link,
      templateUrl: 'admin_table_main.html'
    };
  }]);

}).call(this);

(function() {
  'use strict';
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  angular.module('BB.Models').factory("Admin.AdministratorModel", ["$q", "AdminAdministratorService", "BBModel", "BaseModel", function($q, AdminAdministratorService, BBModel, BaseModel) {
    var Admin_Administrator;
    return Admin_Administrator = (function(superClass) {
      extend(Admin_Administrator, superClass);

      function Admin_Administrator(data) {
        Admin_Administrator.__super__.constructor.call(this, data);
      }

      Admin_Administrator.$query = function(params) {
        return AdminAdministratorService.query(params);
      };

      return Admin_Administrator;

    })(BaseModel);
  }]);

}).call(this);

(function() {
  'use strict';
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  angular.module('BB.Models').factory("Admin.UserModel", ["$q", "BBModel", "BaseModel", function($q, BBModel, BaseModel) {
    var Admin_User;
    return Admin_User = (function(superClass) {
      extend(Admin_User, superClass);

      function Admin_User(data) {
        Admin_User.__super__.constructor.call(this, data);
        this.companies = [];
        if (data) {
          if (this.$has('companies')) {
            this.$get('companies').then((function(_this) {
              return function(comps) {
                return _this.companies = comps;
              };
            })(this));
          }
        }
      }

      return Admin_User;

    })(BaseModel);
  }]);

}).call(this);

(function() {
  'use strict';
  angular.module('BBAdmin.Services').factory('AdminAdministratorService', ["$q", "BBModel", function($q, BBModel) {
    return {
      query: function(params) {
        var company, defer;
        company = params.company;
        defer = $q.defer();
        company.$get('administrators').then(function(collection) {
          return collection.$get('administrators').then(function(administrators) {
            var a, models;
            models = (function() {
              var i, len, results;
              results = [];
              for (i = 0, len = administrators.length; i < len; i++) {
                a = administrators[i];
                results.push(new BBModel.Admin.Administrator(a));
              }
              return results;
            })();
            return defer.resolve(models);
          }, function(err) {
            return defer.reject(err);
          });
        }, function(err) {
          return defer.reject(err);
        });
        return defer.promise;
      }
    };
  }]);

}).call(this);
