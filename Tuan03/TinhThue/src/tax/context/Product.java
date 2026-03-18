package tax.context;

import tax.state.ProductState;
import tax.strategy.TaxStrategy;

public class Product {
    private ProductState state;
    private TaxStrategy strategy;

    public Product(ProductState state, TaxStrategy strategy) {
        this.state = state;
        this.strategy = strategy;
    }

    public double calculateTax(double price) {
        return state.applyTax(strategy, price);
    }
}
