package tax.state;

import tax.strategy.TaxStrategy;

public class NormalProductState implements ProductState {
    public double applyTax(TaxStrategy strategy, double price) {
        return strategy.calculate(price);
    }
}