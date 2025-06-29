import { FizzBuzz } from './FizzBuzz.model';

export abstract class AbstractRule implements FizzBuzz {
    private nextRule?: FizzBuzz;

    public setNext(rule: FizzBuzz): FizzBuzz {
        this.nextRule = rule;
        return rule;
    }

    public handle(positiveInteger: number): string {
        const result = this.applyRule(positiveInteger);
        const nextResult = this.nextRule?.handle(positiveInteger) ?? '';
        return result || nextResult;
    }

    protected abstract applyRule(positiveInteger: number): string;
}
