'use strict';

angular.module('BBAdminSettings', ['BB', 'BBAdmin.Services', 'BBAdmin.Filters', 'BBAdmin.Controllers', 'trNgGrid']);

angular.module('BBAdminSettingsMockE2E', ['BBAdminSettings', 'BBAdminMockE2E']);
'use strict';

angular.module('BBAdminSettings').config(function ($logProvider) {
    'ngInject';

    $logProvider.debugEnabled(true);
});
'use strict';

angular.module('BBAdminSettings').directive('adminTable', function ($log, ModalForm, BBModel) {

    var controller = function controller($scope) {

        $scope.getAdministrators = function () {
            var params = { company: $scope.company };
            return BBModel.Admin.Administrator.$query(params).then(function (administrators) {
                $scope.admin_models = administrators;
                return $scope.administrators = _.map(administrators, function (administrator) {
                    return _.pick(administrator, 'id', 'name', 'email', 'role');
                });
            });
        };

        $scope.newAdministrator = function () {
            return ModalForm.new({
                company: $scope.company,
                title: 'New Administrator',
                new_rel: 'new_administrator',
                post_rel: 'administrators',
                success: function success(administrator) {
                    return $scope.administrators.push(administrator);
                }
            });
        };

        return $scope.edit = function (id) {
            var admin = _.find($scope.admin_models, function (p) {
                return p.id === id;
            });
            return ModalForm.edit({
                model: admin,
                title: 'Edit Administrator'
            });
        };
    };

    var link = function link(scope, element, attrs) {
        if (scope.company) {
            return scope.getAdministrators();
        } else {
            return BBModel.Admin.Company.$query(attrs).then(function (company) {
                scope.company = company;
                return scope.getAdministrators();
            });
        }
    };

    return {
        controller: controller,
        link: link,
        templateUrl: 'admin-table/admin_table_main.html'
    };
});
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

angular.module('BB.Models').factory("Admin.AdministratorModel", function ($q, AdminAdministratorService, BBModel, BaseModel) {
    return function (_BaseModel) {
        _inherits(Admin_Administrator, _BaseModel);

        function Admin_Administrator(data) {
            _classCallCheck(this, Admin_Administrator);

            return _possibleConstructorReturn(this, _BaseModel.call(this, data));
        }

        Admin_Administrator.$query = function $query(params) {
            return AdminAdministratorService.query(params);
        };

        return Admin_Administrator;
    }(BaseModel);
});
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

angular.module('BB.Models').factory("Admin.UserModel", function ($q, BBModel, BaseModel) {
    return function (_BaseModel) {
        _inherits(Admin_User, _BaseModel);

        function Admin_User(data) {
            _classCallCheck(this, Admin_User);

            var _this = _possibleConstructorReturn(this, _BaseModel.call(this, data));

            _this.companies = [];
            if (data) {
                if (_this.$has('companies')) {
                    _this.$get('companies').then(function (comps) {
                        return _this.companies = comps;
                    });
                }
            }
            return _this;
        }

        return Admin_User;
    }(BaseModel);
});
'use strict';

angular.module('BBAdmin.Services').factory('AdminAdministratorService', function ($q, BBModel) {

    return {
        query: function query(params) {
            var company = params.company;

            var defer = $q.defer();
            company.$get('administrators').then(function (collection) {
                return collection.$get('administrators').then(function (administrators) {
                    var models = Array.from(administrators).map(function (a) {
                        return new BBModel.Admin.Administrator(a);
                    });
                    return defer.resolve(models);
                }, function (err) {
                    return defer.reject(err);
                });
            }, function (err) {
                return defer.reject(err);
            });
            return defer.promise;
        }
    };
});
"use strict";

angular.module("BBAdminSettings").config(function ($translateProvider) {
    "ngInject";

    var translations = {
        SETTINGS: {
            ADMIN_TABLE: {
                NEW_ADMINISTRATOR: "New Administrator",
                EDIT: "@:COMMON.BTN.EDIT"
            },
            ADMIN_FORM: {
                OK_BTN: "@:COMMON.BTN.OK",
                CANCEL_BTN: "@:COMMON.BTN.CANCEL"
            }
        }
    };

    $translateProvider.translations("en", translations);
});