package tax.strategy;

public class VATStrategy implements TaxStrategy {
    public double calculate(double price) {
        return price * 0.1;
    }
}
