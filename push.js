const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BLie_S8teO4-zMpB7IhevjUO7Z0McW-uP4wnvBS8VuAxWQr0RpHc94WGA_mnKwHrsRifNFIKEqj18FfFh3-6Uxk",
    "privateKey": "6rG80b6Np7c3_yLJ_5gtrxC263KV9uyHaox3Rn6j2fA"
};

webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cwGGv5laNcM:APA91bHHmmEbwJ2t0cBVIoE7Qrc0UC6IUVEKTWE7Sdl1rSz_EHtzcS1WwRw4UC6ZL1nUkPpiCd1xjjdhIp91Vj3FjeqsFWGmcHhil9mMfq3SaAq7P2sKBXeJX_ahCe7QVC3QxUVbXWDO",
    "keys": {
        "p256dh": "BL75E14pJj1s0B73JdhCRiGQjO3H+AQay3WWYcdin0nchKuJhJKHLK+hntC0aOs+kpVDP1oR6Zsf43HZ6bf79G0=",
        "auth": "c3JbyUkgJCDbow3QhSIFmg=="
    }
};

const payload = "Selamat aplikasi dapat menerima push notifikasi";

const options = {
    gcmAPIKey: "990281371090",
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);