"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = __importStar(require("lodash"));
var service_1 = __importDefault(require("./service"));
var handle_1 = __importDefault(require("../../api/responses/handle"));
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.getAll = function (req, res) {
        service_1.default.getAll()
            .then(_.partial(handle_1.default.onSuccess, res))
            .catch(_.partial(handle_1.default.onError, res, 'Ocorreu um erro ao buscar todos os usuários!'));
    };
    UserController.prototype.findOne = function (req, res) {
        var id = parseInt(req.params.id);
        service_1.default.getById(id)
            .then(_.partial(handle_1.default.onSuccess, res))
            .catch(_.partial(handle_1.default.onError, res, "Ocorreu um erro ao buscar o usu\u00E1rio pelo id: " + id));
    };
    UserController.prototype.create = function (req, res) {
        service_1.default.create(req.body)
            .then(_.partial(handle_1.default.onSuccess, res))
            .catch(_.partial(handle_1.default.dbError, res))
            .catch(_.partial(handle_1.default.onError, res, 'Ocorreu um erro ao tentar criar um usuário!'));
    };
    UserController.prototype.update = function (req, res) {
        var id = parseInt(req.params.id);
        var props = req.body;
        service_1.default.update(id, props)
            .then(_.partial(handle_1.default.onSuccess, res))
            .catch(_.partial(handle_1.default.dbError, res))
            .catch(_.partial(handle_1.default.onError, res, 'Ocorreu um erro ao tentar atualizar o usuário!'));
    };
    UserController.prototype.delete = function (req, res) {
        var id = parseInt(req.params.id);
        service_1.default.delete(id)
            .then(_.partial(handle_1.default.onSuccess, res))
            .catch(_.partial(handle_1.default.dbError, res))
            .catch(_.partial(handle_1.default.onError, res, 'Ocorreu um erro ao tentar excluir um usuário!'));
    };
    return UserController;
}());
exports.default = new UserController();
