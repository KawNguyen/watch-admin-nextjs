import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const PaymemtCoupon = () => {
  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="font-medium text-sm">Coupon Code</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input className="flex-1" placeholder="Enter code" />
            <Button size="sm">Apply</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymemtCoupon;
