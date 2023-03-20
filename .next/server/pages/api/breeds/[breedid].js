"use strict";
(() => {
var exports = {};
exports.id = 272;
exports.ids = [272];
exports.modules = {

/***/ 142:
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ 467:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(142);
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_0__);

dotenv__WEBPACK_IMPORTED_MODULE_0___default().config();
const apiKey = process.env.THECATAPI_KEY;
async function getBreedData(breedid) {
    try {
        const response = await fetch(`https://api.thecatapi.com/v1/breeds/${breedid}`);
        const data = response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
const requestOptions = {
    method: "GET",
    headers: {
        "x-api-key": apiKey
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res)=>{
    const { breedid  } = req.query;
    if (typeof breedid !== "string") res.status(500).json({
        error: "breedid<string> required"
    });
    else try {
        getBreedData(breedid).then((data)=>res.status(200).json(data));
    } catch (error) {
        res.status(500).json({
            error
        });
    }
});


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(467));
module.exports = __webpack_exports__;

})();