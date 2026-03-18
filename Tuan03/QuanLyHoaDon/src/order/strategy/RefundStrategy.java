package order.strategy;

public class RefundStrategy implements OrderStrategy {
    public void execute() {
        System.out.println("Hoàn tiền");
    }
}
