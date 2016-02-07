var dominox;
(function (dominox) {
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
    dominox.DominoBone = DominoBone;
})(dominox || (dominox = {}));
//# sourceMappingURL=DominoBone.js.map