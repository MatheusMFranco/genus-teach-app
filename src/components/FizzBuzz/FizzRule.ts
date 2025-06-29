import { AbstractRule } from './AbstractFizzBuzz';

export class FizzRule extends AbstractRule {
    constructor() {
        super();
    }
    protected applyRule(positiveInteger: number): string {
        return positiveInteger % 3 === 0 ? 'Fizz' : '';
    }
}
