'use client'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html>
            <body>
                <div className="container d-flex align-items-center justify-content-center vh-100">
                    <div className="text-center">
                        <h2>Something went wrong!</h2>
                        <button className="btn btn-primary" onClick={() => reset()}>Try again</button>
                    </div>
                </div>
            </body>
        </html>
    )
}
