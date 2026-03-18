package tax.decorator;

import tax.strategy.TaxStrategy;

public abstract class TaxDecorator implements TaxStrategy {
    protected TaxStrategy tax;

    public TaxDecorator(TaxStrategy tax) {
        this.tax = tax;
    }

    public double calculate(double price) {
        return tax.calculate(price);
    }
}
