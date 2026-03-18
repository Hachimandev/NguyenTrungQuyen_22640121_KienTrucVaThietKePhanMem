package tax.state;

import tax.decorator.LuxuryTaxDecorator;
import tax.strategy.TaxStrategy;

public class LuxuryProductState implements ProductState {
    public double applyTax(TaxStrategy strategy, double price) {
        strategy = new LuxuryTaxDecorator(strategy);
        return strategy.calculate(price);
    }
}
