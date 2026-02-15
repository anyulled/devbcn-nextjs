"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h2 className="display-4">Something went wrong!</h2>
        <button className="btn btn-danger mt-3" onClick={() => reset()}>
          Try again
        </button>
      </div>
    </div>
  );
}
