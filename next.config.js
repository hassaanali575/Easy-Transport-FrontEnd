/** @type {import('next').NextConfig} */
 nextConfig = {
  reactStrictMode: true,
  crossOrigin: 'anonymous',
  images: {
    domains: [
      
             'res.cloudinary.com',
             'media.istockphoto.com',
             'upload.wikimedia.org',
             'media.istockphoto.com',
  ],
},
}

module.exports = nextConfig
