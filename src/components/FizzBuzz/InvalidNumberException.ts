export class InvalidNumberException extends Error {
    constructor(message: string = 'The number must be a positive integer.') {
        super(message);
        this.name = 'InvalidNumberException';
    }
}
