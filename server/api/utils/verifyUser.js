export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log('Authorization Header:', authHeader);

    if (!authHeader) return next(errorHandler(401, 'Unauthorized'));

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log('Error verifying token:', err);
            if (err.name === 'TokenExpiredError') {
                return next(errorHandler(401, 'Token expired'));
            } else {
                return next(errorHandler(403, 'Invalid token'));
            }
        }

        req.user = user;
        next();
    });
};
