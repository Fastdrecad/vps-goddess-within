module.exports = {
  pagination: process.env.PAGINATION_LIMIT,
  app: {
    name: 'goddess-within',
    apiURL: process.env.BASE_API_URL,
    clientURL: process.env.CLIENT_URL
  },
  port: process.env.PORT || 3000,
  database: {
    url: process.env.MONGO_URI
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    tokenLife: '7d'
  },
  mailchimp: {
    key: process.env.MAILCHIMP_KEY,
    listKey: process.env.MAILCHIMP_LIST_KEY
  },
  mailgun: {
    key: process.env.MAILGUN_KEY,
    domain: process.env.MAILGUN_DOMAIN,
    sender: process.env.MAILGUN_EMAIL_SENDER
  },
  paypal: {
    key: process.env.PAYPAL_CLIENT_ID,
    secret: process.env.PAYPAL_APP_SECRET,
    apiUrl: process.env.PAYPAL_API_URL
  },
  cloudinary: {
    name: process.env.CLOUD_NAME,
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET
  }
};
