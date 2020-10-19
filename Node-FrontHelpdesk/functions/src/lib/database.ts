const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "knowledgebase-production",
    "private_key_id": "9b74beaf2745f8d3f754f452f7e09536d026c166",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCmUuBYZhW3sz7S\n/NtTp2esKNyHfEtE3p5JiOvlr59wVI11Mq/6J/SdWvqwXMEGwGXhYk6vnrCnApUy\npNhVLwiFVLQDDiG5LIatAx9NMNpPAgKhAssQDfGFSdvZ1j6D/BW9UEBNHJGbqORA\n6WLjB9+u66jkx2qNeEEzksgXdBE2qgaGu6wrAKdcLkdRxVH5TYh+7H5OAdVbudh/\nG9lvq219LPJXPzSUK4Isv1wUcGQB9o6PHV8G64YjLjB6XH9ShjoBNsgBdYrJ+zjh\n1OamtHFOYetw0Wfr1ri0o9dQ9Zd9CXYc7oMLylaLL/jVu9XTxuJSS4PWqvGQbmKN\nVFv34Kn/AgMBAAECggEAPnSZhOhUmGYpHa5Qp8GRhw7S/NdaJlLYKnHNbzL7EoHV\nmqA9f5i4XMxYnZg+7Yua1j8FoCHdYOFx6BIJoDcoonSToiAQ3smPCvHEs8Y3+/ob\nxZ1YZj9uJah983dlg0dKXIwBkVM8hDCwAYYCGZGP183rXnlZlCUHite/5jqx6g3k\nq5+qd6wrQwHRsQ7uzRPzPwpJNROXh2WdO9bwM096ZC7fpnU47/jxpOEjyh+i11Mn\nVCCoEfIOWfWVBDneXg2cZwWuKA8MevHLj3KlLfIZ8ZsrmGmAOIJfAfX7jozidFqv\n68IkvkK/bZaPfG+rVsvVlhVr6Ow6Zy1HNyqYl99WmQKBgQDPMJ4xeuO1pqE3wQLv\nh0axsUWRXvnc5YVag+91aSJhU03oKUul56Lx0cmSM7rCxNO0Chf2alrkI+n3XQW2\nxIx1TKtSznx8rLn/Vx1s72KFT0G+hyjGSp16GroIvYPl503D/Tr3wgM02ntMrQOL\ncf58IRUJWDIhY3cPevOM1LiQmQKBgQDNgaq30zWqlzts2zK+R0kVfSLvqnHF7TPr\nKodoKG4TtCS/ob99H3jFjjMmrkoW3DIHez+GeIozcyKiO9XH/QxmUnV3EFnsNRrV\nl50X6on3ZpfD+g6nAfyREECJmMKpUVCGyaK9Jfem6/wEZe/Y7XcxgntucxcVaQ80\nW+j8Qil2VwKBgQCGpESZSRADcwafsclTmWhifx4Da2Ian/k6KjUJ6smRz834CiYD\n6XTlivxgC0fZ3IjrHggWdWUdjw0zV/snm7DfZXSMem1BpAm3Goifyy0ODsRdqX3g\n5opR2F5+4ZF+bQMHU1/ns+fbiAPKf0CndOv5BJKkIPFq6zVrFO6C3ZYXOQKBgH1B\nwFVE1dwBS4Yg4H/boS8I06dyot/5oQCALoIMynMWBKQMqVNRQGJhNsonxx7B3Xhz\n5ZdHlyyey4hIohfAI7OmJNSKUdTH1XBEdcqi+K6jiHM50X53loKwfjWft15OIp/U\n/Gz/XEAQa84ed58ntdOmbSc33OT+4PaP4qUGipEHAoGAEVDyomWPccRQ+XhfOg4t\nyhWeG2ViovDQ7aLcT/VID2dEmfOZQ9RgamvuhDEYVRO6/CJKuwwI0FeEkTCh2cWO\nTnEWWZ3Dx9LBj+khvoZHPh7Mbh/XjABcfeD/DmoT5CKxXjiBwjbrHg44jy2XuciY\nf2VmGSM4eAm913hte+e2+pI=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-kwa3c@knowledgebase-production.iam.gserviceaccount.com",
    "client_id": "102634729237890503617",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-kwa3c%40knowledgebase-production.iam.gserviceaccount.com"
  }),
  databaseURL: "https://knowledgebase-production.firebaseio.com"
});

// admin.initializeApp({
//   credential: admin.credential.cert({
//     "type": "service_account",
//     "project_id": "knowledgebase-a8b2b",
//     "private_key_id": "3286dc23d625037c6474f31a3acc3518ae821e8c",
//     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCOkYEiQI/nIl17\nTsdvcX4cISlYKRS6oHaG9r9oDIq3PMlX6dArjDii5IZoaozEOoobiMypCZtxfKu1\niUeqTQdpfQrcgqVi6DCAj6S6KEVkrz2upwTLXe9W959GumjM7ELceJtv0IlJUJHc\n3jU2sxPfQG5jMZMW4qYlF50zdvu5GUGMMlzeUv4MiM14EzwzPStJe7ItCe3jf0Nu\nD1/JUJY8vzL5SKewdnndBT6vptph5pKLI7VHRav67MNceLNNVSn2TSwvnbOeU34r\nDhU00S5XofG0bDNy88mkrE4Q/rdqpHS3pB+DE3NtJPVnGGeNq1ftChHjB/gmi8Lc\nCkhNjU+RAgMBAAECggEABIydkYV8Ygx9bagdoo99TfH78wF6lRr2NUfN40jVK1Qv\n+5NtLlqO2xnONSpDPCa/DfJfT3yMPoKTKxuKkyNam3HfRRqRIvcURyHuSHdtAXG7\nFuXi+AdTEhQcO8JKglF+r7DUiuydWN7OjLz1dz2fInZYn2cvUaFhWlkmzcPb8/PP\na6XSjwRsgFHvTuNnQOuJI7cSXOizTaiUMmsIyUVE3HX5ZesRKKNtUBhktMMdRAXA\njWym8IksHg/PxzCtQU+A8mD620tEABEyyW4JVbxZUSAzPb4b6T0oM9374SAPWz0T\nnqO4pl6T5k3R2xhpvdL+IwJOvtOzwpacsOqjqLUFjQKBgQC/W49sMIpLnAZN9++m\nKgvcauz7RxQXmuOJ/HkoiLd9iO/i6h5TzN4vZNDUFsw2/BYjSu6kRLGnvpnJXlWU\nWkwBChV25uXz5pBZiUchmQCC+qFADtHpx46rUUSfPvy3r/vxRA62JnEsyX10K56l\nd9d+cafakL1Yry9I2ZzOe8fL1QKBgQC+urDPGHh7ga+vHGf/o+uOEN/tWDoOrES0\nhFGL9OiHD9Mf9qAcp6G5CbsRAEFfGqY5D4W5TrTdvPXOz4iEhky7YDbx4F/xAqAO\n+ruwCG+OsNL9AA4SyPr98bH1YQ6UTd7KjEzgPwMiY2u/L0MuXNxU4DrMSKhhy3nS\na4qhxqu+zQKBgHE8v2yodM41cE2nULul2gr/g2lXMH6fe9LmAtSHwv2YkUxYesXg\nUAL/x8waCZLoLjmIWBwBQpgfZGYTWtVFcgCTdQw9qwpgAD/byqoJHpJjuhRsMLAF\nFVov50nNPkN88rxdJ8+GhCaavZCHV4RXnMAIheoDCOl4EaUskWxnN15ZAoGBAIbd\n8ISgoyGCdL54cbm9KaXNnOpyBqu1eOfE4Pz8cyh+MiZZ+KIKjzsO/G5rJc6gQ4X5\nye9dDlv1cEOLUNeVN9EPmgqzRGRiHNg6yFkTvf7CXo90aH80Cvdi3xnKRcrsvWuw\nhfPT2t2IO/p26yRvmYWTAUDO5/IvNbdrQB5hI7TJAoGBAKuo6cHGcluMVY3NAG7Q\nwONKy1P3lWOLNmX2H8XQJF27KjW2Y6lJaL9mBBCKEvLGRG1gfbaOJhP6nTP/hSPM\nQtfgYpTMavPqjaXLjRxffj2EpHQs6GlKDHPbas5bL99dOvgkpW++7aHWIWqqQFxw\naGnnI1nPmeGd2NvGAs6lbdCZ\n-----END PRIVATE KEY-----\n",
//     "client_email": "firebase-adminsdk-ul8b4@knowledgebase-a8b2b.iam.gserviceaccount.com",
//     "client_id": "116838772434654725872",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ul8b4%40knowledgebase-a8b2b.iam.gserviceaccount.com"
//   }),
//   databaseURL: "https://knowledgebase-a8b2b.firebaseio.com"
// });

export default admin;



