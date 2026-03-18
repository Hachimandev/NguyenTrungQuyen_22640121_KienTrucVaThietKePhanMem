package tax.state;

import tax.strategy.TaxStrategy;

public interface ProductState {
    double applyTax(TaxStrategy strategy, double price);
}
