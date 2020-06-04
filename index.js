const http = require('http')
const fs = require('fs')
const csv = require('csv-parser')


let male = []

const server = http.createServer((req, res) => {

    if(req.url === '/') {
        res.writeHead(200, {
        'Content-Type': 'text/html',
        })
        fs.createReadStream(__dirname + '/index.html', 'utf8').pipe(res)
    }
    else if(req.url === '/males'){
        
        fs.createReadStream('data.csv')
        .pipe(csv())
        .on('data', (data) => {
            if(data.Gender ==='M'){
                male.push(data)
            }
            const writeStream = fs.createWriteStream('/males')
        })
        .on('end', ()=>{
            res.writeHead(200,{
                'Content-Type': 'application/json'
            })
        fs.createReadStream(__dirname + '/females.json', 'utf8').pipe(res)
    
        });
    }
    else if(req.url === 'females'){
        res.writeHead(200,{
            'Content-Type': 'application/json'
        })
        fs.readFile('data.csv','utf8'((err,info)=>{
        if(err) return console.log('Something went wrong')
        fs.createReadStream(__dirname + '/males.json', 'utf8').pipe(res)
        })
        )
    }
    else{ res.writeHead(404, {
        'Content-Type': 'text/html',
      })
    fs.createReadStream(__dirname + '/404.html').pipe(res)

    }
}
)



    server.listen(3000, () => {
        console.log(`Listening on port 3000`)
      })