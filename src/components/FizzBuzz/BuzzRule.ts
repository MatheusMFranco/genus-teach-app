import { AbstractRule } from './AbstractFizzBuzz';

export class BuzzRule extends AbstractRule {
    constructor() {
        super();
    }
    protected applyRule(positiveInteger: number): string {
        return positiveInteger % 5 === 0 ? 'Buzz' : '';
    }
}
