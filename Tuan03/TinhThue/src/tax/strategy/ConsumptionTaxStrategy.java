package tax.strategy;

public class ConsumptionTaxStrategy implements TaxStrategy {
    public double calculate(double price) {
        return price * 0.05;
    }
}