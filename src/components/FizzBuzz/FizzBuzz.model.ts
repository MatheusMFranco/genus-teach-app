export interface FizzBuzz {
    setNext(rule: FizzBuzz): FizzBuzz;
    handle(positiveInteger: number): string;
}
