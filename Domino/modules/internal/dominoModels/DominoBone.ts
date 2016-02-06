module dominox
{
    export class DominoBone {
        private firstNumber: Number;
        private secondNumber: Number;

        public getFirst(): Number {
            return this.firstNumber;
        }

        public getSecond(): Number {
            return this.secondNumber;
        }

        constructor(first: Number, second: Number) {
            this.firstNumber = first;
            this.secondNumber = second;
        }
    }
}