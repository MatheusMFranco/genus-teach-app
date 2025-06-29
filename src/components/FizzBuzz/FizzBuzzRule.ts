import { AbstractRule } from './AbstractFizzBuzz';

export class FizzBuzzRule extends AbstractRule {
    constructor() {
        super();
    }
    protected applyRule(positiveInteger: number): string {
        return positiveInteger % 3 === 0 && positiveInteger % 5 === 0 ? 'FizzBuzz' : '';
    }
}
