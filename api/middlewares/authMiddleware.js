const jwt = require("jsonwebtoken");
const asyncHandler = require("../asyncHandler");

// Function to extract token from request headers
const extractToken = (req) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        return authHeader.split(" ")[1];
    }
    return null;
};

// Middleware to verify JWT token and extract user details
const verifyToken = asyncHandler(async (req, res, next) => {
    const token = extractToken(req);

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized. No token provided.",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify token with secret key
        req.user = decoded; // Attach user data to request object
        next();
    } catch (err) {
        return res.status(403).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
});

const authMiddleware = {
    // ✅ Middleware for Admin Authentication
    isAdmin: asyncHandler(async (req, res, next) => {
        await verifyToken(req, res, async () => {
            if (req.user && req.user.role === "admin") {
                return next();
            }
            return res.status(403).json({
                success: false,
                message: "Access denied. Admins only.",
            });
        });
    }),

    // ✅ Middleware for User Authentication
    isUser: asyncHandler(async (req, res, next) => {
        await verifyToken(req, res, async () => {
            if (req.user && req.user.role === "user") {
                return next();
            }
            return res.status(403).json({
                success: false,
                message: "Access denied. Users only.",
            });
        });
    }),

    // ✅ Middleware for Blood Bank Authentication
    isBloodBank: asyncHandler(async (req, res, next) => {
        await verifyToken(req, res, async () => {
            if (req.user && req.user.role === "bloodBank") {
                return next();
            }
            return res.status(403).json({
                success: false,
                message: "Access denied. Blood banks only.",
            });
        });
    }),

    // ✅ Middleware for Admin OR Blood Bank Access
    isAdminOrBloodBank: asyncHandler(async (req, res, next) => {
        await verifyToken(req, res, async () => {
            if (req.user && (req.user.role === "admin" || req.user.role === "bloodBank")) {
                return next();
            }
            return res.status(403).json({
                success: false,
                message: "Access denied. Only Admins or Blood Banks are allowed.",
            });
        });
    }),

    // ✅ Middleware for User OR Blood Bank Access
    isUserOrBloodBank: asyncHandler(async (req, res, next) => {
        await verifyToken(req, res, async () => {
            if (req.user && (req.user.role === "user" || req.user.role === "bloodBank")) {
                return next();
            }
            return res.status(403).json({
                success: false,
                message: "Access denied. Only Users or Blood Banks are allowed.",
            });
        });
    }),

    isAdminOrUser: asyncHandler(async (req, res, next) => {
        await verifyToken(req, res, async () => {
            if (req.user && (req.user.role === "user" || req.user.role === "admin")) {
                return next();
            }
            return res.status(403).json({
                success: false,
                message: "Access denied. Only Users or Admins are allowed.",
            });
        });
    }),

    // ✅ Middleware for ANY Authenticated User (Admin, User, or Blood Bank)
    isAuthenticated: asyncHandler(async (req, res, next) => {
        await verifyToken(req, res, async () => {
            if (req.user && (req.user.role === "admin" || req.user.role === "user" || req.user.role === "bloodBank")) {
                return next();
            }
            return res.status(403).json({
                success: false,
                message: "Access denied. Please log in.",
            });
        });
    }),
};

module.exports = authMiddleware;
