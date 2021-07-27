const fetch = require('node-fetch')

class Cielo {
    static compra(params) {
        return fetch('https://apisandbox.cieloecommerce.cielo.com.br/1/sales/', {
            method: 'post',
            body: JSON.stringify(params),
            headers: { 
                'Content-Type': 'application/json',
                'MerchantId': 'a4f847ce-687d-4f75-9d86-b58cfc59286b',
                'MerchantKey': 'PCBRWRCXYVJRXMDVPOQQIJPCLILYVMVAQDAPMTIZ',
             },
        })
        .then(res => res.json());
    }

    static captura(paymentId) {
        return fetch('https://apisandbox.cieloecommerce.cielo.com.br/1/sales/' + paymentId + '/capture', {
            method: 'put',
            headers: { 
                'Content-Type': 'application/json',
                'MerchantId': 'a4f847ce-687d-4f75-9d86-b58cfc59286b',
                'MerchantKey': 'PCBRWRCXYVJRXMDVPOQQIJPCLILYVMVAQDAPMTIZ',
             },
        })
        .then(res => res.json());
    }

    static consulta(paymentId) {
        return fetch('https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/'+ paymentId, {
            method: 'get',
            headers: { 
                'Content-Type': 'application/json',
                'MerchantId': 'a4f847ce-687d-4f75-9d86-b58cfc59286b',
                'MerchantKey': 'PCBRWRCXYVJRXMDVPOQQIJPCLILYVMVAQDAPMTIZ',
             },
        })
        .then(res => res.json());
    }
}



module.exports = Cielo


// MerchantId a4f847ce-687d-4f75-9d86-b58cfc59286b
// MerchantKey PCBRWRCXYVJRXMDVPOQQIJPCLILYVMVAQDAPMTIZ


// Para passar no postman
// {
//     "MerchantOrderId": "2014111703",
//     "Customer": {
//         "Name": "Comprador crédito simples"
//     },
//     "Payment": {
//         "Type": "CreditCard",
//         "Amount": 15700,
//         "Installments": 1,
//         "SoftDescriptor": "123456789ABCD",
//         "CreditCard": {
//             "CardNumber": "1234123412341231",
//             "Holder": "Teste Holder",
//             "ExpirationDate": "12/2030",
//             "SecurityCode": "123",
//             "Brand": "Visa",
//             "CardOnFile": {
//                 "Usage": "Used",
//                 "Reason": "Unscheduled"
//             }
//         },
//         "IsCryptoCurrencyNegotiation": true
//     }
// }