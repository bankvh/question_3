const https = require('https')

if (!process.argv[2]){
    console.log('Need FUNDCODE as first argument')
    process.exit()
}

let fundCode = process.argv[2]

// the return data contain one extra whitespace
if(fundCode === 'BM70SSF'){
    fundCode += ' '
}

const options = { 
    hostname: 'codequiz.azurewebsites.net',
    method: 'GET',
    headers: {'Cookie': 'hasCookie=true'}
}

https.get(options, res => {
    res.on("data", data => {
        const html = String(data)
        const fundCodeIndex = html.search(`<td>${fundCode}</td>`)
        if (fundCodeIndex === -1){
            process.exit()
        }
        const fundCodeNav = html.substr(fundCodeIndex)
        const navPrice = fundCodeNav.split('</td>')
        if (navPrice){
            console.log(navPrice[1].replace('<td>', ''))
        }
    });
});
