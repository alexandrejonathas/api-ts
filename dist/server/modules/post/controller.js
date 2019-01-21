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
var PostController = /** @class */ (function () {
    function PostController() {
    }
    PostController.prototype.getAll = function (req, res) {
        service_1.default.getAll()
            .then(_.partial(handle_1.default.onSuccess, res))
            .catch(_.partial(handle_1.default.onError, res, 'Ocorreu um erro ao buscar todos os autores!'));
    };
    PostController.prototype.findOne = function (req, res) {
        var id = parseInt(req.params.id);
        service_1.default.getById(id)
            .then(_.partial(handle_1.default.onSuccess, res))
            .catch(_.partial(handle_1.default.onError, res, "Ocorreu um erro ao buscar o autor pelo id: " + id));
    };
    PostController.prototype.create = function (req, res) {
        service_1.default.create(req.body)
            .then(_.partial(handle_1.default.onSuccess, res))
            .catch(_.partial(handle_1.default.dbError, res))
            .catch(_.partial(handle_1.default.onError, res, 'Ocorreu um erro ao tentar criar um autor!'));
    };
    PostController.prototype.update = function (req, res) {
        var id = parseInt(req.params.id);
        var props = req.body;
        service_1.default.update(id, props)
            .then(_.partial(handle_1.default.onSuccess, res))
            .catch(_.partial(handle_1.default.dbError, res))
            .catch(_.partial(handle_1.default.onError, res, 'Ocorreu um erro ao tentar atualizar o autor!'));
    };
    PostController.prototype.delete = function (req, res) {
        var id = parseInt(req.params.id);
        service_1.default.delete(id)
            .then(_.partial(handle_1.default.onSuccess, res))
            .catch(_.partial(handle_1.default.dbError, res))
            .catch(_.partial(handle_1.default.onError, res, 'Ocorreu um erro ao tentar excluir um autor!'));
    };
    return PostController;
}());
exports.default = new PostController();
