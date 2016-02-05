var com;
(function (com) {
    var dominox;
    (function (dominox) {
        var internal;
        (function (internal) {
            var dominoModels;
            (function (dominoModels) {
                var DominoBone = (function () {
                    function DominoBone(first, second) {
                        this.firstNumber = first;
                        this.secondNumber = second;
                    }
                    DominoBone.prototype.getFirst = function () {
                        return this.firstNumber;
                    };
                    DominoBone.prototype.getSecond = function () {
                        return this.secondNumber;
                    };
                    return DominoBone;
                })();
                dominoModels.DominoBone = DominoBone;
            })(dominoModels = internal.dominoModels || (internal.dominoModels = {}));
        })(internal = dominox.internal || (dominox.internal = {}));
    })(dominox = com.dominox || (com.dominox = {}));
})(com || (com = {}));
//# sourceMappingURL=DominoBone.js.map