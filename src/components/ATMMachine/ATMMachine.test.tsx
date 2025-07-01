import AtmMachine from './AtmMachine';
import InsufficientCashError from './InsufficientCashError';

describe('ATM Machine Test', () => {

    let atm: AtmMachine;

    beforeEach(() => {
        atm = new AtmMachine([
            { cash: 500, amount: 2, kind: 'BILL' },
            { cash: 200, amount: 3, kind: 'BILL' },
            { cash: 100, amount: 5, kind: 'BILL' },
            { cash: 50, amount: 12, kind: 'BILL' },
            { cash: 20, amount: 20, kind: 'BILL' },
            { cash: 10, amount: 50, kind: 'BILL' },
            { cash: 5, amount: 100, kind: 'BILL' },
            { cash: 2, amount: 250, kind: 'COIN' },
            { cash: 1, amount: 500, kind: 'COIN' },
        ]);
    });
    test('should returns 1 bill of 200 for 436', () => {
        const money = [
            { cash: 200, amount: 2, kind: 'BILL' },
            { cash: 20, amount: 1, kind: 'BILL' },
            { cash: 10, amount: 1, kind: 'BILL' },
            { cash: 5, amount: 1, kind: 'BILL' },
            { cash: 1, amount: 1, kind: 'COIN' },
        ];
        expect(atm.withdrawn(436)).toEqual(money)
    });

    test('should initiate the state with 5100 in cash', () => {
        expect(atm.howMuch).toBe(5100);
    });

    test('should discount 530 euro to 5100 and returns 4570', () => {
        atm.withdrawn(530);
        expect(atm.howMuch).toBe(4570);
    });

    test('should returns the money at state', () => {
        atm.withdrawn(530);
        expect(atm.money).toEqual([
            { cash: 500, amount: 1, kind: 'BILL' },
            { cash: 200, amount: 3, kind: 'BILL' },
            { cash: 100, amount: 5, kind: 'BILL' },
            { cash: 50, amount: 12, kind: 'BILL' },
            { cash: 20, amount: 19, kind: 'BILL' },
            { cash: 10, amount: 49, kind: 'BILL' },
            { cash: 5, amount: 100, kind: 'BILL' },
            { cash: 2, amount: 250, kind: 'COIN' },
            { cash: 1, amount: 500, kind: 'COIN' },
        ]);
    });

    test('should throw an insuficient exception', () => {
        expect(() => atm.withdrawn(5120)).toThrow(InsufficientCashError);
    })

});
