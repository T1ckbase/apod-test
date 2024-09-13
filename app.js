import got from 'got';

function toMessage(data) {
    return JSON.stringify({
        avatar_url: 'https://cdns-images.dzcdn.net/images/cover/10adf86ad797ad4bfea206df808de457/1900x1900-000000-80-0-0.jpg', // 'https://api.nasa.gov/assets/img/favicons/favicon-192.png',
        username: 'A̴͕͚̠͐̔̕M̵̡͕͐̐͜͠B̸̼͇͚̚͘͠A̵͎͎͓̐͆͒T̵͉̙̺͐͆̾U̵͉͔͛̓͋͜K̴̻̪̞̔̔̔Ä̸̡̪̘́̈́́M̵̦͙̙͐͊͘',
        content: '',
        embeds: [
            {
                title: data.title,
                description: data.explanation,
                color: 0x08408d,
                footer: {
                    text: "NASA",
                    icon_url: "https://api.nasa.gov/assets/img/favicons/favicon-192.png"
                },
                timestamp: new Date(data.date).toISOString(),
                image: {
                    url: data.hdurl
                }
            },
        ],
    });
}

const result = await got.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY').json();
console.log(result);

const webhooks_url = process.env.WEBHOOK_URL;

got.post(webhooks_url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: toMessage(result),
});