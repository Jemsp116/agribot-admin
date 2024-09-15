// middleware.js
import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired();

export const config = {
  matcher: ['/' ,'/add-robot', '/Analytics', '/messages', '/register', '/Manage-orders', '/home', '/api/robots', '/api/upload'],
};