import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
    const header = req.headers.authorization;

    if (!header) return res.status(401).json({error: "Didn't received token."});

    const token = header.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).json({error: "Recevied invalid/expired token."});
    }
}