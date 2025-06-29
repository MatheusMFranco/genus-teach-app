import FizzBuzzConverter from './FizzBuzzConverter';
import { InvalidNumberException } from './InvalidNumberException';

describe('FizzBuzz Converter', () => {

    let converter: FizzBuzzConverter;

    beforeEach(() => converter = new FizzBuzzConverter());

    test.each([
        [1, '1'],
        [2, '2'],
        [4, '4'],
        [7, '7'],
        [8, '8'],
        [11, '11'],
        [13, '13'],
        [14, '14'],
        [16, '16'],
    ])('should convert number to Fizzbuzz strings', (given: number, result: string) => {
        expect(converter.convert(given)).toBe(result);
    });

    test.each([ 
        3, 6, 9, 12, 18,
    ])('should convert multiples of 3 to Fizz', (given: number) => {
        expect(converter.convert(given)).toBe('Fizz');
    });

    test.each([
        5, 10, 20,
    ])('should convert multiples of 5 to Buzz', (given: number) => {
        expect(converter.convert(given)).toBe('Buzz');
    });

    test.each([
        15, 30
    ])('should convert 15 to FizzBuzz', (given: number) => {
        expect(converter.convert(given)).toBe('FizzBuzz');
    });

    test.each([
        0, -1, 3.14
    ])('should throw InvalidNumberException for 0', (given: number) => {
        expect(() => converter.convert(given)).toThrow(InvalidNumberException);
        expect(() => converter.convert(given)).toThrow('The number must be a positive integer.');
    });

});
