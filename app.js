import { readlink } from 'fs';
import https from 'https';
import { stdin, stdout } from 'process';
import  Readline  from 'readline';

const rl=Readline.createInterface({
    input: stdin,
    output: stdout
});

const APIKey="Generate your API Key";
const url =`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${APIKey}`;

const CurrencyConvert=(amount,rate)=>{
         return (amount*rate);
}

https.get(url,(response)=>{
  let data="";
  response.on('data',(chunk)=>{
    data+=chunk;
  })

response.on('end',()=>{
    const rates=JSON.parse(data).rates;
    rl.question("Enter the amount in USD: ",(amount)=>{
        rl.question("Enter the currency to convert to(Eg. INR,NPR,EUR): ",(currency)=>{
            const rate=rates[currency.toUpperCase()];
            if(rate){
                console.log(`${amount} USD in ${currency} is ${CurrencyConvert(amount,rate)}`)
            }
            else{
                console.log("Invalid Currency Code");
            }
            rl.close();
        })
    })
})
})