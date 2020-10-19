//import * as functions from 'firebase-functions';
const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "knowledgebase-production",
    "private_key_id": "05305b6b47333357aca015e833295acf256dca01",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC/dzTTpFwpvaC8\nVXzKcj41tIq0IxTrZ2mTQaFUofXQJtg6grKB/j9v8tB/kymHZFYK/jmLnhYKSdjN\n4QGzsgosHjRpG2XEHdOu7bYTmEUBQD7BpvlC0efib2epd6hWoNGP9qora1FqEli7\n9HNyO1kUJgUzZb1ADlAPcbgHJGRDlEKHjEobBgQy+MbsYgZzzqDvQoFQGJQU4mGp\n1/0s3vAuUwLoEoBe+2q/Z3OqfWZV9BbX1nr5CjD/A/83HjemdFs7J9c0hpxdCrfU\nKaSmETkNHz2y0QMwVzg9qCKfrpkisxd1fY00MqAfRad/vuGkjy7k/UUZ5Zgds1Wn\nEUyB+0mJAgMBAAECggEAEZy5DsjdM3e+i+R/PK4im9UWNzjM6VSTaRjN6teVIYcZ\nN9Si8AM/uaAH3txeIxavNYaqK3Yox9yAJXwPqIR1nBZRMuPyygYGXV5/c7D7lABh\nZXXjEur1HiaqTfP0V7emX0xM3f6auBuk7vEvF3BvIsPWkaJHtNc8NRd8WqfV00Ns\nmEYEW4GBOQqTByJ4IvT24tjQO2MSQlBvkUncvwIbAsKZatzs8pycVbJRrmlaVzGY\n6KiwVSHPkC00GgJvLf9oD4a6cnAWWmZfci53RfIJzyPHMHJ6+0mWx4faFQwzccw/\ntDh60Ooqhm/X2IbprIgT5Wsf/0hBFq2VJslp2JT9KQKBgQD3t0bqSTYzdkhbGsui\nj6ldK2TYPPZKtEuwDs9C50yUOoTAGIV5iu7Cw1ug7wPSdGM55y+fLm1r9s8GpLuU\nXpooabb+0YX7XfI5dfLnPBjkucuduCyR7ztIhvuJGVucwwYHu4Odd7WpXSKZcHg6\nqVoKIIFSXSJZJWn7m2c/AHUSdQKBgQDF3l1XF5D6kCbqrIQDOQzKUsXwv0C04df9\nGUkPgSKXMloXLfp3h1rxTvlFa548RiAirYgisb45R8lwGgRQqwEde3q9oHKijAb7\nvlZFpTIHSVf8HlOyxDIJW3mjD/ZZTu/GF/GG36DvLInZv5Rax8An3hxiZySEd3Y5\nJAlRN24QRQKBgQDo9aqycJGRih5311ZElfiAD2wyU/qHvNElTHgsghuplvL7ONRl\nvnvWHCUSz1T32c7rSHinqeDr1NtTcx6ZZPJzKSAYunDXOb2vvjXmssTybayIsgjw\nYVyOU6tAfuGCJoKISRd4wnjMQzNju7rF6DguJ+2WyNGhpqbqIXbScBqpdQKBgEa7\nyxpLLmSkC4VwznBogI4DMQdzFyqSYaf01g1Y2Ii8U0BeC1+XX4dL+Ag9BH//gZVj\n+3qLl7jaVMRiSJCd0PQ9JA+Nv+0jqYts62JSP6QjL/TM0pbhVBHMRZtpJWOfuE9U\nV98jKmDVxyG0PtCE/8hAulzjCkbgfb7Hhx0ld48RAoGAX4k27t+h8pJTFkHEoQaN\nBvyxoBFTq1aJ8Mrakp3AYW+8o5EdaydNPmYnJdD5eSDi2rxjz3YU3nuHle/ygt70\niyltl7AVrWX6ZwWdo1ayf/7DZUGPmpLf5pdz+XHIRvIosv+0Txp+iaPY/WXVsuah\nfBhn0lmCqTCo4iFsibEVra4=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-kwa3c@knowledgebase-production.iam.gserviceaccount.com",
    "client_id": "102634729237890503617",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-kwa3c%40knowledgebase-production.iam.gserviceaccount.com"
  }),
  databaseURL: "https://knowledgebase-production.firebaseio.com"
});
// admin.initializeApp(functions.config().firebase);

export default admin;