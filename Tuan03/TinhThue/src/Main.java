import tax.context.Product;
import tax.state.LuxuryProductState;
import tax.strategy.VATStrategy;

public class Main {
    public static void main(String[] args) {
        Product product = new Product(
            new LuxuryProductState(),
            new VATStrategy()
        );

        int a = 1000;
        
        System.out.println("tien thue cua san pham a:" + product.calculateTax(a));
    }
}