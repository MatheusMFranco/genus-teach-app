import { AbstractRule } from './AbstractFizzBuzz';

export class DefaultRule extends AbstractRule {
    constructor() {
        super();
    }
    protected applyRule(positiveInteger: number): string {
        return `${positiveInteger}`;
    }

    public handle(positiveInteger: number): string {
        const result = super.handle(positiveInteger);
        return result || `${positiveInteger}`;
    }
}
