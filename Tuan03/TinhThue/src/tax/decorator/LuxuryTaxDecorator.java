package tax.decorator;

import tax.strategy.TaxStrategy;

public class LuxuryTaxDecorator extends TaxDecorator {
    public LuxuryTaxDecorator(TaxStrategy tax) {
        super(tax);
    }

    public double calculate(double price) {
        return super.calculate(price) + price * 0.2;
    }
}
