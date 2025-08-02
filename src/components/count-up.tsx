import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface CountUpProps {
  to: number;
  from?: number;
  direction?: "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  onStart?: () => void;
  onEnd?: () => void;
  /**
   * If true, formats the number as Vietnamese currency (VNĐ).
   * This will override the `separator` and decimal handling for currency format.
   * @default false
   */
  formatAsCurrency?: boolean;
}

export default function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  startWhen = true,
  separator = "",
  onStart,
  onEnd,
  formatAsCurrency = false, // New prop destructured here
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? to : from);

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(motionValue, {
    damping,
    stiffness,
  });

  const isInView = useInView(ref, { once: true, margin: "0px" });

  // Get number of decimal places in a number
  const getDecimalPlaces = (num: number): number => {
    const str = num.toString();
    if (str.includes(".")) {
      const decimals = str.split(".")[1];
      if (parseInt(decimals) !== 0) {
        return decimals.length;
      }
    }
    return 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = String(direction === "down" ? to : from);
    }
  }, [from, to, direction]);

  useEffect(() => {
    if (isInView && startWhen) {
      if (typeof onStart === "function") {
        onStart();
      }

      const timeoutId = setTimeout(() => {
        motionValue.set(direction === "down" ? from : to);
      }, delay * 1000);

      const durationTimeoutId = setTimeout(() => {
        if (typeof onEnd === "function") {
          onEnd();
        }
      }, delay * 1000 + duration * 1000);

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(durationTimeoutId);
      };
    }
  }, [
    isInView,
    startWhen,
    motionValue,
    direction,
    from,
    to,
    delay,
    onStart,
    onEnd,
    duration,
  ]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        let formattedNumber: string;

        // ---- MODIFICATION START ----
        if (formatAsCurrency) {
          // Logic for Vietnamese Currency formatting
          formattedNumber = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            // VND typically doesn't use decimal places, so we can force it to 0
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(latest);
        } else {
          // Original logic for number formatting
          const hasDecimals = maxDecimals > 0;
          const options: Intl.NumberFormatOptions = {
            useGrouping: !!separator,
            minimumFractionDigits: hasDecimals ? maxDecimals : 0,
            maximumFractionDigits: hasDecimals ? maxDecimals : 0,
          };
          const rawFormatted = Intl.NumberFormat("en-US", options).format(
            latest
          );
          formattedNumber = separator
            ? rawFormatted.replace(/,/g, separator)
            : rawFormatted;
        }
        // ---- MODIFICATION END ----

        ref.current.textContent = formattedNumber;
      }
    });

    return () => unsubscribe();
    // Add the new prop to the dependency array
  }, [springValue, separator, maxDecimals, formatAsCurrency]);

  return <span className={className} ref={ref} />;
}
