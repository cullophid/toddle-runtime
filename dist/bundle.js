import regeneratorRuntime from "regenerator-runtime";
import { renderComponent } from "./runtime";
import { colors, spacing } from "./theme";
import { parseQuery } from "./util";
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
        for(var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {
        };
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}
export var fetchComponents = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id) {
    var res, data, errors, component, fetchSubComponents, subComponents;
    return regeneratorRuntime.wrap(function _callee$(_ctx) {
        while(1)switch(_ctx.prev = _ctx.next){
            case 0:
                console.log({
                    id: id
                });
                _ctx.next = 3;
                return fetch("https://toddle.onrender.com/v1/graphql", {
                    method: "POST",
                    headers: {
                        "x-hasura-admin-secret": "wj75DVgisfBanV4"
                    },
                    body: JSON.stringify({
                        query: "\n      query FetchComponentById($id:uuid!) {\n        component(id:$id) {\n          events\n          functions\n          _project\n          id\n          initialState\n          name\n          nodes\n          props\n              variables\n          queries {\n            documentNode\n            variables\n            api {\n              id\n              auth\n              headers\n              url\n            }\n          }\n      \n        }\n      }\n      ",
                        variables: {
                            id: id
                        }
                    })
                });
            case 3:
                res = _ctx.sent;
                if (!(res.ok === false)) {
                    _ctx.next = 8;
                    break;
                }
                _ctx.next = 7;
                return res.text();
            case 7:
                throw new Error(_ctx.sent);
            case 8:
                _ctx.next = 10;
                return res.json();
            case 10:
                var ref;
                ref = _ctx.sent, data = ref.data, errors = ref.errors, ref;
                console.log({
                    id: id,
                    errors: errors,
                    data: data
                });
                component = data.component;
                fetchSubComponents = _asyncToGenerator(regeneratorRuntime.mark(function _callee1(names, componentMap) {
                    var result, data1, components, subComponents1;
                    return regeneratorRuntime.wrap(function _callee$1(_ctx1) {
                        while(1)switch(_ctx1.prev = _ctx1.next){
                            case 0:
                                if (!(names.length === 0)) {
                                    _ctx1.next = 2;
                                    break;
                                }
                                return _ctx1.abrupt("return", componentMap);
                            case 2:
                                _ctx1.next = 4;
                                return fetch("https://toddle.onrender.com/v1/graphql", {
                                    method: "POST",
                                    headers: {
                                        "x-hasura-admin-secret": "wj75DVgisfBanV4"
                                    },
                                    body: JSON.stringify({
                                        query: "\n      query getComponentsByName($names: [String!]!, $project: uuid!) {\n          components(where: { name: { _in: $names }, _project: { _eq: $project } }) {\n          id\n          name\n          _project\n          variables\n          props\n          functions\n          events\n          nodes\n          page {\n            id\n            path\n            requireAuth\n          }\n          queries {\n              id\n              type\n              documentNode\n              name\n              variables\n              api {\n                id\n                headers\n                auth\n                name\n                url\n                _project\n              }\n          }\n\n          }\n        }\n      ",
                                        variables: {
                                            project: component._project,
                                            names: names
                                        }
                                    })
                                });
                            case 4:
                                result = _ctx1.sent;
                                _ctx1.next = 7;
                                return result.json();
                            case 7:
                                var ref1;
                                ref1 = _ctx1.sent, data1 = ref1.data, ref1;
                                components = data1.components;
                                subComponents1 = components.flatMap(function(component1) {
                                    return Object.values(component1.nodes);
                                }).filter(function(node) {
                                    return node.type === "component" && componentMap[node.name] === undefined;
                                }).map(function(node) {
                                    return node.name;
                                });
                                return _ctx1.abrupt("return", fetchSubComponents(subComponents1, components.reduce(function(acc, c) {
                                    return _objectSpread({
                                    }, acc, _defineProperty({
                                    }, c.name, c));
                                }, componentMap)));
                            case 11:
                            case "end":
                                return _ctx1.stop();
                        }
                    }, _callee1);
                }));
                if (!component) {
                    _ctx.next = 20;
                    break;
                }
                _ctx.next = 17;
                return fetchSubComponents(Object.values(component.nodes).filter(function(c) {
                    return c.type === "component";
                }).map(function(c) {
                    return c.name;
                }), {
                });
            case 17:
                _ctx.t0 = _ctx.sent;
                _ctx.next = 21;
                break;
            case 20:
                _ctx.t0 = undefined;
            case 21:
                subComponents = _ctx.t0;
                return _ctx.abrupt("return", {
                    name: component.name,
                    components: _objectSpread({
                    }, subComponents, _defineProperty({
                    }, component.name, component))
                });
            case 23:
            case "end":
                return _ctx.stop();
        }
    }, _callee);
}));
var main = _asyncToGenerator(regeneratorRuntime.mark(function _callee1() {
    var query, root, components, name;
    return regeneratorRuntime.wrap(function _callee$(_ctx) {
        while(1)switch(_ctx.prev = _ctx.next){
            case 0:
                insertTheme();
                console.log(window.location.search);
                query = parseQuery(window.location.search);
                root = document.getElementById("App");
                if (root) {
                    _ctx.next = 6;
                    break;
                }
                throw new Error("Cant find node with id 'App'");
            case 6:
                _ctx.next = 8;
                return fetchComponents(typeof query.id === "string" ? query.id : "b03b483d-04e0-496f-98ed-92fcb4280426");
            case 8:
                var ref;
                ref = _ctx.sent, components = ref.components, name = ref.name, ref;
                renderComponent(root, name, components);
            case 10:
            case "end":
                return _ctx.stop();
        }
    }, _callee1);
}));
var insertTheme = function() {
    var colorVars = Object.entries(colors).flatMap(function(param) {
        var _param = _slicedToArray(param, 2), color = _param[0], variants = _param[1];
        return Object.entries(variants).map(function(param1) {
            var _param1 = _slicedToArray(param1, 2), variant = _param1[0], value = _param1[1];
            return "--".concat(color, "-").concat(variant, ":").concat(value);
        });
    });
    var styleElem = document.createElement("style");
    styleElem.setAttribute("type", "text/css");
    styleElem.innerText = "\n      body {\n        --spacing:".concat(spacing, ";\n        ").concat(colorVars.join(";\n"), ";\n      }\n  ");
    document.head.appendChild(styleElem);
};
main();

