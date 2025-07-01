import InsufficientCashError from './InsufficientCashError';
import { Money } from './Money.model';

class AtmMachine {

    readonly denominations = [500, 200, 100, 50, 20, 10, 5, 2, 1];

    constructor(private state: Money[]) {}

    public withdrawn(money: number): Money[] {
        const bills = new Array<Money>();
        this.denominations.map(cash => {
            const amount = Math.floor(money/cash);
            if (amount > 0) {
                bills.push({
                    cash,
                    amount,
                    kind: cash <= 2 ? 'COIN': 'BILL',
                });
                money -= amount * cash;
                const stateItem = this.state.find(item => item.cash === cash);
                if (stateItem) {
                    stateItem.amount -= amount;
                }
            }
        });
        if (this.howMuch < 0) {
            throw new InsufficientCashError();
        }
        return bills;
    }

    get howMuch(): number {
        return this.state
            .map(money => money.cash * money.amount)
            .reduce((a, b) => a + b);
    }

    get money(): Money[] {
        return this.state;
    }
}

export default AtmMachine;
