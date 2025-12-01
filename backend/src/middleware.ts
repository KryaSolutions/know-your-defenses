import type { Request, Response, NextFunction } from "express";

const middleware = (req: Request, res: Response, next: NextFunction): void => {
    res.set(
        "Content-Security-Policy",
        "default-src 'self'; " + "frame-ancestors 'none';"
    );

    res.set("Referrer-Policy", "strict-origin-when-cross-origin");

    if (req.secure || req.headers["x-forwarded-proto"] === "https") {
        res.setHeader(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains"
        );
    }

    res.set("X-Content-Type-Options", "nosniff");

    res.set("X-Frame-Options", "DENY");

    res.set(
        "Permissions-Policy",
        "geolocation=(), " +
            "microphone=(), " +
            "camera=(), " +
            "payment=(), " +
            "usb=(), " +
            "fullscreen=(), " +
            "vibrate=(), " +
            "magnetometer=(), " +
            "gyroscope=(), " +
            "speaker=(), " +
            "display-capture=()"
    );

    next();
};

export default middleware;
