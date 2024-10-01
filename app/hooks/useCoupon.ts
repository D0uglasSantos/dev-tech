import { useState } from "react";
import { toast } from "react-toastify";

const useCoupon = () => {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [usedCoupons, setUsedCoupons] = useState(new Set());

  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoupon(e.target.value);
  };

  const applyCoupon = () => {
    const coupons = { EOS11: 10, "11OFF": 20 } as { [key: string]: number };
    const appliedDiscount = coupons[coupon] || 0;

    if (usedCoupons.has(coupon)) {
      toast.error("Este cupom já foi utilizado!", { position: "bottom-left" });
      return;
    }

    setDiscount(appliedDiscount);

    const toastMessage =
      appliedDiscount > 0
        ? `${appliedDiscount}% de desconto adicionado`
        : "Cupom inválido!!";
    const toastType = appliedDiscount > 0 ? toast.success : toast.error;

    toastType(toastMessage, { position: "bottom-left" });

    if (appliedDiscount > 0) {
      setUsedCoupons((prev) => new Set(prev).add(coupon));
    }

    setCoupon("");
  };

  return { coupon, handleCouponChange, applyCoupon, discount };
};

export default useCoupon;
