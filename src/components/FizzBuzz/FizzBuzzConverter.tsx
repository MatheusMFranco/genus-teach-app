import React from 'react';

import { FizzBuzz } from './FizzBuzz.model';
import { FizzRule } from './FizzRule';
import { BuzzRule } from './BuzzRule';
import { DefaultRule } from './DefaultRule';
import { FizzBuzzRule } from './FizzBuzzRule';
import { InvalidNumberException } from './InvalidNumberException';

class FizzBuzzConverter {
    private chain: FizzBuzz;

    constructor() {
        const fizzbuzz = new FizzBuzzRule();
        const fizz = new FizzRule();
        const buzz = new BuzzRule();
        const defaultRule = new DefaultRule();

        fizzbuzz
            .setNext(fizz)
            .setNext(buzz)
            .setNext(defaultRule);
        this.chain = fizzbuzz;
    }

    public convert(integerValue: number): string {
        if (!Number.isInteger(integerValue) || integerValue <= 0) {
            throw new InvalidNumberException();
        }
        return this.chain.handle(integerValue);
    }
}

export default FizzBuzzConverter;
