export default class InsufficientCashError extends Error {
    constructor(message = 'Insufficient cash available to dispense the requested amount.' ) {
        super(message);
        this.name = 'InsufficientCashError';
    }
}
