"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        imgSrc,
        ...props
      }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex gap-1 w-full">
              {imgSrc && (
                <div className="w-20 h-20 overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={"Product img"}
                    width={200}
                    height={200}
                    objectFit="contain"
                    className="w-full h-full hover:drop-shadow-lg"
                  />
                </div>
              )}
              <div className="grid gap-1 w-full">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
