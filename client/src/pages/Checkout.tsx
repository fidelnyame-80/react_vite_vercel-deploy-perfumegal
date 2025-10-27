import { useState } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      return await apiRequest("POST", "/api/orders", orderData);
    },
    onSuccess: () => {
      clearCart();
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase. You will receive a confirmation email shortly.",
      });
      setLocation("/");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const shippingCost = total >= 100 ? 0 : 10;
    const finalTotal = total + shippingCost;

    createOrderMutation.mutate({
      ...formData,
      total: finalTotal.toString(),
      items: JSON.stringify(
        items.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        }))
      ),
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (items.length === 0) {
    setLocation("/cart");
    return null;
  }

  const shippingCost = total >= 100 ? 0 : 10;
  const finalTotal = total + shippingCost;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1
            className="font-serif text-4xl md:text-5xl font-semibold mb-8 text-foreground"
            data-testid="heading-checkout"
          >
            Checkout
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6">
                  <h2 className="font-serif text-2xl font-semibold mb-6 text-card-foreground">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="customerName">Full Name</Label>
                      <Input
                        id="customerName"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                        data-testid="input-name"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          data-testid="input-email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          data-testid="input-phone"
                        />
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="font-serif text-2xl font-semibold mb-6 text-card-foreground">
                    Shipping Address
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        data-testid="input-address"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          data-testid="input-city"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          required
                          data-testid="input-postal-code"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          data-testid="input-country"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card className="p-6 sticky top-32">
                  <h2 className="font-serif text-2xl font-semibold mb-6 text-card-foreground" data-testid="heading-order-summary">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex gap-3"
                        data-testid={`order-item-${item.product.id}`}
                      >
                        <div className="w-16 h-20 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 text-sm">
                          <p className="font-medium text-card-foreground line-clamp-2">
                            {item.product.name}
                          </p>
                          <p className="text-muted-foreground">Qty: {item.quantity}</p>
                          <p className="font-semibold text-card-foreground">
                            ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-card-border pt-4 space-y-3 mb-6">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span data-testid="text-checkout-subtotal">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span data-testid="text-checkout-shipping">
                        {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="border-t border-card-border pt-3">
                      <div className="flex justify-between text-lg font-semibold text-card-foreground">
                        <span>Total</span>
                        <span data-testid="text-checkout-total">${finalTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={createOrderMutation.isPending}
                    data-testid="button-complete-order"
                  >
                    {createOrderMutation.isPending ? "Processing..." : "Complete Order"}
                  </Button>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
